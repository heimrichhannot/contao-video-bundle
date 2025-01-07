<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\DataContainer;

use Contao\DataContainer;
use Contao\System;

class VideoFieldContainer
{
    public function getMediaQueries(?DataContainer $dc): array
    {
        $config = System::getContainer()->getParameter('huh_video');
        $queries = [];

        if (\is_array($config['media_queries'])) {
            foreach ($config['media_queries'] as $key => $query) {
                if (!empty($query['name'])) {
                    $queries[$key] = $query['name'] . ' [' . $query['query'] . ']';
                } else {
                    $queries[$key] = $query['query'];
                }
            }
        }

        return $queries;
    }
}
