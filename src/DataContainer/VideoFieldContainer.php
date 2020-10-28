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

        if (\is_array($config['video_media_queries'])) {
            foreach ($config['video_media_queries'] as $key => $query) {
                $queries[$key] = $query['query'];
            }
        }

        return $queries;
    }
}
