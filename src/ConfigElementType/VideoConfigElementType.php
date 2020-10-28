<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\ConfigElementType;

use HeimrichHannot\ListBundle\ConfigElementType\ListConfigElementData;
use HeimrichHannot\ListBundle\ConfigElementType\ListConfigElementTypeInterface;
use HeimrichHannot\ListBundle\Item\ItemInterface;
use HeimrichHannot\ListBundle\Model\ListConfigElementModel;
use HeimrichHannot\ReaderBundle\ConfigElementType\ReaderConfigElementData;
use HeimrichHannot\ReaderBundle\ConfigElementType\ReaderConfigElementTypeInterface;
use HeimrichHannot\ReaderBundle\Model\ReaderConfigElementModel;
use HeimrichHannot\VideoBundle\Collection\VideoProviderCollection;
use HeimrichHannot\VideoBundle\Generator\VideoGenerator;
use Twig\Error\LoaderError;

class VideoConfigElementType implements ListConfigElementTypeInterface, ReaderConfigElementTypeInterface
{
    /**
     * @var VideoProviderCollection
     */
    private $videoProviderCollection;
    /**
     * @var VideoGenerator
     */
    private $videoGenerator;

    public function __construct(VideoProviderCollection $videoProviderCollection, VideoGenerator $videoGenerator)
    {
        $this->videoProviderCollection = $videoProviderCollection;
        $this->videoGenerator = $videoGenerator;
    }

    public static function getType(): string
    {
        return 'huh_video';
    }

    public function getPalette(): string
    {
        return '{video_legend},imageSelectorField;';
    }

    public function addToListItemData(ListConfigElementData $configElementData): void
    {
        $this->addToItemData($configElementData->getItem(), $configElementData->getListConfigElement());
    }

    public function addToReaderItemData(ReaderConfigElementData $configElementData): void
    {
        $this->addToItemData($configElementData->getItem(), $configElementData->getReaderConfigElement());
    }

    /**
     * @param ItemInterface|\HeimrichHannot\ReaderBundle\Item\ItemInterface $item
     * @param ListConfigElementModel|ReaderConfigElementModel               $config
     *
     * @throws LoaderError
     * @throws \Twig\Error\RuntimeError
     * @throws \Twig\Error\SyntaxError
     */
    protected function addToItemData($item, $config)
    {
        $video = $this->videoProviderCollection->getVideoByRawDataWithSelector($item->getRaw());

        if (!$video) {
            return;
        }
        $videoBuffer = $this->videoGenerator->generate($video, $this);

        $item->setFormattedValue(
            $config->templateVariable, $videoBuffer);
    }
}
