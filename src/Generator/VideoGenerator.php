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


use Contao\FilesModel;
use Contao\Frontend;
use Contao\PageModel;
use Contao\System;
use HeimrichHannot\UtilsBundle\Image\ImageUtil;
use HeimrichHannot\UtilsBundle\Model\ModelUtil;
use HeimrichHannot\VideoBundle\Video\NoCookieUrlInterface;
use HeimrichHannot\VideoBundle\Video\PreviewImageInterface;
use HeimrichHannot\VideoBundle\Video\VideoInterface;
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
     * VideoGenerator constructor.
     * @param Environment $twig
     * @param ModelUtil $modelUtil
     * @param ImageUtil $imageUtil
     * @param array $bundleConfig
     */
    public function __construct(Environment $twig, ModelUtil $modelUtil, ImageUtil $imageUtil, array $bundleConfig, TranslatorInterface $translator)
    {
        $this->twig = $twig;
        $this->modelUtil = $modelUtil;
        $this->imageUtil = $imageUtil;
        $this->bundleConfig = $bundleConfig;
        $this->translator = $translator;
    }

    public function generate(VideoInterface $video): string
    {
        $rootPage = Frontend::getRootPageFromUrl();
        $context = $video->getData();
        if ($video instanceof PreviewImageInterface)
        {
            $this->generatePreviewImage($video, $context);
        }
        if ($this->isNoCookiesEnabled($rootPage) && $video instanceof NoCookieUrlInterface)
        {
            $context['src'] = $video->getNoCookieSrc();
        }
        $context['type'] = $video::getType();
        $context['videoplayer'] = $this->twig->render($video->getTemplate(), $context);
        if ($this->isPrivacyNoticeEnabled()) {
            $context['privacyNotice'] = $this->generatePrivacyNote($video, $context);
        }
        return $this->twig->render('@HeimrichHannotVideo/wrapper/videowrapper_default.html.twig', $context);
    }

    protected function generatePrivacyNote(VideoInterface $video, array &$videoContext): string
    {
        $context['headline'] = $this->translator->trans('huh_video.'.$video::getType().'.privacy.headline');
        $context['text'] = $this->translator->trans('huh_video.'.$video::getType().'.privacy.text');
        $context['checkbox'] = $this->translator->trans('huh_video.'.$video::getType().'.privacy.checkbox', ["host" => \Contao\Environment::get('host')]);
        $context['videoContext'] = $videoContext;
        return $this->twig->render("@HeimrichHannotVideo/privacy/videoprivacy_default.twig", $context);
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