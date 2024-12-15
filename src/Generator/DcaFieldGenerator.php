<?php

/*
 * Copyright (c) 2023 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\Generator;

use Contao\Controller;
use HeimrichHannot\VideoBundle\EventListener\Dca\ModifiyVideoPaletteListener;
use HeimrichHannot\VideoBundle\Video\RemoteFileVideoMultipleResolution;

class DcaFieldGenerator
{
    const PALETTE_VIDEO = 'videoProvider';
    const PALETTE_PLAYER = 'videoFullsize,videoAutoplay';

    /**
     * Update dca for video bundle. Returns the string containing a legend and the selector field for the video subpalette.
     *
     * @return string
     */
    public static function addSingleLegendPalette(string $table)
    {
        Controller::loadDataContainer($table);
        Controller::loadLanguageFile('tl_content');
        $GLOBALS['TL_LANG'][$table]['video_legend'] = $GLOBALS['TL_LANG']['tl_content']['video_legend'];

        $dca = &$GLOBALS['TL_DCA'][$table];
        $dca['config']['onload_callback'][] = [ModifiyVideoPaletteListener::class, 'updateVideoPaletteWithoutLegend'];
        $palette = '{video_legend},addVideo;';

        $dca['subpalettes']['addVideo'] = static::PALETTE_VIDEO.','.static::PALETTE_PLAYER;
        $dca['palettes']['__selector__'][] = 'addVideo';
        static::addSubpalettes($dca);

        $fields = [
            'addVideo' => [
                'label' => &$GLOBALS['TL_LANG']['tl_content']['addVideo'],
                'exclude' => true,
                'inputType' => 'checkbox',
                'eval' => ['submitOnChange' => true],
                'sql' => "char(1) NOT NULL default ''",
            ],
        ];
        $fields = array_merge($fields, static::getVideoFields($dca));

        $dca['fields'] = array_merge($dca['fields'], $fields);

        return $palette;
    }

    /**
     * Add the default video bundle subpalettes.
     */
    public static function addSubpalettes(array &$dca)
    {
        $dca['subpalettes']['addPreviewImage'] = 'posterSRC,size,addPlayButton';
        $dca['subpalettes']['videoFullsize'] = 'videoLinkText';
        $dca['palettes']['__selector__'][] = 'addPreviewImage';
        $dca['palettes']['__selector__'][] = 'videoFullsize';
    }

    /**
     * Return the video bundle dca fields.
     *
     * @return array
     */
    public static function getVideoFields(array $dca = [])
    {
        Controller::loadDataContainer('tl_content');

        $videoFields = [
            'youtube' => $GLOBALS['TL_DCA']['tl_content']['fields']['youtube'],
            'vimeo' => $GLOBALS['TL_DCA']['tl_content']['fields']['vimeo'],
            'videoProvider' => [
                'label' => &$GLOBALS['TL_LANG']['tl_content']['videoProvider'],
                'inputType' => 'select',
                'options_callback' => function (\DataContainer $dc) {
                    return \Contao\System::getContainer()->get(\HeimrichHannot\VideoBundle\Collection\VideoProviderCollection::class)->getVideoProvider();
                },
                'reference' => &$GLOBALS['TL_LANG']['tl_content']['reference']['videoProvider'],
                'eval' => ['submitOnChange' => true, 'maxlength' => 64, 'includeBlankOption' => true],
                'sql' => "varchar(64) NOT NULL default ''",
            ],
            'addPreviewImage' => [
                'label' => &$GLOBALS['TL_LANG']['tl_content']['addPreviewImage'],
                'exclude' => true,
                'inputType' => 'checkbox',
                'eval' => ['submitOnChange' => true, 'tl_class' => 'clr'],
                'sql' => "char(1) NOT NULL default ''",
            ],
            'addPlayButton' => [
                'label' => &$GLOBALS['TL_LANG']['tl_content']['addPlayButton'],
                'exclude' => true,
                'inputType' => 'checkbox',
                'eval' => ['tl_class' => 'w50'],
                'sql' => "char(1) NOT NULL default ''",
            ],
            'videoRemoveControls' => [
                'label' => &$GLOBALS['TL_LANG']['tl_content']['videoRemoveControls'],
                'exclude' => true,
                'inputType' => 'checkbox',
                'eval' => ['tl_class' => 'w50'],
                'sql' => "char(1) NOT NULL default ''",
            ],
            'videoLoop' => [
                'label' => &$GLOBALS['TL_LANG']['tl_content']['videoLoop'],
                'exclude' => true,
                'inputType' => 'checkbox',
                'eval' => ['tl_class' => 'w50'],
                'sql' => "char(1) NOT NULL default ''",
            ],
            'videoDuration' => [
                'label' => &$GLOBALS['TL_LANG']['tl_content']['videoDuration'],
                'exclude' => true,
                'search' => true,
                'sorting' => true,
                'flag' => 1,
                'inputType' => 'text',
                'eval' => ['maxlength' => 255, 'tl_class' => 'w50 clr'],
                'sql' => "varchar(255) NOT NULL default ''",
            ],
            'videoShowRelated' => [
                'label' => &$GLOBALS['TL_LANG']['tl_content']['videoShowRelated'],
                'exclude' => true,
                'inputType' => 'checkbox',
                'eval' => ['tl_class' => 'w50 clr'],
                'sql' => "char(1) NOT NULL default ''",
            ],
            'ytModestBranding' => [
                'label' => &$GLOBALS['TL_LANG']['tl_content']['ytModestBranding'],
                'exclude' => true,
                'inputType' => 'checkbox',
                'eval' => ['tl_class' => 'w50'],
                'sql' => "char(1) NOT NULL default ''",
            ],
            'ytShowInfo' => [
                'label' => &$GLOBALS['TL_LANG']['tl_content']['ytShowInfo'],
                'exclude' => true,
                'inputType' => 'checkbox',
                'eval' => ['tl_class' => 'w50'],
                'sql' => "char(1) NOT NULL default ''",
            ],
            'videoLinkText' => [
                'label' => &$GLOBALS['TL_LANG']['tl_content']['videoLinkText'],
                'exclude' => true,
                'inputType' => 'select',
                'default' => 'huh_video.fields.videoLinkText.default',
                'options_callback' => function (\DataContainer $dc) {
                    return \Contao\System::getContainer()->get('huh.utils.choice.message')->getCachedChoices('huh_video.fields.videoLinkText');
                },
                'eval' => ['maxlength' => 255, 'tl_class' => 'w50'],
                'sql' => "varchar(255) NOT NULL default ''",
            ],
            'videoFullsize' => [
                'label' => &$GLOBALS['TL_LANG']['tl_content']['videoFullsize'],
                'exclude' => true,
                'inputType' => 'checkbox',
                'eval' => ['tl_class' => 'w50 clr', 'submitOnChange' => true],
                'sql' => "char(1) NOT NULL default ''",
            ],
            'videoAutoplay' => [
                'label' => &$GLOBALS['TL_LANG']['tl_content']['videoAutoplay'],
                'exclude' => true,
                'inputType' => 'checkbox',
                'eval' => ['tl_class' => 'w50'],
                'sql' => "char(1) NOT NULL default ''",
            ],
            'videoSRC' => [
                'label' => &$GLOBALS['TL_LANG']['tl_content']['videoSRC'],
                'exclude' => false,
                'inputType' => 'multiColumnEditor',
                'eval' => [
                    'tl_class' => 'long clr',
                    'multiColumnEditor' => [
                        'minRowCount' => 1,
                        'skipCopyValuesOnAdd' => true,
                        'fields' => [
                            'file' => [
                                'label' => &$GLOBALS['TL_LANG']['tl_content']['videoSRC_file'],
                                'inputType' => 'fileTree',
                                'eval' => [
                                    'multiple' => false,
                                    'filesOnly' => true,
                                    'fieldType' => 'radio',
                                    'mandatory' => true,
                                    'submitOnChange' => true,
                                    'groupStyle' => 'width: 48%',
                                ],
                            ],
                            'mediaQuery' => [
                                'label' => &$GLOBALS['TL_LANG']['tl_content']['videoSRC_mediaQuery'],
                                'inputType' => 'select',
                                'eval' => [
                                    'includeBlankOption' => true,
                                    'groupStyle' => 'width: 48%',
                                ],
                                'options_callback' => [\HeimrichHannot\VideoBundle\DataContainer\VideoFieldContainer::class, 'getMediaQueries'],
                            ],
                        ],
                    ],
                ],
                'sql' => 'blob NULL',
            ],
            'multiResolutionVideoSRC' => [                
                'label' => &$GLOBALS['TL_LANG']['tl_content']['multiResolutionVideoSRC_file'],
                'inputType' => 'fileTree',
                'eval' => [
                    'multiple' => true,
                    'filesOnly' => true,
                    'fieldType' => 'checkbox',
                    'mandatory' => true,
                    'submitOnChange' => true,
                    'groupStyle' => 'width: 48%'
                ],
                'sql' => 'blob NULL',
            ],
            'videoRemoteFile' => [
                'label' => &$GLOBALS['TL_LANG']['tl_content']['videoRemoteFile'],
                'exclude' => false,
                'inputType' => 'text',
                'eval' => [
                    'maxlength' => 255, 
                    'tl_class' => 'w50',
                    'mandatory' => true,
                    'rgxp' => 'custom',
                    'customRgxp' => RemoteFileVideoMultipleResolution::getFilePathRegExp()
                ],
                'sql' => "varchar(255) NOT NULL default ''",
            ],
            'videoRemoteResolutions' => [
                'label' => &$GLOBALS['TL_LANG']['tl_content']['videoRemoteResolutions'],
                'exclude' => false,
                'inputType' => 'text',
                'default' => '1080,720,480,360',
                'eval' => [
                    'maxlength' => 255, 
                    'tl_class' => 'w50 clr',
                    'mandatory' => true,
                    'rgxp' => 'custom',
                    'customRgxp' => RemoteFileVideoMultipleResolution::getResolutionsRegExp()
                ],
                'sql' => "varchar(255) NOT NULL default ''",
            ],
            'videoSubtitles' => [
                'label' => &$GLOBALS['TL_LANG']['tl_content']['videoSubtitles'],
                'exclude' => false,
                'inputType' => 'multiColumnEditor',
                'eval' => [
                    'tl_class' => 'long clr',
                    'multiColumnEditor' => [
                        'minRowCount' => 0,
                        'skipCopyValuesOnAdd' => true,
                        'fields' => [
                            'file' => [
                                'label' => &$GLOBALS['TL_LANG']['tl_content']['videoSubtitles_file'],
                                'inputType' => 'fileTree',
                                'eval' => [
                                    'multiple' => true,
                                    'filesOnly' => true,
                                    'fieldType' => 'radio',
                                    'extensions' => 'vtt',
                                    'mandatory' => true,
                                    'submitOnChange' => true,
                                    'groupStyle' => 'width: 48%',
                                ],
                            ],
                            'language' => [
                                'label' => &$GLOBALS['TL_LANG']['tl_content']['videoSubtitles_language'],
                                'inputType' => 'select',
                                'eval' => [
                                    'mandatory' => true,
                                    'includeBlankOption' => true,
                                    'groupStyle' => 'width: 48%',
                                ],
                                'options_callback' => function (\DataContainer $dc) {
                                    return \Contao\System::getLanguages(true);
                                },
                            ],
                        ],
                    ],
                ],
                'sql' => 'blob NULL',
            ],
            'videoAlternativeText' => [
                'label' => &$GLOBALS['TL_LANG']['tl_content']['videoAlternativeText'],
                'exclude' => true,
                'search' => true,
                'inputType' => 'textarea',
                'eval' => ['tl_class' => 'long clr', 'mandatory' => false],
                'sql' => 'text NULL',
            ],
            'transcriptedYoutube' => [
                'label' => &$GLOBALS['TL_LANG']['tl_content']['transcriptedYoutube'],
                'exclude' => true,
                'search' => true,
                'inputType' => 'text',
                'eval' => ['decodeEntities' => true, 'tl_class' => 'w50'],
                'save_callback' => [
                    ['tl_content', 'extractYouTubeId'],
                ],
                'sql' => "varchar(16) NOT NULL default ''",
            ],
            'transcriptedVimeo' => [
                'label' => &$GLOBALS['TL_LANG']['tl_content']['transcriptedVimeo'],
                'exclude' => true,
                'search' => true,
                'inputType' => 'text',
                'eval' => ['decodeEntities' => true, 'tl_class' => 'w50'],
                'save_callback' => [
                    ['tl_content', 'extractVimeoId'],
                ],
                'sql' => "varchar(16) NOT NULL default ''",
            ],
        ];

        if (!empty($dca) && !\array_key_exists('posterSRC', $dca['fields'])) {
            $videoFields['posterSRC'] = $GLOBALS['TL_DCA']['tl_content']['fields']['posterSRC'];
        }

        return $videoFields;
    }
}
