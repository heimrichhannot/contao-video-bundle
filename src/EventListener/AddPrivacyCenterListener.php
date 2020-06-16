<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */


namespace HeimrichHannot\VideoBundle\EventListener;


use Contao\PageModel;
use Contao\StringUtil;
use HeimrichHannot\UtilsBundle\Model\ModelUtil;
use HeimrichHannot\VideoBundle\Event\BeforeRenderPlayerEvent;
use Symfony\Component\Translation\TranslatorInterface;
use Twig\Environment;

class AddPrivacyCenterListener
{
    /**
     * @var ModelUtil
     */
    private $modelUtil;
    /**
     * @var TranslatorInterface
     */
    private $translator;
    /**
     * @var Environment
     */
    private $twig;

    /**
     * BeforeRenderPlayerEventListener constructor.
     */
    public function __construct(ModelUtil $modelUtil, TranslatorInterface $translator, Environment $twig)
    {

        $this->modelUtil = $modelUtil;
        $this->translator = $translator;
        $this->twig = $twig;
    }

    public function __invoke(BeforeRenderPlayerEvent $event)
    {
        if (!class_exists('HeimrichHannot\PrivacyCenterBundle\HeimrichHannotPrivacyCenterBundle')) {
            return;
        }
        if (!$event->getRootPage() && !$event->getRootPage()->usePrivacyCenter ) {
            return;
        }
        $context = $event->getContext();

        $localStorageAttributes = StringUtil::deserialize($event->getRootPage()->privacyCenterLocalStorageAttribute, true);

        $videoProviderLocalStorage = [];

        foreach ($localStorageAttributes as $item) {
            if (null === $this->modelUtil->findModelInstancesBy('tl_tracking_object', 'id', $item['localStorageAttribute'])->localStorageAttribute) {
                continue;
            }
            $videoProviderLocalStorage[$item['videoProvider']] = $this->modelUtil->findModelInstancesBy('tl_tracking_object', 'id', $item['localStorageAttribute'])->localStorageAttribute;
        }

        $privacyOptions = [
            'addPoster' => true,
            'addPosterImage' => true,
            'posterImages' => [
                '(min-width: 1px)' => $context['previewImage']['src']
            ],
            'posterDescription' => $this->translator->trans('huh_video.video.'.$event->getVideo()::getType().'.privacy.text'),
            'posterButtonText' => $this->translator->trans('huh_video.template.privacy.ok'),
            'posterButtonCancel' => $this->translator->trans('huh_video.template.privacy.cancel')
        ];

        unset($context['previewImage']);

        $code = $this->twig->render($video->getTemplate(), $context);
        $videoBuffer = $this->privacyCenterExtension->protectCode($code, $videoProviderLocalStorage[$context['type']], $privacyOptions);

        $event->setContext($context);
    }

    protected function enablePrivacyCenter()
    {

    }

    protected function isPrivacyCenterEnabled(PageModel $rootPage): bool
    {
        $isPrivacyCenterEnabled = false;

        if ($rootPage && $rootPage->usePrivacyCenter && class_exists('HeimrichHannot\PrivacyCenterBundle\HeimrichHannotPrivacyCenterBundle')) {
            $isPrivacyCenterEnabled = (bool) $rootPage->usePrivacyCenter;
        }

        return $isPrivacyCenterEnabled;
    }

}