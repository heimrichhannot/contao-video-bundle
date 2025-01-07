<?php

/*
 * Copyright (c) 2023 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\EventListener;

use Contao\CoreBundle\DependencyInjection\Attribute\AsHook;
use HeimrichHannot\UtilsBundle\Util\Utils;

#[AsHook('initializeSystem')]
class InitializeSystemListener
{
    public function __construct(private Utils $utils)
    {
    }

    public function __invoke(): void
    {
        if ($this->utils->container()->isBackend()) {
            $GLOBALS['TL_CSS']['be_videobundle'] = 'bundles/heimrichhannotvideo/assets/contao-video-bundle-be.css|static';
            $GLOBALS['TL_JAVASCRIPT']['be_videobundle'] = 'bundles/heimrichhannotvideo/assets/contao-video-bundle-be.js|static';
        }
    }
}
