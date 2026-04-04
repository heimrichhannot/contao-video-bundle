<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\Video;

interface PreviewImageInterface
{
    /**
     * Return if video has preview image set or not.
     */
    public function hasPreviewImage(): bool;

    /**
     * Return the preview image uuid.
     */
    public function getPreviewImage(): ?string;
}
