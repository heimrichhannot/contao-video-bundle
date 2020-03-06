<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */


namespace HeimrichHannot\VideoBundle\Generator;


use Contao\Database;
use Contao\FilesModel;
use Contao\Frontend;
use Contao\PageModel;
use Contao\System;
use HeimrichHannot\UtilsBundle\Image\ImageUtil;
use HeimrichHannot\UtilsBundle\Model\ModelUtil;
use HeimrichHannot\UtilsBundle\Template\TemplateUtil;
use HeimrichHannot\VideoBundle\Event\BeforeRenderPlayerEvent;
use HeimrichHannot\VideoBundle\Video\NoCookieUrlInterface;
use HeimrichHannot\VideoBundle\Video\PreviewImageInterface;
use HeimrichHannot\VideoBundle\Video\VideoInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Translation\TranslatorInterface;
use Twig\Environment;

class VideoGenerator
{
    /**
     * @var Environment
     */
    private $twig;
    /**
     * @var ModelUtil
     */
    private $modelUtil;
    /**
     * @var ImageUtil
     */
    private $imageUtil;
    /**
     * @var array
     */
    private $bundleConfig;
    /**
     * @var TranslatorInterface
     */
    private $translator;
    /**
     * @var TemplateUtil
     */
    private $templateUtil;
    /**
     * @var EventDispatcherInterface
     */
    private $eventDispatcher;


    /**
     * VideoGenerator constructor.
     * @param Environment $twig
     * @param ModelUtil $modelUtil
     * @param ImageUtil $imageUtil
     * @param array $bundleConfig
     */
    public function __construct(Environment $twig, ModelUtil $modelUtil, ImageUtil $imageUtil, array $bundleConfig, TranslatorInterface $translator, TemplateUtil $templateUtil, EventDispatcherInterface $eventDispatcher)
    {
        $this->twig = $twig;
        $this->modelUtil = $modelUtil;
        $this->imageUtil = $imageUtil;
        $this->bundleConfig = $bundleConfig;
        $this->translator = $translator;
        $this->templateUtil = $templateUtil;
        $this->eventDispatcher = $eventDispatcher;
    }

    /**
     * Options:
     * - ignoreFullsize: (bool) Ignore the video fullsize property
     * - rootPage: (PageModel) Set the root page instead of determine it
     *
     * @param VideoInterface $video
     * @param array $options
     * @return string
     * @throws \Twig\Error\LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     */
    public function generate(VideoInterface $video, $parent, array $options = []): string
    {
        if (isset($options['rootPage'])) {

            if (!$options['rootPage'] instanceof  PageModel) {
                throw new \InvalidArgumentException("Option rootPage only allows \Contao\PageModel instances. Input was ".get_class($options['rootPage']));
            }
            if ('root' === $options['rootPage']->type) {
                throw new \InvalidArgumentException("Option rootPage only allows PageModel instances of type 'root'. Type ".$options['rootPage']->type.' given.');
            }
            $rootPage = $options['rootPage'];
        } else {
            $rootPage = Frontend::getRootPageFromUrl();
        }

        $context = $video->getData();
        $context['uniqueId'] = uniqid();
        if ($video instanceof PreviewImageInterface)
        {
            $this->generatePreviewImage($video, $context);
        }
        if ($this->isNoCookiesEnabled($rootPage) && $video instanceof NoCookieUrlInterface)
        {
            $context['src'] = $video->getNoCookieSrc();
        }
        $context['type'] = $video::getType();

        $context['playButton'] = $video->getAddPlayButton();

        if ($this->isPrivacyNoticeEnabled($rootPage)) {
            $context['privacyNotice'] = $this->generatePrivacyNote($video, $context, $rootPage);
        }

        $videoBuffer = $this->twig->render($video->getTemplate(), $context);

        if ((!isset($options['ignoreFullsize']) || true !== $options['ignoreFullsize']) && $video->isFullsize()) {
            $context['videoplayer'] = $videoBuffer;
            $videoBuffer = $this->twig->render($this->getFullsizeTemplate($rootPage), $context);
        }

        $this->eventDispatcher->dispatch(BeforeRenderPlayerEvent::NAME, new BeforeRenderPlayerEvent($video, $context, $parent, $rootPage, $options));

        return $videoBuffer;
    }

    public function getFullsizeTemplate(PageModel $rootPage = null)
    {
        $template = "@HeimrichHannotVideo/fullsize/videofullsize_default.html.twig";
        if ($rootPage) {
            $template = $rootPage->videofullsizeTemplate;
            $template = $this->templateUtil->getTemplate($template);
        }
        return $template;
    }

    public function getPrivacyTemplate(PageModel $rootPage = null)
    {
        $template = "@HeimrichHannotVideo/privacy/videoprivacy_default.twig";
        if ($rootPage) {
            $template = $rootPage->videoprivacyTemplate;
            $template = $this->templateUtil->getTemplate($template);
        }
        return $template;
    }

    protected function generatePrivacyNote(VideoInterface $video, array &$videoContext, PageModel $rootPage = null): string
    {
        $context['headline'] = $this->translator->trans('huh_video.video.'.$video::getType().'.privacy.headline');
        $context['text'] = $this->translator->trans('huh_video.video.'.$video::getType().'.privacy.text');
        $context['checkbox'] = $this->translator->trans('huh_video.video.'.$video::getType().'.privacy.checkbox', ["%host%" => \Contao\Environment::get('host')]);
        $context['videoContext'] = $videoContext;
        $template = $this->getPrivacyTemplate($rootPage);
        return $this->twig->render($this->getPrivacyTemplate($rootPage), $context);
    }

    protected function isNoCookiesEnabled(PageModel $rootPage = null)
    {
        $noCookiesEnabled = false;
        if (isset($this->bundleConfig['defaultEnableNoCookieVideoUrl']) && true === $this->bundleConfig['defaultEnableNoCookieVideoUrl']) {
            $noCookiesEnabled = true;
        }
        if ($rootPage && $rootPage->overrideNoCookieVideoUrlSettings) {
            $noCookiesEnabled = (bool) $rootPage->enableNoCookieVideoUrl;
        }
        return $noCookiesEnabled;
    }

    protected function isPrivacyNoticeEnabled(PageModel $rootPage = null)
    {
        $isPrivacyNoticeEnabled = false;
        if (isset($this->bundleConfig['defaultEnablePrivacyNotice']) && true === $this->bundleConfig['defaultEnablePrivacyNotice']) {
            $isPrivacyNoticeEnabled = true;
        }
        if ($rootPage && $rootPage->overrideEnablePrivacyNotice) {
            $isPrivacyNoticeEnabled = (bool) $rootPage->enablePrivacyNotice;
        }
        return $isPrivacyNoticeEnabled;
    }

    public function generatePreviewImage(PreviewImageInterface $video, array &$context): void
    {
        if (!$video->hasPreviewImage()) {
            unset($context['previewImage']);
            return;
        }

        /** @var FilesModel $imageModel */
        $imageModel = $this->modelUtil->findModelInstancesBy('tl_files', 'uuid', $video->getPreviewImage());

        //TODO: Load image from external source

        if (!$imageModel) {
            unset($context['previewImage']);
            return;
        }

        $imageData = [];
        $this->imageUtil->addToTemplateData(
            'singleSRC',
            'addImage',
            $imageData,
            [
                'singleSRC' => $imageModel->path,
                'addImage' => true,
//                'size' => $this->getConfig()->getSize(),
//                'alt' => $this->getConfig()->getYoutube(),
            ]
        );
        $context['previewImage'] = $imageData;
    }
}