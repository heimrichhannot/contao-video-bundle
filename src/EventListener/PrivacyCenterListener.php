<?php

/*
 * Copyright (c) 2023 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\EventListener;

use Contao\PageModel;
use Contao\StringUtil;
use HeimrichHannot\PrivacyCenterBundle\Generator\ProtectedCodeConfiguration;
use HeimrichHannot\PrivacyCenterBundle\Generator\ProtectedCodeGenerator;
use HeimrichHannot\PrivacyCenterBundle\Generator\SplashImage;
use HeimrichHannot\PrivacyCenterBundle\Model\TrackingObjectModel;
use HeimrichHannot\UtilsBundle\Util\Utils;
use HeimrichHannot\VideoBundle\Event\AfterRenderPlayerEvent;
use Psr\Container\ContainerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Contracts\Service\ServiceSubscriberInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class PrivacyCenterListener implements EventSubscriberInterface, ServiceSubscriberInterface
{
    public function __construct(private ContainerInterface $container, private TranslatorInterface $translator, private Utils $utils)
    {
    }

    public static function getSubscribedEvents()
    {
        return [
            AfterRenderPlayerEvent::NAME => 'afterRenderPlayer',
        ];
    }

    public function afterRenderPlayer(AfterRenderPlayerEvent $event): void
    {
        if (!$this->isPrivacyCenterEnabled($event->getRootPage()) || 'file' === $event->getContext()['type']) {
            return;
        }

        $localStorageAttributes = StringUtil::deserialize($event->getRootPage()->privacyCenterLocalStorageAttribute, true);

        $videoProviderLocalStorage = [];

        foreach ($localStorageAttributes as $item) {
            if (null === $this->utils->model()->findModelInstancesBy('tl_tracking_object', 'id', $item['localStorageAttribute'])->localStorageAttribute) {
                continue;
            }
            $videoProviderLocalStorage[$item['videoProvider']] = $this->utils->model()->findModelInstancesBy('tl_tracking_object', 'id', $item['localStorageAttribute'])->localStorageAttribute;
        }

        if (!empty($event->getContext()['previewImage']) && isset($event->getContext()['previewImage']['src'])) {
            $splashImage = SplashImage::create($event->getContext()['previewImage']['src']);

            if (isset($event->getContext()['rawData']['size'])) {
                $splashImage->setSize(StringUtil::deserialize($event->getContext()['rawData']['size'], true));
                $splashImage->setAlt($event->getContext()['previewImage']['alt'] ?? '');
                $splashImage->setTitle($event->getContext()['previewImage']['imageTitle'] ?? '');
            }
        } else {
            $splashImage = SplashImage::create('bundles/heimrichhannotvideo/images/preview_fallback.jpg');
            $splashImage->setSize([640, 360]);
        }

        ($configuration = new ProtectedCodeConfiguration())
            ->setDescription($this->translator->trans('huh_video.video.'.$event->getVideo()::getType().'.privacy.text'))
            ->setShowSplashImage(true)
            ->setShowPreview(true)
            ->setSplashImage($splashImage)
            ->setUnlockButtonText($this->translator->trans('huh_video.template.privacy.showContent'));

        $event->setBuffer($this->container->get(ProtectedCodeGenerator::class)->generateProtectedCode(
            $event->getBuffer(),
            [$videoProviderLocalStorage[$event->getContext()['type']]],
            $configuration
        ));
    }

    public static function getSubscribedServices()
    {
        $services = [];

        if (class_exists(ProtectedCodeGenerator::class)) {
            $services[] = '?'.ProtectedCodeGenerator::class;
        }

        return $services;
    }

    protected function isPrivacyCenterEnabled(PageModel $rootPage = null)
    {
        $isPrivacyCenterEnabled = false;

        if (class_exists(ProtectedCodeGenerator::class) && $this->container->has(ProtectedCodeGenerator::class)
            && $rootPage && $rootPage->addPrivacyCenter) {
            $isPrivacyCenterEnabled = (bool) $rootPage->addPrivacyCenter;
        }

        return $isPrivacyCenterEnabled;
    }

    public function onFieldsMceLocalStorageAttribute($dc)
    {
        $attributes = TrackingObjectModel::findAll();
        $options = [];

        foreach ($attributes as $attribute) {
            $options[$attribute->id] = $attribute->title.' (ID: '.$attribute->id.')';
        }

        natcasesort($options);

        return $options;
    }
}
