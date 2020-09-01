<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\Video;

class YouTubeVideo extends AbstractVideo implements PreviewImageInterface, NoCookieUrlInterface
{
    const PRIVACY_EMBED_URL = 'https://www.youtube-nocookie.com/embed/';
    const DEFAULT_EMBED_URL = 'https://www.youtube.com/embed/';

    /**
     * The youtube video id.
     *
     * @var string
     */
    protected $youtube = '';

    /**
     * @var bool
     */
    protected $autoplay = false;

    /**
     * @var string
     */
    protected $videoDuration = '';

    /**
     * @var bool
     */
    protected $videoShowRelated = false;

    /**
     * @var bool
     */
    protected $ytShowInfo = false;

    /**
     * @var bool
     */
    protected $ytModestBranding = false;

    /**
     * @var bool
     */
    protected $addPreviewImage = false;

    /**
     * @var string
     */
    protected $posterSRC = '';

    public static function getType(): string
    {
        return 'youtube';
    }

    /**
     * {@inheritdoc}
     */
    public static function getTemplate(): string
    {
        return '@HeimrichHannotVideo/videoprovider/videoprovider_youtube.html.twig';
    }

    public function getSrc(): string
    {
        return $this->createUrl(false);
    }

    public function getShowRelated(): bool
    {
        return $this->videoShowRelated;
    }

    public function getModestBranding(): bool
    {
        return $this->ytModestBranding;
    }

    public function getShowInfo(): bool
    {
        return $this->ytShowInfo;
    }

    public function getVideoDuration(): string
    {
        return $this->videoDuration;
    }

    /**
     * @return string
     */
    public function getPreviewImage(): ?string
    {
        return $this->posterSRC;
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
    public function getNoCookieSrc(): string
    {
        return $this->createUrl(true);
    }

    /**
     * {@inheritdoc}
     */
    public static function getPalette(): string
    {
        return 'youtube,videoDuration,ytHd,videoShowRelated,ytModestBranding,ytShowInfo';
    }

    protected function createUrl(bool $noCookie): string
    {
        $url = $noCookie ? static::PRIVACY_EMBED_URL : static::DEFAULT_EMBED_URL;
        $url .= $this->youtube;

        $queryParams = [];
        $params = [
            'videoShowRelated' => 'rel',
            'ytModestBranding' => 'modestbranding',
            'ytShowInfo' => 'showinfo',
        ];

        foreach ($params as $property => $param) {
            if ($this->{$property}) {
                $queryParams[$param] = $this->{$property};
            }
        }
        $queryParams['rel'] = $this->videoShowRelated ? '1' : '0';
        $queryParams['modestbranding'] = $this->ytModestBranding ? '1' : '0';
        $queryParams['showinfo'] = $this->ytShowInfo ? '1' : '0';

        if ($this->autoplay) {
            $queryParams['autoplay'] = '1';
        }

        if (!empty($queryParams)) {
            $url .= '?'.http_build_query($queryParams);
        }

        return $url;
    }
}
