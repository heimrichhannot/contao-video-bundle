<?php

namespace HeimrichHannot\VideoBundle\Controller\ContentElement;

use Contao\BackendTemplate;
use Contao\ContentModel;
use Contao\CoreBundle\Controller\ContentElement\AbstractContentElementController;
use Contao\CoreBundle\DependencyInjection\Attribute\AsContentElement;
use Contao\Template;
use HeimrichHannot\UtilsBundle\Util\Utils;
use HeimrichHannot\VideoBundle\Asset\FrontendAsset;
use HeimrichHannot\VideoBundle\Collection\VideoProviderCollection;
use HeimrichHannot\VideoBundle\Event\BeforeRenderPlayerEvent;
use HeimrichHannot\VideoBundle\Generator\VideoGenerator;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\EventDispatcher\EventDispatcherInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

#[AsContentElement(ExtendedVideoElementController::TYPE, category: 'media', template: 'ce_video')]
class ExtendedVideoElementController extends AbstractContentElementController
{
    public const TYPE = 'huh_video';

    public function __construct(
        private readonly VideoProviderCollection $videoProviderCollection,
        private readonly VideoGenerator $videoGenerator,
        private readonly Utils $utils,
        private readonly FrontendAsset $frontendAsset,
        private readonly TranslatorInterface $translator,
        private readonly EventDispatcherInterface $eventDispatcher,
    ) {
    }

    protected function getResponse(Template $template, ContentModel $model, Request $request): ?Response
    {
        $video = $this->videoProviderCollection->getVideoByRawDataWithSelector($model->row(), null);

        if ($this->utils->container()->isBackend()) {
            $template = new BackendTemplate('be_wildcard');
            if ($video) {
                $template->title = $this->translator->trans('tl_content.reference.videoProvider.' . $video::getType(), [], 'contao_tl_content');
                $template->wildcard = $video->getHeadlineText();
            }

            return $template->getResponse();
        }

        // Add text value to video player as it is outputted in video template
        if (method_exists($this->eventDispatcher, 'addListener')) {
            $this->eventDispatcher->addListener(BeforeRenderPlayerEvent::NAME, function (BeforeRenderPlayerEvent $event) use ($model) {
                $context = $event->getContext();
                $context['text'] = $model->text;
                $event->setContext($context);
            });
        }

        if ($video) {
            $videoBuffer = $this->videoGenerator->generate($video, $model);
        }

        $template->video = $videoBuffer ?? '';
        $this->frontendAsset->addFrontendAsset();

        return $template->getResponse();
    }
}
