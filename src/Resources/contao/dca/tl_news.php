<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */

$dca = &$GLOBALS['TL_DCA']['tl_news'];

$palette = \HeimrichHannot\VideoBundle\Generator\DcaFieldGenerator::addSingleLegendPalette($dca);

$dca['palettes']['default'] = str_replace('{image_legend}', $palette.'{image_legend}', $dca['palettes']['default']);

$a;