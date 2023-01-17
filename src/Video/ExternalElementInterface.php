<?php

/*
 * Copyright (c) 2023 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\Video;

interface ExternalElementInterface
{
    /**
     * Return the element type. Usually "iframe".
     */
    public function videoElementType(): string;

    /**
     * Return the video element attributes like src, allow, aria-label.
     */
    public function videoElementAttributes(array $context): array;
}
