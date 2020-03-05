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
use Symfony\Component\DependencyInjection\ContainerInterface;

class FrontendAsset
{
    /**
     * @var ContainerInterface
     */
    private $container;
    /**
     * @var ContainerUtil
     */
    private $containerUtil;


    /**
     * FrontendAsset constructor.
     */
    public function __construct(ContainerInterface $container, ContainerUtil $containerUtil)
    {
        $this->container = $container;
        $this->containerUtil = $containerUtil;
    }

    public function addFrontendAsset()
    {
        if (!$this->containerUtil->isFrontend()) {
            return;
        }

        if ($this->container->has('huh.encore.asset.frontend')) {
            $this->container->get('huh.encore.asset.frontend')->addActiveEntrypoint('contao-video-bundle');
            $this->container->get('huh.encore.asset.frontend')->addActiveEntrypoint('contao-video-bundle-theme');
        }

        $GLOBALS['TL_USER_CSS']['contao-video-bundle']             = 'bundles/heimrichhannotvideo/assets/contao-video-bundle-theme.css|static';
        $GLOBALS['TL_JAVASCRIPT']['contao-video-bundle']           = 'bundles/heimrichhannotvideo/assets/contao-video-bundle.js|static';
        $GLOBALS['TL_USER_CSS']['alertifyjs']   = 'bundles/heimrichhannotvideo/assets/alertify.css|static';
        $GLOBALS['TL_JAVASCRIPT']['alertifyjs'] = 'bundles/heimrichhannotvideo/assets/alertify.js|static';
    }
}