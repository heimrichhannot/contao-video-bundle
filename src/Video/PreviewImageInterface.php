<?php


namespace HeimrichHannot\VideoBundle\Video;


interface PreviewImageInterface
{
    /**
     * Return if video has preview image set or not
     *
     * @return bool
     */
    public function hasPreviewImage(): bool;

    /**
     * Return the preview image uuid
     *
     * @return string
     */
    public function getPreviewImage(): ?string;


}