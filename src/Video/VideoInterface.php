<?php


namespace HeimrichHannot\VideoBundle\Video;


interface VideoInterface
{
    public function __construct(array $data);

    /**
     * Return the video provider type/alias. For example 'youtube' or 'vimeo'
     *
     * @return string
     */
    public static function getType(): string;

    /**
     * Return the twig template name
     *
     * @return string
     */
    public static function getTemplate(): string;

    /**
     * Return comma-seperated list of video provider specific dca/database fields.
     *
     * @return string
     */
    public static function getPalette(): string;

    /**
     * Return the video data.
     *
     * @return array
     */
    public function getData(): array;

    /**
     * Set the video data
     *
     * @param array $rawData
     * @return mixed
     */
    public function setData(array $rawData): void;

    /**
     * Return if the video should be display in a modal or a new browser window
     *
     * @return bool
     */
    public function isFullsize(): bool;

    /**
     * Return the video link text translation id
     *
     * @return string
     */
    public function getVideoLinkText(): string;

    /**
     * Return the headline text
     */
    public function getHeadlineText(): string;

    /**
     * Return the video url
     *
     * @return string
     */
    public function getSrc(): string;

    /**
     * Return if a play button should be added to the preview image
     *
     * @return bool
     */
    public function getAddPlayButton(): bool;
}