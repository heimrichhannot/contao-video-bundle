<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\EventListener;

use HeimrichHannot\UtilsBundle\Container\ContainerUtil;

/**
 * @Hook("initializeSystem")
 */
class InitializeSystemListener
{
    /**
     * @var ContainerUtil
     */
    protected $containerUtil;

    public function __construct(ContainerUtil $containerUtil)
    {
        $this->containerUtil = $containerUtil;
    }

    public function __invoke(): void
    {
        $this->addBackendAssets();
        $hookKeys = array_keys($GLOBALS['TL_HOOKS']['loadDataContainer']);

        if (($hookPosition = array_search('huh_video', $hookKeys, true)) > array_search('multiColumnEditor', $hookKeys, true)) {
            $tmp = $GLOBALS['TL_HOOKS']['loadDataContainer']['multiColumnEditor'];
            unset($GLOBALS['TL_HOOKS']['loadDataContainer']['multiColumnEditor']);
            array_insert($GLOBALS['TL_HOOKS']['loadDataContainer'], $hookPosition, ['multiColumnEditor' => $tmp]);

            return;
        }
    }

    protected function addBackendAssets(): void
    {
        if ($this->containerUtil->isBackend()) {
            $GLOBALS['TL_CSS']['be_videobundle'] = 'bundles/heimrichhannotvideo/assets/contao-video-bundle-be.css|static';
            $GLOBALS['TL_JAVASCRIPT']['be_videobundle'] = 'bundles/heimrichhannotvideo/assets/contao-video-bundle-be.js|static';
        }
    }
}
