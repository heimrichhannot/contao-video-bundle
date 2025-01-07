<?php

/*
 * Copyright (c) 2023 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\EventListener;

use Contao\CoreBundle\DependencyInjection\Attribute\AsHook;
use HeimrichHannot\MultiColumnEditorBundle\HeimrichHannotContaoMultiColumnEditorBundle;
use Contao\CoreBundle\DataContainer\PaletteManipulator;
use HeimrichHannot\VideoBundle\EventListener\Dca\PageContainer;
use HeimrichHannot\VideoBundle\Generator\DcaFieldGenerator;

#[AsHook('loadDataContainer', priority: 1)]
class LoadDataContainerListener
{
    public const PALETTE_VIDEO = 'videoProvider';
    public const PALETTE_PLAYER = 'videoFullsize,videoAutoplay';

    private array $bundleConfig;

    public function __construct(array $bundleConfig)
    {
        $this->bundleConfig = $bundleConfig;
    }

    public function __invoke(string $table): void
    {
        switch ($table) {
            case 'tl_news':
                $this->prepareNewsTable();

                break;

            case 'tl_page':
                $this->preparePageTable();

                break;
        }
    }

    protected function prepareNewsTable()
    {
        if (!isset($this->bundleConfig['enable_news_support']) || true !== $this->bundleConfig['enable_news_support']) {
            return;
        }

        if (!class_exists('Contao\NewsBundle\ContaoNewsBundle')) {
            return;
        }

        $dca = &$GLOBALS['TL_DCA']['tl_news'];
        DcaFieldGenerator::addSingleLegendPalette('tl_news');

        $paletteManipulator = PaletteManipulator::create()
            ->addLegend('video_legend', 'image_legend', PaletteManipulator::POSITION_BEFORE)
            ->addField('addVideo', 'video_legend', PaletteManipulator::POSITION_APPEND);

        foreach ($dca['palettes'] as $paletteName => $palette) {
            if (!\is_string($palette)) {
                continue;
            }

            $paletteManipulator->applyToPalette($paletteName, 'tl_news');
        }
    }

    protected function preparePageTable()
    {
        $this->enablePrivacyCenterSupport();
    }

    protected function enablePrivacyCenterSupport()
    {
        if (!class_exists('HeimrichHannot\PrivacyCenterBundle\HeimrichHannotPrivacyCenterBundle')) {
            return;
        }

        if (!class_exists(HeimrichHannotContaoMultiColumnEditorBundle::class)) {
            trigger_error(
                'HeimrichHannotContaoMultiColumnEditorBundle not found. Multi Column Editor bundle is needed for privacy center integration.',
                \E_USER_WARNING);

            return;
        }

        $dca = &$GLOBALS['TL_DCA']['tl_page'];
        $dca['palettes']['__selector__'][] = 'usePrivacyCenter';

        foreach (['root', 'rootfallback'] as $paletteName) {
            if (!isset($dca['palettes'][$paletteName])) {
                continue;
            }
            PaletteManipulator::create()
                ->addField('usePrivacyCenter', 'video_legend', PaletteManipulator::POSITION_APPEND)
                ->applyToPalette($paletteName, 'tl_page');
        }

        $dca['fields']['usePrivacyCenter'] = [
            'label' => &$GLOBALS['TL_LANG']['tl_page']['usePrivacyCenter'],
            'exclude' => true,
            'inputType' => 'checkbox',
            'eval' => ['tl_class' => 'w50', 'submitOnChange' => true],
            'sql' => "char(1) NOT NULL default ''",
        ];
        $dca['fields']['privacyCenterLocalStorageAttribute'] = [
            'label' => &$GLOBALS['TL_LANG']['tl_page']['privacyCenterLocalStorageAttribute'],
            'inputType' => 'multiColumnEditor',
            'eval' => [
                'tl_class' => 'long clr',
                'multiColumnEditor' => [
                    'fields' => [
                        'videoProvider' => [
                            'label' => &$GLOBALS['TL_LANG']['tl_page']['videoProvider'],
                            'exclude' => true,
                            'filter' => true,
                            'inputType' => 'select',
                            'options_callback' => [PageContainer::class, 'onMceVideoProviderOptionsCallback'],
                            'eval' => ['groupStyle' => 'width: 49%', 'mandatory' => true, 'includeBlankOption' => true, 'submitOnChange' => true],
                        ],
                        'localStorageAttribute' => [
                            'label' => &$GLOBALS['TL_LANG']['tl_page']['localStorageAttribute'],
                            'exclude' => true,
                            'filter' => true,
                            'inputType' => 'select',
                            'options_callback' => [PrivacyCenterListener::class, 'onFieldsMceLocalStorageAttribute'],
                            'eval' => ['groupStyle' => 'width: 49%', 'mandatory' => true, 'includeBlankOption' => true, 'submitOnChange' => true],
                        ],
                    ],
                ],
            ],
            'sql' => 'blob NULL',
        ];
    }
}
