<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\EventListener\Dca;

use Contao\DataContainer;
use HeimrichHannot\UtilsBundle\Util\Utils;
use HeimrichHannot\VideoBundle\ConfigElementType\VideoConfigElementType;
use Symfony\Contracts\Translation\TranslatorInterface;

class ConfigElementListener
{
    private Utils $utils;
    private TranslatorInterface $translator;

    public function __construct(Utils $utils, TranslatorInterface $translator)
    {
        $this->utils = $utils;
        $this->translator = $translator;
    }

    public function onLoadCallback(DataContainer $dc): void
    {
        $element = $this->utils->model()->findModelInstanceByIdOrAlias($dc->table, $dc->id);

        if (!$element || $element->type !== VideoConfigElementType::getType()) {
            return;
        }

        $GLOBALS['TL_LANG'][$dc->table]['imageSelectorField'][1] = $this->translator->trans('tl_list_config_element.imageSelectorField.videoSelector', [], 'contao_tl_list_config_element');
    }
}
