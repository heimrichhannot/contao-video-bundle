<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\ConfigElementType;

use HeimrichHannot\ConfigElementTypeBundle\ConfigElementType\ConfigElementData;
use HeimrichHannot\ConfigElementTypeBundle\ConfigElementType\ConfigElementResult;
use HeimrichHannot\ConfigElementTypeBundle\ConfigElementType\ConfigElementTypeInterface;
use HeimrichHannot\VideoBundle\Collection\VideoProviderCollection;
use HeimrichHannot\VideoBundle\Generator\VideoGenerator;

class VideoConfigElementType implements ConfigElementTypeInterface
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

    public function getPalette(string $prependPalette, string $appendPalette): string
    {
        return $prependPalette.'{video_legend},imageSelectorField;'.$appendPalette;
    }

    public function applyConfiguration(ConfigElementData $configElementData): ConfigElementResult
    {
        $video = $this->videoProviderCollection->getVideoByRawDataWithSelector($configElementData->getItemData());

        if (!$video) {
            return new ConfigElementResult(ConfigElementResult::TYPE_NONE, null);
        }

        return new ConfigElementResult(
            ConfigElementResult::TYPE_FORMATTED_VALUE,
            $this->videoGenerator->generate($video, $this)
        );
    }
}
