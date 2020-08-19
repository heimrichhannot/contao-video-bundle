<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\EventListener\Dca;

use Contao\DataContainer;
use HeimrichHannot\UtilsBundle\Choice\ModelInstanceChoice;
use HeimrichHannot\VideoBundle\Collection\VideoProviderCollection;

class PageContainer
{
    /**
     * @var VideoProviderCollection
     */
    private $videoProviderCollection;
    /**
     * @var ModelInstanceChoice
     */
    private $modelInstanceChoice;

    /**
     * PageContainer constructor.
     */
    public function __construct(VideoProviderCollection $videoProviderCollection, ModelInstanceChoice $modelInstanceChoice)
    {
        $this->videoProviderCollection = $videoProviderCollection;
        $this->modelInstanceChoice = $modelInstanceChoice;
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

    /**
     * @param DataContainer $dc
     *
     * @return mixed
     */
    public function onMceLocalStorageAttribute($dc)
    {
        return $this->modelInstanceChoice->getCachedChoices([
            'dataContainer' => 'tl_tracking_object',
        ]);
    }
}
