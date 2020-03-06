<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */


namespace HeimrichHannot\VideoBundle\Asset;


use HeimrichHannot\UtilsBundle\Container\ContainerUtil;

class FrontendAsset
{
    /**
     * @var ContainerUtil
     */
    private $containerUtil;
    /**
     * @var \HeimrichHannot\EncoreBundle\Asset\FrontendAsset
     */
    protected $encoreFrontendAsset;


    /**
     * FrontendAsset constructor.
     */
    public function __construct(ContainerUtil $containerUtil)
    {
        $this->containerUtil = $containerUtil;
    }

    /**
     * @param \HeimrichHannot\EncoreBundle\Asset\FrontendAsset $encoreFrontendAsset
     */
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

        $GLOBALS['TL_USER_CSS']['contao-video-bundle']             = 'bundles/heimrichhannotvideo/assets/contao-video-bundle-theme.css|static';
        $GLOBALS['TL_JAVASCRIPT']['contao-video-bundle']           = 'bundles/heimrichhannotvideo/assets/contao-video-bundle.js|static';
        $GLOBALS['TL_USER_CSS']['alertifyjs']   = 'bundles/heimrichhannotvideo/assets/alertify.css|static';
        $GLOBALS['TL_JAVASCRIPT']['alertifyjs'] = 'bundles/heimrichhannotvideo/assets/alertify.js|static';
    }
}