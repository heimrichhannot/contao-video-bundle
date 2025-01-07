<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\EventListener\Dca;

use Contao\DataContainer;
use HeimrichHannot\VideoBundle\Collection\VideoProviderCollection;

class PageContainer
{
    /**
     * @var VideoProviderCollection
     */
    private $videoProviderCollection;
    /**
     * PageContainer constructor.
     */
    public function __construct(VideoProviderCollection $videoProviderCollection)
    {
        $this->videoProviderCollection = $videoProviderCollection;
    }

    /**
     * @param DataContainer $dc
     *
     * @return array
     */
    public function onMceVideoProviderOptionsCallback($dc)
    {
        return $this->videoProviderCollection->getVideoProvider();
    }
}
