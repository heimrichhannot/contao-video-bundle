<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */


namespace HeimrichHannot\VideoBundle\ConfigElementType;


use HeimrichHannot\ListBundle\ConfigElementType\ListConfigElementData;
use HeimrichHannot\ListBundle\ConfigElementType\ListConfigElementTypeInterface;
use HeimrichHannot\UtilsBundle\Container\ContainerUtil;
use HeimrichHannot\VideoBundle\Collection\VideoProviderCollection;
use HeimrichHannot\VideoBundle\Generator\VideoGenerator;
use Twig\Error\LoaderError;

class VideoConfigElementType implements ListConfigElementTypeInterface
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
        $video = $this->videoProviderCollection->getVideoByRawDataWithSelector($configElementData->getItem()->getRaw());
        if (!$video) {
            return;
        }
        $videoBuffer = $this->videoGenerator->generate($video, $this);
        $configElementData->getItem()->setFormattedValue(
            $configElementData->getListConfigElement()->templateVariable, $videoBuffer);
    }
}