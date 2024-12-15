<?php

/*
 * Copyright (c) 2023 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\Video;

use Contao\StringUtil;
use Contao\System;
use HeimrichHannot\UtilsBundle\File\FileUtil;
use HeimrichHannot\UtilsBundle\Model\ModelUtil;

class FileVideo extends AbstractVideo implements PreviewImageInterface, MultipleSourceVideoInterface, SubtitleInterface
{
    const TYPE = 'file';
    const TEMPLATE = '@HeimrichHannotVideo/videoprovider/videoprovider_file.html.twig';

    /**
     * @var bool
     */
    protected $addPreviewImage = false;

    /**
     * @var string
     */
    protected $posterSRC = '';

    /**
     * @var bool
     */
    protected $autoplay = false;

    /**
     * @var bool
     */
    protected $controls = true;

    /**
     * @var bool
     */
    protected $loop = false;

    /**
     * @var string
     */
    protected $alternativeText = '';

    /**
     * {@inheritdoc}
     */
    public static function getType(): string
    {
        return self::TYPE;
    }

    /**
     * {@inheritdoc}
     */
    public static function getTemplate(): string
    {
        return self::TEMPLATE;
    }

    /**
     * {@inheritdoc}
     */
    public function hasPreviewImage(): bool
    {
        return $this->addPreviewImage && \is_string($this->getPreviewImage());
    }

    /**
     * {@inheritdoc}
     */
    public function getPreviewImage(): ?string
    {
        return $this->posterSRC;
    }

    /**
     * {@inheritdoc}
     */
    public static function getPalette(): string
    {
        return 'videoSRC,videoSubtitles,videoAlternativeText';
    }

    /**
     * {@inheritdoc}
     */
    public function getSrc(): string
    {
        $path = null;
        $videoSrc = $this->prepareVideoSource();
        if(count($videoSrc)) {
            $path = $this->prepareVideoSource()[0]['file']->path;
        } 

        if (null === $path) {
            return '';
        }

        return $path;
    }

    public function getAutoplay(): bool
    {
        return $this->autoplay;
    }

    public function isLoop(): bool
    {
        return $this->loop;
    }

    public function hasControls(): bool
    {
        return $this->controls;
    }

    public function getAlternativeText(): string
    {
        if (!empty($this->getRawData()['videoAlternativeText'])) {
            $this->alternativeText = $this->getRawData()['videoAlternativeText'];
        }

        return $this->alternativeText;
    }

    public function getMultipleSrc(): array
    {
        return $this->prepareVideoSource();
    }

    public function getSubtitles(): array
    {
        $subtitles = [];
        $data = StringUtil::deserialize($this->getRawData()['videoSubtitles']);

        if (null === $data) {
            return [];
        }

        foreach ($data as $element) {
            $subtitles[] = [
                'src' => System::getContainer()->get(FileUtil::class)->getPathFromUuid($element['file'][0]),
                'lang' => $element['language'],
                'label' => System::getLanguages(true)[$element['language']],
            ];
        }

        return $subtitles;
    }

    protected function setProperty(string $property, $value)
    {
        switch ($property) {
            case 'videoRemoveControls':
                $property = 'controls';
                $value = !((bool) $value);

                break;

            case 'videoLoop':
                $property = 'loop';
                $value = (bool) $value;

                break;
        }

        if (property_exists($this, $property)) {
            $this->{$property} = $value;
        }

        parent::setProperty($property, $value);
    }

    private function prepareVideoSource(): array
    {
        $data = StringUtil::deserialize($this->getRawData()['videoSRC']);

        if (null === $data) {
            return [];
        }

        $videoSrc = [];

        $mediaQueryConfig = System::getContainer()->getParameter('huh_video')['media_queries'];

        foreach ($data as $video) {
            $mediaQuery = $mediaQueryConfig[$video['mediaQuery']]['query'] ?? '';
            $videoSrc[] = [
                'file' => System::getContainer()->get(ModelUtil::class)->getModelInstanceIfId($video['file'], 'tl_files'),
                'mediaQuery' => $mediaQuery,
            ];
        }

        return $videoSrc;
    }
}
