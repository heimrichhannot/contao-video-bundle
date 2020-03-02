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


use Contao\DataContainer;
use HeimrichHannot\VideoBundle\Video\YouTubeVideo;

class ContentListener
{
    /**
     * @param DataContainer $dataContainer
     */
    public function onLoadCallback($dataContainer)
    {
//        $arrDca = &$GLOBALS['TL_DCA']['tl_content'];
    }
}