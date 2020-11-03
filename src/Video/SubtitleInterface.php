<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\Video;

interface SubtitleInterface
{
    /**
     * Return Subtitle File path with associated language.
     */
    public function getSubtitles(): array;
}
