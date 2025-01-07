<?php

/*
 * Copyright (c) 2023 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

use Contao\CoreBundle\DataContainer\PaletteManipulator;
use Contao\DataContainer;
use Contao\System;
use HeimrichHannot\TwigSupportBundle\Filesystem\TwigTemplateLocator;

$arrDca = &$GLOBALS['TL_DCA']['tl_page'];

/*
 * Selectors
 */
$arrDca['palettes']['__selector__'][] = 'overrideNoCookieVideoUrlSettings';
$arrDca['palettes']['__selector__'][] = 'overrideEnablePrivacyNotice';

/*
 * Palettes
 */
PaletteManipulator::create()
    ->addLegend('video_legend', 'website_legend', PaletteManipulator::POSITION_AFTER)
    ->addField(['overrideNoCookieVideoUrlSettings', 'overrideEnablePrivacyNotice', 'videofullsizeTemplate', 'videoprivacyTemplate'], 'video_legend', PaletteManipulator::POSITION_APPEND)
    ->applyToPalette('root', 'tl_page')
    ->applyToPalette('rootfallback', 'tl_page');

/*
 * Subpalettes
 */
$arrDca['subpalettes']['overrideNoCookieVideoUrlSettings'] = 'enableNoCookieVideoUrl';
$arrDca['subpalettes']['overrideEnablePrivacyNotice'] = 'enablePrivacyNotice';
$arrDca['subpalettes']['usePrivacyCenter'] = 'privacyCenterLocalStorageAttribute';

/**
 * Fields.
 */
$fields = [
    'overrideNoCookieVideoUrlSettings' => [
        'label' => &$GLOBALS['TL_LANG']['tl_page']['overrideNoCookieVideoUrlSettings'],
        'exclude' => true,
        'inputType' => 'checkbox',
        'eval' => ['tl_class' => 'w50', 'submitOnChange' => true],
        'sql' => "char(1) NOT NULL default ''",
    ],
    'enableNoCookieVideoUrl' => [
        'label' => &$GLOBALS['TL_LANG']['tl_page']['enableNoCookieVideoUrl'],
        'exclude' => true,
        'default' => true,
        'inputType' => 'checkbox',
        'eval' => ['tl_class' => 'clr'],
        'sql' => "char(1) NOT NULL default ''",
    ],
    'overrideEnablePrivacyNotice' => [
        'label' => &$GLOBALS['TL_LANG']['tl_page']['overrideEnablePrivacyNotice'],
        'exclude' => true,
        'inputType' => 'checkbox',
        'eval' => ['tl_class' => 'w50', 'submitOnChange' => true],
        'sql' => "char(1) NOT NULL default ''",
    ],
    'enablePrivacyNotice' => [
        'label' => &$GLOBALS['TL_LANG']['tl_page']['enablePrivacyNotice'],
        'exclude' => true,
        'default' => true,
        'inputType' => 'checkbox',
        'eval' => ['tl_class' => 'clr'],
        'sql' => "char(1) NOT NULL default ''",
    ],
    'videofullsizeTemplate' => [
        'label' => &$GLOBALS['TL_LANG']['tl_page']['videofullsizeTemplate'],
        'default' => 'videofullsize_default',
        'exclude' => true,
        'inputType' => 'select',
        'options_callback' => function (DataContainer $dc) {
            return System::getContainer()->get(TwigTemplateLocator::class)->getTemplateGroup('videofullsize_');
        },
        'eval' => ['tl_class' => 'w50 clr'],
        'sql' => "varchar(64) NOT NULL default ''",
    ],
    'videoprivacyTemplate' => [
        'label' => &$GLOBALS['TL_LANG']['tl_page']['videoprivacyTemplate'],
        'exclude' => true,
        'inputType' => 'select',
        'default' => 'videoprivacy_default.twig',
        'options_callback' => function (DataContainer $dc) {
            return System::getContainer()->get(TwigTemplateLocator::class)->getTemplateGroup('videoprivacy_');
        },
        'eval' => ['tl_class' => 'w50', 'mandatory' => true],
        'sql' => "varchar(64) NOT NULL default ''",
    ],
];

$arrDca['fields'] = array_merge($arrDca['fields'], $fields);
