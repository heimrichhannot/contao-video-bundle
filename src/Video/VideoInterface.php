<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\Video;

interface VideoInterface
{
    public function __construct(array $data);

    /**
     * Return the video provider type/alias. For example 'youtube' or 'vimeo'.
     */
    public static function getType(): string;

    /**
     * Return the twig template name.
     */
    public static function getTemplate(): string;

    /**
     * Return comma-seperated list of video provider specific dca/database fields.
     */
    public static function getPalette(): string;

    /**
     * Return the video data.
     */
    public function getData(): array;

    /**
     * Set the video data.
     *
     * @return mixed
     */
    public function setData(array $rawData): void;

    /**
     * Return if the video should be display in a modal or a new browser window.
     */
    public function isFullsize(): bool;

    /**
     * Return the video link text translation id.
     */
    public function getVideoLinkText(): string;

    /**
     * Return the headline text.
     */
    public function getHeadlineText(): string;

    /**
     * Return the video url.
     */
    public function getSrc(): string;

    /**
     * Return if a play button should be added to the preview image.
     */
    public function getAddPlayButton(): bool;
}
