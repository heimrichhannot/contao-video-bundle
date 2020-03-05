<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */


namespace HeimrichHannot\VideoBundle\Generator;


use Contao\Controller;
use HeimrichHannot\VideoBundle\EventListener\Dca\ModifiyVideoPaletteListener;

class DcaFieldGenerator
{
    const PALETTE_VIDEO = 'videoProvider';
    const PALETTE_PLAYER = 'fullsize,autoplay';

    public static function addSingleLegendPalette(array &$dca)
    {
        $dca['config']['onload_callback'][] = [ModifiyVideoPaletteListener::class, 'updateVideoPaletteWithoutLegend'];
        $palette = '{video_legend},addVideo;';

        $dca['subpalettes']['addVideo']  = static::PALETTE_VIDEO.','.static::PALETTE_PLAYER;
        $dca['palettes']['__selector__'][] = 'addVideo';

        $fields = [
            'addVideo'         => [
                'label'     => &$GLOBALS['TL_LANG']['tl_content']['addVideo'],
                'exclude'   => true,
                'inputType' => 'checkbox',
                'eval'      => ['submitOnChange' => true],
                'sql'       => "char(1) NOT NULL default ''"
            ],
        ];
        $fields = array_merge($fields, static::getVideoFields());

        $dca['fields'] = array_merge($dca['fields'], $fields);

        return $palette;
    }

    public static function getVideoFields()
    {
        Controller::loadDataContainer("tl_content");

        return [
            'youtube' =>  $GLOBALS['TL_DCA']['tl_content']['fields']['youtube'],
            'vimeo' =>  $GLOBALS['TL_DCA']['tl_content']['fields']['vimeo'],
            'videoProvider'        => [
                'label'            => &$GLOBALS['TL_LANG']['tl_content']['videoProvider'],
                'inputType'        => 'select',
                'options_callback' => function (\DataContainer $dc) {
                    return \Contao\System::getContainer()->get(\HeimrichHannot\VideoBundle\Collection\VideoProviderCollection::class)->getVideoProvider();
                },
                'eval'             => ['submitOnChange' => true, 'maxlength' => 64, 'tl_class' => 'w50','includeBlankOption' => true],
                'sql'              => "varchar(64) NOT NULL default ''",
            ],
            'addPreviewImage'        => [
                'label'     => &$GLOBALS['TL_LANG']['tl_content']['addPreviewImage'],
                'exclude'   => true,
                'inputType' => 'checkbox',
                'eval'      => ['submitOnChange' => true, 'tl_class' => 'clr'],
                'sql'       => "char(1) NOT NULL default ''",
            ],
            'addPlayButton'          => [
                'label'     => &$GLOBALS['TL_LANG']['tl_content']['addPlayButton'],
                'exclude'   => true,
                'inputType' => 'checkbox',
                'eval'      => ['tl_class' => 'w50'],
                'sql'       => "char(1) NOT NULL default ''",
            ],
            'videoDuration'          => [
                'label'     => &$GLOBALS['TL_LANG']['tl_content']['videoDuration'],
                'exclude'   => true,
                'search'    => true,
                'sorting'   => true,
                'flag'      => 1,
                'inputType' => 'text',
                'eval'      => ['maxlength' => 255, 'tl_class' => 'w50 clr'],
                'sql'       => "varchar(255) NOT NULL default ''",
            ],
            'videoShowRelated'          => [
                'label'     => &$GLOBALS['TL_LANG']['tl_content']['videoShowRelated'],
                'exclude'   => true,
                'inputType' => 'checkbox',
                'eval'      => ['tl_class' => 'w50'],
                'sql'       => "char(1) NOT NULL default ''",
            ],
            'ytModestBranding'       => [
                'label'     => &$GLOBALS['TL_LANG']['tl_content']['ytModestBranding'],
                'exclude'   => true,
                'inputType' => 'checkbox',
                'eval'      => ['tl_class' => 'w50'],
                'sql'       => "char(1) NOT NULL default ''",
            ],
            'ytShowInfo'             => [
                'label'     => &$GLOBALS['TL_LANG']['tl_content']['ytShowInfo'],
                'exclude'   => true,
                'inputType' => 'checkbox',
                'eval'      => ['tl_class' => 'w50'],
                'sql'       => "char(1) NOT NULL default ''",
            ],
            'videoLinkText'        => [
                'label'            => &$GLOBALS['TL_LANG']['tl_content']['videoLinkText'],
                'exclude'          => true,
                'inputType'        => 'select',
                'default'          => 'huh.youtube.modal.link.default',
                'options_callback' => function (\DataContainer $dc) {
                    return \Contao\System::getContainer()->get('huh.utils.choice.message')->getCachedChoices('huh.youtube.modal.link');
                },
                'eval'             => ['maxlength' => 255, 'tl_class' => 'w50'],
                'sql'              => "varchar(255) NOT NULL default ''",
            ],
        ];
    }
}