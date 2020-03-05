<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */


namespace HeimrichHannot\VideoBundle\EventListener;


use Contao\NewsBundle\ContaoNewsBundle;
use HeimrichHannot\VideoBundle\EventListener\Dca\ModifiyVideoPaletteListener;
use HeimrichHannot\VideoBundle\Generator\DcaFieldGenerator;

class LoadDataContainerListener
{
    const PALETTE_VIDEO = 'videoProvider';
    const PALETTE_PLAYER = 'videoFullsize,videoAutoplay';

    /**
     * @var array
     */
    private $bundleConfig;

    /**
     * LoadDataContainerListener constructor.
     */
    public function __construct(array $bundleConfig)
    {
        $this->bundleConfig = $bundleConfig;
    }


    /**
     * Hook loadDataContainer
     *
     * @param string $table
     */
    public function onLoadDataContainer(string $table): void
    {
        switch ($table)
        {
            case 'tl_news':
                $this->prepareNewsTable();
                break;
        }
    }

    protected function prepareNewsTable()
    {
        if (!isset($this->bundleConfig['enableNewsSupport']) || true !== $this->bundleConfig['enableNewsSupport']) {
            return;
        }
        if (!class_exists('Contao\NewsBundle\ContaoNewsBundle')) {
            return;
        }

        $dca = &$GLOBALS['TL_DCA']['tl_news'];
        $videoPalette = DcaFieldGenerator::addSingleLegendPalette('tl_news');

        foreach ($dca['palettes'] as $paletteName => $palette) {
            if (!is_string($palette)) {
                continue;
            }
            $dca['palettes'][$paletteName] = str_replace('{image_legend}', $videoPalette.'{image_legend}', $dca['palettes'][$paletteName]);
        }
    }
}