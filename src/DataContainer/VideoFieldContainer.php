<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\DataContainer;

use Contao\DataContainer;
use Contao\System;
use HeimrichHannot\VideoBundle\EventListener\Dca\OnMediaQueryOptionCallbackListener;

/**
 * @deprecated Use OnMediaQueryOptionCallbackListener instead.
 */
class VideoFieldContainer
{
    public function getMediaQueries(?DataContainer $dc): array
    {
        trigger_deprecation(
            'heimrichhannot/contao-video-bundle',
            '1.8.0',
            'Using %s has been deprecated and will no longer be supported in the future. Use %s instead.',
            VideoFieldContainer::class,
            OnMediaQueryOptionCallbackListener::class
        );

        $config = System::getContainer()->getParameter('huh_video');
        $queries = [];

        if (\is_array($config['media_queries'])) {
            foreach ($config['media_queries'] as $key => $query) {
                if (!empty($query['name'])) {
                    $queries[$key] = $query['name'].' ['.$query['query'].']';
                } else {
                    $queries[$key] = $query['query'];
                }
            }
        }

        return $queries;
    }
}
