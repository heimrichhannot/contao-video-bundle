<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\Asset;

use HeimrichHannot\UtilsBundle\Container\ContainerUtil;

class FrontendAsset
{
    /**
     * @var \HeimrichHannot\EncoreBundle\Asset\FrontendAsset
     */
    protected $encoreFrontendAsset;
    /**
     * @var ContainerUtil
     */
    private $containerUtil;

    /**
     * FrontendAsset constructor.
     */
    public function __construct(ContainerUtil $containerUtil)
    {
        $this->containerUtil = $containerUtil;
    }

    public function setEncoreFrontendAsset(\HeimrichHannot\EncoreBundle\Asset\FrontendAsset $encoreFrontendAsset): void
    {
        $this->encoreFrontendAsset = $encoreFrontendAsset;
    }

    public function addFrontendAsset()
    {
        if (!$this->containerUtil->isFrontend()) {
            return;
        }

        if ($this->encoreFrontendAsset) {
            $this->encoreFrontendAsset->addActiveEntrypoint('contao-video-bundle');
            $this->encoreFrontendAsset->addActiveEntrypoint('contao-video-bundle-theme');
        }

        $GLOBALS['TL_USER_CSS']['contao-video-bundle'] = 'bundles/heimrichhannotvideo/assets/contao-video-bundle-theme.css|static';
        $GLOBALS['TL_JAVASCRIPT']['contao-video-bundle'] = 'bundles/heimrichhannotvideo/assets/contao-video-bundle.js|static';
        $GLOBALS['TL_USER_CSS']['alertifyjs'] = 'bundles/heimrichhannotvideo/assets/alertify.css|static';
        $GLOBALS['TL_JAVASCRIPT']['alertifyjs'] = 'bundles/heimrichhannotvideo/assets/alertify.js|static';
    }
}
