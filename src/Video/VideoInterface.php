<?php


namespace HeimrichHannot\VideoBundle\Video;


interface VideoInterface
{
    /**
     * Return the twig template name
     *
     * @return string
     */
    public static function getTemplate(): string;

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
}