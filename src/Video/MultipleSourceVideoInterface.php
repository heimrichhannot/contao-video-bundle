<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\Video;

interface MultipleSourceVideoInterface extends VideoInterface
{
    /**
     * @return array
     *               returns an array of arrays
     *               example array[['file' => 'filepath', 'mediaQuery' => 'media query string']]
     */
    public function getMultipleSrc(): array;
}
