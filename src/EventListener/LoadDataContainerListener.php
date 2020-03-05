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


use HeimrichHannot\VideoBundle\EventListener\Dca\ModifiyVideoPaletteListener;

class LoadDataContainerListener
{
    const PALETTE_VIDEO = 'videoProvider';
    const PALETTE_PLAYER = 'fullsize,autoplay';

    /**
     * @var array
     */
    private $bundleConfig;
    /**
     * @var array
     */
    private $supportedTables;

    /**
     * LoadDataContainerListener constructor.
     */
    public function __construct(array $bundleConfig)
    {
        $this->bundleConfig = $bundleConfig;
        $this->supportedTables = array_keys($bundleConfig['supportedTables']);
    }


    /**
     * Hook loadDataContainer
     *
     * @param string $table
     */
    public function onLoadDataContainer(string $table): void
    {
//        if (!in_array($table, $this->supportedTables)) {
//            return;
//        }
//        $dca = &$GLOBALS['TL_DCA'][$table];
//
//        if (isset($this->bundleConfig['supportedTables'][$table]['multipleLegends']) && true === $this->bundleConfig['supportedTables'][$table]['multipleLegends']) {
//            $dca['config']['onload_callback'][] = [ModifiyVideoPaletteListener::class, 'updateVideoPaletteWithLegend'];
//        } else {
//            $dca['config']['onload_callback'][] = [ModifiyVideoPaletteListener::class, 'updateVideoPaletteWithoutLegend'];
//            $this->addSingleLegendPalette($dca, );
//        }

    }

    /**
     * Options:
     * - position: (string) Where to place the video palette in related to the position string. Options: before, after. Default: before
     *
     * @param array $dca
     * @param array $palettes
     * @param string $position
     * @param array $options
     */
    protected function addSingleLegendPalette(string $table, array &$dca, array $options = [])
    {
        foreach ($this->bundleConfig['supportedTables'][$table]['palettes'] as $palette) {

            $replaceFields = static::PALETTE_VIDEO.','.static::PALETTE_PLAYER;
            $replacePalette = $replaceFields.$position;
            if (isset($this->bundleConfig['supportedTables'][$table]['palettes']['videoLegendSelectorPosition'])
                && 'after' === $this->bundleConfig['supportedTables'][$table]['palettes']['videoLegendSelectorPosition']) {
                $replacePalette = $position.$replaceFields;
            }

        }

        $replaceFields = static::PALETTE_VIDEO.','.static::PALETTE_PLAYER;
        $replacePalette = $replaceFields.$position;
        if (isset($options['position']) && $options['position'] === 'after') {
            $replacePalette = $position.$replaceFields;
        }

        $dca['palettes'][$palettes] = str_replace($position, $replacePalette, $dca['palettes'][$palettes]);

        $dca['subpalettes']['addVideo']  =
            'videoProvider';
        $dca['palettes']['__selector__'][] = 'addYouTube';

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
    }

    public static function getVideoFields()
    {
        return [
            'videoProvider'        => [
                'label'            => &$GLOBALS['TL_LANG']['tl_content']['videoProvider'],
                'inputType'        => 'select',
                'default'          => \HeimrichHannot\VideoBundle\Video\YouTubeVideo::getType(),
                'options_callback' => function (\DataContainer $dc) {
                    return \Contao\System::getContainer()->get(\HeimrichHannot\VideoBundle\Collection\VideoProviderCollection::class)->getVideoProvider();
                },
                'eval'             => ['submitOnChange' => true, 'maxlength' => 64, 'tl_class' => 'w50'],
                'sql'              => "varchar(64) NOT NULL default ''",
            ],
        ];
    }
}