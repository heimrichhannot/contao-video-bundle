<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2016 Heimrich & Hannot GmbH
 *
 * @package youtube
 * @author  Rico Kaltofen <r.kaltofen@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */

$arrDca = &$GLOBALS['TL_DCA']['tl_page'];

/**
 * Selectors
 */

//$arrDca['palettes']['__selector__'][] = 'youtubePrivacy';
$arrDca['palettes']['__selector__'][] = 'overrideNoCookieVideoUrlSettings';
$arrDca['palettes']['__selector__'][] = 'overrideEnablePrivacyNotice';

/**
 * Palettes
 */
//$replace = 'adminEmail;{youtube_legend},youtube_template,youtube_modal_template,youtubePrivacy,overrideYoutubeApiKey,overrideYoutubeSkipImageCaching;';
//
//$arrDca['palettes']['root'] = str_replace('adminEmail;', $replace, $arrDca['palettes']['root']);

$arrDca['palettes']['root'] = str_replace(
    '{sitemap_legend',
    '{video_legend},overrideNoCookieVideoUrlSettings,overrideEnablePrivacyNotice,videofullsizeTemplate,videoprivacyTemplate;{sitemap_legend',
    $arrDca['palettes']['root']
);

/**
 * Subpalettes
 */
//$arrDca['subpalettes']['youtubePrivacy'] = 'youtubePrivacyTemplate';
$arrDca['subpalettes']['overrideNoCookieVideoUrlSettings'] = 'enableNoCookieVideoUrl';
$arrDca['subpalettes']['overrideEnablePrivacyNotice'] = 'enablePrivacyNotice';

/**
 * Fields
 */

$fields = [
    'overrideNoCookieVideoUrlSettings' => [
        'label'     => &$GLOBALS['TL_LANG']['tl_page']['overrideNoCookieVideoUrlSettings'],
        'exclude'   => true,
        'inputType' => 'checkbox',
        'eval'      => ['tl_class' => 'w50', 'submitOnChange' => true],
        'sql'       => "char(1) NOT NULL default ''",
    ],
    'enableNoCookieVideoUrl' => [
        'label'     => &$GLOBALS['TL_LANG']['tl_page']['enableNoCookieVideoUrl'],
        'exclude'   => true,
        'default'   => true,
        'inputType' => 'checkbox',
        'eval'      => ['tl_class' => 'clr'],
        'sql'       => "char(1) NOT NULL default ''",
    ],
    'overrideEnablePrivacyNotice' => [
        'label'     => &$GLOBALS['TL_LANG']['tl_page']['overrideEnablePrivacyNotice'],
        'exclude'   => true,
        'inputType' => 'checkbox',
        'eval'      => ['tl_class' => 'w50', 'submitOnChange' => true],
        'sql'       => "char(1) NOT NULL default ''",
    ],
    'enablePrivacyNotice' => [
        'label'     => &$GLOBALS['TL_LANG']['tl_page']['enablePrivacyNotice'],
        'exclude'   => true,
        'default'   => true,
        'inputType' => 'checkbox',
        'eval'      => ['tl_class' => 'clr'],
        'sql'       => "char(1) NOT NULL default ''",
    ],
    'videofullsizeTemplate'       => [
        'label'            => &$GLOBALS['TL_LANG']['tl_page']['videofullsizeTemplate'],
        'default'          => 'youtube_modalvideo_default',
        'exclude'          => true,
        'inputType'        => 'select',
        'options_callback' => function (\Contao\DataContainer $dc) {
            return System::getContainer()->get('huh.utils.choice.twig_template')->setContext(['videofullsize_'])->getCachedChoices();
        },
        'eval'             => ['tl_class' => 'w50 clr'],
        'sql'              => "varchar(64) NOT NULL default ''",
    ],
    'videoprivacyTemplate' => [
        'label'            => &$GLOBALS['TL_LANG']['tl_page']['videoprivacyTemplate'],
        'exclude'          => true,
        'inputType'        => 'select',
        'default'          => 'videoprivacy_default.twig',
        'options_callback' => function (\Contao\DataContainer $dc) {
            return System::getContainer()->get('huh.utils.choice.twig_template')->setContext(['videoprivacy_'])->getCachedChoices();
        },
        'eval'             => ['tl_class' => 'w50', 'mandatory' => true],
        'sql'              => "varchar(64) NOT NULL default ''",
    ],
];

$arrDca['fields'] = array_merge($arrDca['fields'], $fields);

//
//System::getContainer()->get('huh.utils.dca')->addOverridableFields(['youtubeApiKey', 'youtubeSkipImageCaching'], 'tl_settings', 'tl_page');