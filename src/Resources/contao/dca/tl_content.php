<?php

$dca = &$GLOBALS['TL_DCA']['tl_content'];

$dca['config']['onload_callback'][] = [\HeimrichHannot\VideoBundle\EventListener\Dca\ModifiyVideoPaletteListener::class, 'updateVideoPaletteWithLegend'];

$dca['palettes'][\HeimrichHannot\VideoBundle\ContentElement\VideoElement::TYPE] =
    '{title_legend},type,name,headline;
	{video_legend},videoProvider;
	{player_legend},fullsize,autoplay;
	{text_legend},text;
	{template_legend:hide},customTpl;
	{protected_legend:hide},protected;
	{expert_legend:hide},cssID,space
	{invisible_legend:hide},invisible,start,stop;';

//
//'youtube'                     => '{type_legend},type,headline;{source_legend},youtube;{player_legend},playerSize,autoplay;{template_legend:hide},customTpl;{protected_legend:hide},protected;{expert_legend:hide},guests,cssID;{invisible_legend:hide},invisible,start,stop',
//'vimeo'                       => '{type_legend},type,headline;{source_legend},vimeo;{player_legend},playerSize,autoplay;{template_legend:hide},customTpl;{protected_legend:hide},protected;{expert_legend:hide},guests,cssID;{invisible_legend:hide},invisible,start,stop',

/**
 * Selectors
 */
$dca['palettes']['__selector__'][] = 'addPreviewImage';

/**
 * Subpalettes
 */
$dca['subpalettes']['addPreviewImage'] = 'posterSRC,size,addPlayButton';


/**
 * Fields
 */

$arrFields = [
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
//    'youtube_template'       => [
//        'label'            => &$GLOBALS['TL_LANG']['tl_content']['youtube_template'],
//        'default'          => 'youtube_default',
//        'exclude'          => true,
//        'inputType'        => 'select',
//        'options_callback' => function (\Contao\DataContainer $dc) {
//            return System::getContainer()->get('huh.utils.choice.twig_template')->setContext(['youtube_video_'])->getCachedChoices();
//        },
//        'eval'             => ['tl_class' => 'w50', 'includeBlankOption' => true],
//        'sql'              => "varchar(64) NOT NULL default ''",
//    ],
//    'youtube_modal_template' => [
//        'label'            => &$GLOBALS['TL_LANG']['tl_content']['youtube_modal_template'],
//        'default'          => 'youtube_modalvideo_default',
//        'exclude'          => true,
//        'inputType'        => 'select',
//        'options_callback' => function (\Contao\DataContainer $dc) {
//            return System::getContainer()->get('huh.utils.choice.twig_template')->setContext(['youtube_modalvideo_'])->getCachedChoices();
//        },
//        'eval'             => ['tl_class' => 'w50', 'includeBlankOption' => true],
//        'sql'              => "varchar(64) NOT NULL default ''",
//    ],
];

$dca['fields'] = array_merge($dca['fields'], $arrFields);