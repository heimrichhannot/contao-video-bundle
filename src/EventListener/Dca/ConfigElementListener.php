<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */


namespace HeimrichHannot\VideoBundle\EventListener\Dca;


use Contao\Controller;
use Contao\DataContainer;
use HeimrichHannot\UtilsBundle\Model\ModelUtil;
use HeimrichHannot\VideoBundle\ConfigElementType\VideoConfigElementType;

class ConfigElementListener
{
    /**
     * @var ModelUtil
     */
    private $modelUtil;

    public function __construct(ModelUtil $modelUtil)
    {
        $this->modelUtil = $modelUtil;
    }


    public function onLoadCallback(DataContainer $dc): void
    {
        $element = $this->modelUtil->findModelInstanceByIdOrAlias($dc->table, $dc->id);
        if (!$element) {
            return;
        }
        if (VideoConfigElementType::getType() === $element->type) {
            Controller::loadLanguageFile('tl_list_config_element');
            $GLOBALS['TL_LANG'][$dc->table]['imageSelectorField'][1] = $GLOBALS['TL_LANG']['tl_list_config_element']['imageSelectorField']['videoSelector'];
        }
        return;
    }
}