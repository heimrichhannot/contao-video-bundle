<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */


namespace HeimrichHannot\VideoBundle\Video;


class YouTubeVideo extends AbstractVideo implements PreviewImageInterface
{
    const PRIVACY_EMBED_URL = '//www.youtube-nocookie.com/embed/';
    const DEFAULT_EMBED_URL = '//www.youtube.com/embed/';

    /**
     * The youtube video id
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
    protected $ytShowRelated = false;

    /**
     * @var bool
     */
    protected $youtubePrivacy = false;

    /**
     * @var bool
     */
    protected $ytModestBranding = false;

    /**
     * @var bool
     */
    protected $ytShowInfo = false;

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
    protected $addPlayButton = false;

    public static function getType(): string
    {
        return 'youtube';
    }

    /**
     * @inheritDoc
     */
    public static function getTemplate(): string
    {
        return '@HeimrichHannotVideo/video/video_youtube_default.html.twig';
    }

    public function getSrc()
    {
        $url = $this->youtubePrivacy ? static::PRIVACY_EMBED_URL : static::DEFAULT_EMBED_URL;
        $url .= $this->youtube;

        $queryParams = [];
        $queryParams['rel'] = $this->ytShowRelated;
        $queryParams['modestbranding'] = $this->ytModestBranding;
        $queryParams['showinfo'] = $this->ytShowInfo;

        if ($this->autoplay) {
            $queryParams['autoplay'] = 1;
        }
        $url .= '?'.http_build_query($queryParams);
        return $url;
    }

    /**
     * @return bool
     */
    public function getShowRelated(): bool
    {
        return $this->ytShowRelated;
    }

    /**
     * @return bool
     */
    public function getModestBranding(): bool
    {
        return $this->ytModestBranding;
    }

    /**
     * @return bool
     */
    public function getShowInfo(): bool
    {
        return $this->ytShowInfo;
    }

    /**
     * @return string
     */
    public function getVideoDuration(): string
    {
        return $this->videoDuration;
    }

    /**
     * @return string
     */
    public function getPreviewImage(): string
    {
        return $this->posterSRC;
    }

    /**
     * @return bool
     */
    public function getAddPlayButton(): bool
    {
        return $this->addPlayButton;
    }


    /**
     * @inheritDoc
     */
    public function hasPreviewImage(): bool
    {
        return $this->addPreviewImage;
    }
}