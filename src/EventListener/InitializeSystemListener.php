<?php

/*
 * Copyright (c) 2023 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\EventListener;

use Contao\CoreBundle\ServiceAnnotation\Hook;
use HeimrichHannot\UtilsBundle\Util\Utils;

/**
 * @Hook("initializeSystem")
 */
class InitializeSystemListener
{
    private Utils $utils;

    public function __construct(Utils $utils)
    {
        $this->utils = $utils;
    }

    public function __invoke(): void
    {
        if ($this->utils->container()->isBackend()) {
            $GLOBALS['TL_CSS']['be_videobundle'] = 'bundles/heimrichhannotvideo/assets/contao-video-bundle-be.css|static';
            $GLOBALS['TL_JAVASCRIPT']['be_videobundle'] = 'bundles/heimrichhannotvideo/assets/contao-video-bundle-be.js|static';
        }
    }
}
