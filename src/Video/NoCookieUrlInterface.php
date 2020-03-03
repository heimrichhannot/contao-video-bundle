<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */


namespace HeimrichHannot\VideoBundle\Video;


interface NoCookieUrlInterface
{

    /**
     * Return an url that tells the video provider that no cookies should be set.
     *
     * @return string
     */
    public function getNoCookieSrc(): string;
}