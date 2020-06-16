<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */


namespace HeimrichHannot\VideoBundle\EventSubscriber;


use Contao\PageModel;
use Contao\StringUtil;
use HeimrichHannot\UtilsBundle\Model\ModelUtil;
use HeimrichHannot\VideoBundle\Event\AfterRenderPlayerEvent;
use HeimrichHannot\VideoBundle\Event\BeforeRenderPlayerEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Translation\TranslatorInterface;
use Twig\Environment;

class PrivacyCenterSubscriber implements EventSubscriberInterface
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

    protected $previewImage = [];
    /**
     * @var \HeimrichHannot\PrivacyCenterBundle\Twig\PrivacyCenterExtension
     */
    protected $privacyCenterExtension;

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
            BeforeRenderPlayerEvent::NAME => 'beforeRenderPlayer',
            AfterRenderPlayerEvent::NAME  => 'afterRenderPlayer',
        ];
    }

    protected function isPrivacyCenterEnabled(PageModel $rootPage = null)
    {
        $isPrivacyCenterEnabled = false;
        if ($this->privacyCenterExtension && $rootPage && $rootPage->usePrivacyCenter) {
            $isPrivacyCenterEnabled = (bool) $rootPage->usePrivacyCenter;
        }

        return $isPrivacyCenterEnabled;
    }

    public function beforeRenderPlayer(BeforeRenderPlayerEvent $event)
    {
        if (!$this->isPrivacyCenterEnabled($event->getRootPage())) {
            return;
        }

        $context = $event->getContext();
        if (isset($context['previewImage'])) {
            $this->previewImage = $context['previewImage'];
            unset($context['previewImage']);
        }
        $event->setContext($context);
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
        if (!empty($this->previewImage) && isset($this->previewImage['src'])) {
            $previewImagePath = $this->previewImage['src'];
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
            'posterButtonText' => $this->translator->trans('huh_video.template.privacy.ok'),
            'posterButtonCancel' => $this->translator->trans('huh_video.template.privacy.cancel')
        ];
        $event->setBuffer($this->privacyCenterExtension->protectCode($event->getBuffer(), $videoProviderLocalStorage[$event->getContext()['type']], $privacyOptions));
    }
}