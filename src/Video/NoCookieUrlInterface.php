<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\Video;

interface NoCookieUrlInterface
{
    /**
     * Return an url that tells the video provider that no cookies should be set.
     */
    public function getNoCookieSrc(): string;
}
