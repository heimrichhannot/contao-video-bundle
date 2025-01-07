<?php

namespace HeimrichHannot\VideoBundle\DataContainer;

use Contao\ContentModel;
use Contao\CoreBundle\DependencyInjection\Attribute\AsCallback;
use Contao\DataContainer;
use HeimrichHannot\VideoBundle\Controller\ContentElement\ExtendedVideoElementController;

class ContentContainer
{
    #[AsCallback(table: 'tl_content', target: 'config.onload')]
    public function onConfigLoadCallback(?DataContainer $dc = null): void
    {
        if (!$dc || !$dc->id || !($element = ContentModel::findById($dc->id)) || ExtendedVideoElementController::TYPE !== $element->type) {
            return;
        }

        $GLOBALS['TL_DCA']['tl_content']['fields']['text']['eval']['mandatory'] = false;
    }
}
