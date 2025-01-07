<?php

/*
 * Copyright (c) 2023 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\Generator;

use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use Contao\BackendTemplate;
use Contao\Config;
use Contao\ContentModel;
use Contao\CoreBundle\Image\Studio\Studio;
use Contao\FilesModel;
use Contao\Frontend;
use Contao\FrontendTemplate;
use Contao\PageModel;
use Contao\StringUtil;
use HeimrichHannot\UtilsBundle\Util\Utils;
use HeimrichHannot\VideoBundle\Controller\ContentElement\ExtendedVideoElementController;
use HeimrichHannot\VideoBundle\Event\AfterRenderPlayerEvent;
use HeimrichHannot\VideoBundle\Event\BeforeRenderPlayerEvent;
use HeimrichHannot\VideoBundle\Video\ExternalElementInterface;
use HeimrichHannot\VideoBundle\Video\NoCookieUrlInterface;
use HeimrichHannot\VideoBundle\Video\PreviewImageInterface;
use HeimrichHannot\VideoBundle\Video\VideoInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use Twig\Environment;

class VideoGenerator
{
    /**
     * @var Environment
     */
    private $twig;
    /**
     * @var array
     */
    private $bundleConfig;
    /**
     * @var TranslatorInterface
     */
    private $translator;
    /**
     * @var EventDispatcherInterface
     */
    private $eventDispatcher;

    /**
     * VideoGenerator constructor.
     */
    public function __construct(
        Environment             $twig, array $bundleConfig, TranslatorInterface $translator, EventDispatcherInterface $eventDispatcher,
        private readonly Utils  $utils,
        private readonly Studio $studio
    )
    {
        $this->twig = $twig;
        $this->bundleConfig = $bundleConfig;
        $this->translator = $translator;
        $this->eventDispatcher = $eventDispatcher;
    }

    /**
     * Options:
     * - ignoreFullsize: (bool) Ignore the video fullsize property
     * - rootPage: (PageModel) Set the root page instead of determine it.
     *
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
    public function generate(VideoInterface $video, $parent, array $options = []): string
    {
        if ($this->utils->container()->isBackend())
        {
            $objTemplate = new BackendTemplate('be_wildcard');
            $objTemplate->wildcard = '### ' . $GLOBALS['TL_LANG']['CTE'][ExtendedVideoElementController::TYPE][0] . ' ###';

            return $objTemplate->parse();
        }

        if (isset($options['rootPage'])) {
            if (!$options['rootPage'] instanceof PageModel) {
                throw new \InvalidArgumentException("Option rootPage only allows \Contao\PageModel instances. Input was ".\get_class($options['rootPage']));
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

        if ($video instanceof PreviewImageInterface) {
            $this->generatePreviewImage($video, $context, $parent);
        }

        if ($this->isNoCookiesEnabled($rootPage) && $video instanceof NoCookieUrlInterface) {
            $context['src'] = $video->getNoCookieSrc();
        }

        $context['type'] = $video::getType();

        $context['playButton'] = $video->getAddPlayButton();

        $isPrivacyNoticeEnabled = $this->isPrivacyNoticeEnabled($rootPage);

        $context['dataAttributes'] = [
            'privacyMode' => $isPrivacyNoticeEnabled,
            'showPlayButton' => $context['playButton'],
            'toggleVideo' => !empty($context['secondarySrc']),
        ];

        if ($isPrivacyNoticeEnabled) {
            $context['privacyNotice'] = $this->generatePrivacyNote($video, $context, $rootPage);
            $context['dataAttributes']['privacyModalContent'] = htmlentities($context['privacyNotice']);
        }

        if ($video instanceof ExternalElementInterface && empty($context['secondarySrc'])) {
            $context['videoAriaLabel'] = $this->translator->trans('huh_video.template.accessibility.iframeTitle');
            $context['dataAttributes']['element'] = [
                'type' => $video->videoElementType(),
                'attributes' => $video->videoElementAttributes($context),
            ];
        }

        $event = $this->eventDispatcher->dispatch(
            new BeforeRenderPlayerEvent($video, $context, $parent, $rootPage, $options),
            BeforeRenderPlayerEvent::NAME);

        $context = $event->getContext();
        $context['dataAttributes'] = $this->utils->html()->generateDataAttributesString(
            $context['dataAttributes'],
            ['array_handling' => 'encode']
        );

        $videoBuffer = $this->twig->render($event->getVideo()->getTemplate(), $context);

        // Add start and end markers in debug mode
        if (Config::get('debugMode')) {
            $strRelPath = $event->getVideo()->getTemplate();
            $videoBuffer = "\n<!-- TWIG TEMPLATE START: $strRelPath -->\n$videoBuffer\n<!-- TWIG TEMPLATE END: $strRelPath -->\n";
        }

        /** @var AfterRenderPlayerEvent $event */
        $event = $this->eventDispatcher->dispatch(
            new AfterRenderPlayerEvent($videoBuffer, $event->getVideo(), $context, $event->getParent(), $event->getRootPage(), $event->getOptions()),
            AfterRenderPlayerEvent::NAME
        );
        $context = $event->getContext();
        $videoBuffer = $event->getBuffer();

        if ((!isset($event->getOptions()['ignoreFullsize']) || true !== $event->getOptions()['ignoreFullsize']) && $event->getVideo()->isFullsize()) {
            $context['videoplayer'] = $videoBuffer;
            $templateName = $this->getFullsizeTemplate($event->getRootPage());

            $template = new FrontendTemplate($templateName);
            $template->setData($context);

            $videoBuffer = $template->parse();

            if (Config::get('debugMode')) {
                $videoBuffer = "\n<!-- TWIG TEMPLATE START: $templateName -->\n$videoBuffer\n<!-- TWIG TEMPLATE END: $templateName -->\n";
            }
        }

        return $videoBuffer;
    }

    public function getFullsizeTemplate(PageModel $rootPage = null): string
    {
        $template = 'huh_video/fullsize';

        if ($rootPage && $rootPage->videofullsizeTemplate) {
            $template = $rootPage->videofullsizeTemplate;
        }

        return $template;
    }

    public function getPrivacyTemplate(PageModel $rootPage = null): string
    {
        $template = 'huh_video/privacy';

        if ($rootPage && $rootPage->videoprivacyTemplate) {
            $template = $rootPage->videoprivacyTemplate;
        }

        return $template;
    }

    public function generatePreviewImage(PreviewImageInterface $video, array &$context, mixed $parent): void
    {
        if (!$video->hasPreviewImage()) {
            unset($context['previewImage']);

            return;
        }

        $imageModel = FilesModel::findByUuid($video->getPreviewImage());

        //TODO: Load image from external source

        if (!$imageModel) {
            unset($context['previewImage']);

            return;
        }

        $size = null;
        if ($parent instanceof ContentModel) {
            $size = StringUtil::deserialize($parent->size, true);
        }

        $figureBuilder = $this->studio->createFigureBuilder();

        $figureBuilder
            ->fromFilesModel($imageModel)
            ->setSize($size)
        ;

        $context['previewImage'] = $figureBuilder->build();
    }

    protected function generatePrivacyNote(VideoInterface $video, array &$videoContext, PageModel $rootPage = null): string
    {
        $context['headline'] = $this->translator->trans('huh_video.video.'.$video::getType().'.privacy.headline');
        $context['text'] = $this->translator->trans('huh_video.video.'.$video::getType().'.privacy.text');
        $context['checkbox'] = $this->translator->trans('huh_video.video.'.$video::getType().'.privacy.checkbox', ['%host%' => \Contao\Environment::get('host')]);
        $context['videoContext'] = $videoContext;

        $template = new FrontendTemplate($this->getPrivacyTemplate($rootPage));
        $template->setData($context);
        return $template->parse();
    }

    protected function isNoCookiesEnabled(PageModel $rootPage = null)
    {
        $noCookiesEnabled = false;

        if (isset($this->bundleConfig['default_use_no_cookie_video_url']) && true === $this->bundleConfig['default_use_no_cookie_video_url']) {
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

        if (isset($this->bundleConfig['default_display_privacy_notice']) && true === $this->bundleConfig['default_display_privacy_notice']) {
            $isPrivacyNoticeEnabled = true;
        }

        if ($rootPage && $rootPage->overrideEnablePrivacyNotice) {
            $isPrivacyNoticeEnabled = (bool) $rootPage->enablePrivacyNotice;
        }

        return $isPrivacyNoticeEnabled;
    }
}
