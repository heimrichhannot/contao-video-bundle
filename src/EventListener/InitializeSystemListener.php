<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\EventListener;

/**
 * @Hook("initializeSystem")
 */
class InitializeSystemListener
{
    public function __invoke(): void
    {
        $hookKeys = array_keys($GLOBALS['TL_HOOKS']['loadDataContainer']);

        if (($hookPosition = array_search('huh_video', $hookKeys, true)) > array_search('multiColumnEditor', $hookKeys, true)) {
            $tmp = $GLOBALS['TL_HOOKS']['loadDataContainer']['multiColumnEditor'];
            unset($GLOBALS['TL_HOOKS']['loadDataContainer']['multiColumnEditor']);
            array_insert($GLOBALS['TL_HOOKS']['loadDataContainer'], $hookPosition, ['multiColumnEditor' => $tmp]);

            return;
        }
    }
}
