<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

$GLOBALS['TL_LANG']['tl_content']['previewImage_legend'] = 'Vorschaubild-Einstellungen';
$GLOBALS['TL_LANG']['tl_content']['video_legend'] = 'Video-Einstellungen';

/*
 * Fields
 */

$GLOBALS['TL_LANG']['tl_content']['addVideo'] = ['Video hinzufügen', 'Wählen Sie diese Option, wenn Sie ein Video hinzufügen möchten.'];
$GLOBALS['TL_LANG']['tl_content']['videoProvider'] = ['Video-Anbieter', 'Wählen Sie den gewünschten Video-Anbieter aus.'];
$GLOBALS['TL_LANG']['tl_content']['videoFullsize'] = ['Großansicht/Neues Fenster', 'Großansicht des Videos in einer Lightbox bzw. den Link in einem neuem Browserfenster öffnen.'];

$GLOBALS['TL_LANG']['tl_content']['addPreviewImage'] = ['Vorschaugrafik hinzufügen', 'Wählen Sie diese Option, wenn Sie dem Video eine Vorschaugrafik hinzufügen möchten, wenn das Vorschaubild nicht gesetzt ist, wird das Bild von Youtube geladen.'];
$GLOBALS['TL_LANG']['tl_content']['addPlayButton'] = ['Play-Button hinzufügen', 'Wählen Sie diese Option, damit dem Video ein div-Element für eine Play-Grafik hinzugefügt wird.'];

$GLOBALS['TL_LANG']['tl_content']['videoDuration'] = ['Länge', 'Geben Sie hier die Dauer des Videos ein.'];
$GLOBALS['TL_LANG']['tl_content']['videoShowRelated'] = ['Auch ähnliche Videos anderer Kanälen zulassen', 'Wählen Sie diese Option, wenn nach dem Abspielen auch ähnliche Videos anderer Kanäle angezeigt werden dürfen.'];
$GLOBALS['TL_LANG']['tl_content']['ytModestBranding'] = ['YouTube-Branding ausblenden', 'Wählen Sie diese Option, wenn YouTube-Branding-Infos ausgeblendet werden sollen.'];
$GLOBALS['TL_LANG']['tl_content']['ytShowInfo'] = ['Video-Infos anzeigen', 'Wählen Sie diese Option, wenn Infos zum Video angezeit werden sollen.'];
$GLOBALS['TL_LANG']['tl_content']['videoLinkText'] = ['Link-Text', 'Der angezeigte Text des Links, der die Lightbox bzw. das neue Browserfenster öffnet.'];
//$GLOBALS['TL_LANG']['tl_content']['youtube_template']       = ['Individuelles Youtube-Template', 'Überschreiben Sie das Standard Youtube-Template mit einer eigenen Vorlage.'];
$GLOBALS['TL_LANG']['tl_content']['videofullsizeTemplate'] = ['Individuelles Template für Großansicht/Neues Fenster', 'Überschreiben Sie das Standard Template mit einer eigenen Vorlage zur Anzeige eines Videos in der Großansicht/Neues Fenster.'];
$GLOBALS['TL_LANG']['tl_content']['videoFullSize'] = ['Großansicht/Neues Fenster', 'Großansicht des Videos in einer Lightbox bzw. den Link in einem neuem Browserfenster öffnen.'];
$GLOBALS['TL_LANG']['tl_content']['videoAutoplay'] = ['Autoplay', 'Das Video automatisch beim Laden der Seite abspielen.'];

$GLOBALS['TL_LANG']['tl_content']['videoSRC'][0] = 'Videoquelle und Mediaquery';
$GLOBALS['TL_LANG']['tl_content']['videoSRC'][1] = 'Wählen sie hier die Video Datei aus und die Media Query in der diese Datei angezeigt werden soll.';
$GLOBALS['TL_LANG']['tl_content']['videoSRC_file'][0] = 'Videodatei';
$GLOBALS['TL_LANG']['tl_content']['videoSRC_file'][1] = 'Wählen Sie eine Datei mit dem Video aus.';
$GLOBALS['TL_LANG']['tl_content']['videoSRC_mediaQuery'][0] = 'Mediaquery';
$GLOBALS['TL_LANG']['tl_content']['videoSRC_mediaQuery'][1] = 'Wählen Sie die Mediaquery für das Video aus.';

$GLOBALS['TL_LANG']['tl_content']['videoSubtitles'][0] = 'Untertitel';
$GLOBALS['TL_LANG']['tl_content']['videoSubtitles'][1] = 'Untertitel aus einer Datei für das Video einstellen. Es muss eine valide .vtt Datei sein. Es können Untertitel für unterschiedliche Sprachen eingetragen werden.';
$GLOBALS['TL_LANG']['tl_content']['videoSubtitles_file'][0] = 'Unteriteldatei';
$GLOBALS['TL_LANG']['tl_content']['videoSubtitles_file'][1] = 'Wählen Sie eine Datei mir Untertiteln aus.';
$GLOBALS['TL_LANG']['tl_content']['videoSubtitles_language'][0] = 'Sprache';
$GLOBALS['TL_LANG']['tl_content']['videoSubtitles_language'][1] = 'Wählen Sie die Sprache der Untertitel aus.';

/*
 * Reference
 */
$lang['reference'] = [
    'videoProvider' => [
        'youtube' => 'YouTube',
        'vimeo' => 'Vimeo',
        'file' => 'Datei',
    ],
];
