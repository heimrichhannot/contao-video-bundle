<?php

/*
 * Copyright (c) 2023 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\Asset;

use HeimrichHannot\EncoreContracts\PageAssetsTrait;
use Symfony\Contracts\Service\ServiceSubscriberInterface;

class FrontendAsset implements ServiceSubscriberInterface
{
    use PageAssetsTrait;

    public function addFrontendAsset()
    {
        $this->addPageEntrypoint('contao-video-bundle', [
            'TL_JAVASCRIPT' => [
                'contao-video-bundle' => 'bundles/heimrichhannotvideo/assets/contao-video-bundle.js|static',
                'alertifyjs' => 'bundles/heimrichhannotvideo/assets/alertify.js|static',
            ],
        ]);
        $this->addPageEntrypoint('contao-video-bundle-theme', [
            'TL_USER_CSS' => [
                'contao-video-bundle' => 'bundles/heimrichhannotvideo/assets/contao-video-bundle-theme.css|static',
                'alertifyjs' => 'bundles/heimrichhannotvideo/assets/alertify.css|static',
            ],
        ]);
    }
}
