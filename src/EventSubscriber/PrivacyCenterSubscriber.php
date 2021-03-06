<?php

/*
 * Copyright (c) 2021 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\EventSubscriber;

use Contao\PageModel;
use Contao\StringUtil;
use HeimrichHannot\UtilsBundle\Model\ModelUtil;
use HeimrichHannot\VideoBundle\Event\AfterRenderPlayerEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Translation\TranslatorInterface;
use Twig\Environment;

class PrivacyCenterSubscriber implements EventSubscriberInterface
{
    /**
     * @var \HeimrichHannot\PrivacyCenterBundle\Twig\PrivacyCenterExtension
     */
    protected $privacyCenterExtension;
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

    public function __construct(ModelUtil $modelUtil, TranslatorInterface $translator, Environment $twig)
    {
        $this->modelUtil = $modelUtil;
        $this->translator = $translator;
        $this->twig = $twig;
    }

    public function setPrivacyCenterExtension(\HeimrichHannot\PrivacyCenterBundle\Twig\PrivacyCenterExtension $privacyCenterExtension)
    {
        $this->privacyCenterExtension = $privacyCenterExtension;
    }

    public static function getSubscribedEvents()
    {
        return [
            AfterRenderPlayerEvent::NAME => 'afterRenderPlayer',
        ];
    }

    public function afterRenderPlayer(AfterRenderPlayerEvent $event)
    {
        if (!$this->isPrivacyCenterEnabled($event->getRootPage())) {
            return;
        }

        $localStorageAttributes = StringUtil::deserialize($event->getRootPage()->privacyCenterLocalStorageAttribute, true);

        $videoProviderLocalStorage = [];

        foreach ($localStorageAttributes as $item) {
            if (null === $this->modelUtil->findModelInstancesBy('tl_tracking_object', 'id', $item['localStorageAttribute'])->localStorageAttribute) {
                continue;
            }
            $videoProviderLocalStorage[$item['videoProvider']] = $this->modelUtil->findModelInstancesBy('tl_tracking_object', 'id', $item['localStorageAttribute'])->localStorageAttribute;
        }

        if (!empty($event->getContext()['previewImage']) && isset($event->getContext()['previewImage']['src'])) {
            $previewImagePath = $event->getContext()['previewImage']['src'];
        } else {
            $previewImagePath = 'bundles/heimrichhannotvideo/images/preview_fallback.jpg';
        }

        $privacyOptions = [
            'addPoster' => true,
            'addPosterImage' => true,
            'posterImages' => [
                '(min-width: 1px)' => $previewImagePath,
            ],
            'posterDescription' => $this->translator->trans('huh_video.video.'.$event->getVideo()::getType().'.privacy.text'),
            'posterButtonText' => $this->translator->trans('huh_video.template.privacy.showContent'),
            'posterButtonCancel' => $this->translator->trans('huh_video.template.privacy.cancel'),
        ];
        $event->setBuffer($this->privacyCenterExtension->protectCode($event->getBuffer(), $videoProviderLocalStorage[$event->getContext()['type']], $privacyOptions));
    }

    protected function isPrivacyCenterEnabled(PageModel $rootPage = null)
    {
        $isPrivacyCenterEnabled = false;

        if ($this->privacyCenterExtension && $rootPage && $rootPage->usePrivacyCenter) {
            $isPrivacyCenterEnabled = (bool) $rootPage->usePrivacyCenter;
        }

        return $isPrivacyCenterEnabled;
    }
}
