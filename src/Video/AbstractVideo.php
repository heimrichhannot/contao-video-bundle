<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\Video;

use Contao\StringUtil;
use ReflectionClass;

abstract class AbstractVideo implements VideoInterface
{
    /**
     * @var array
     */
    protected $rawData;

    /**
     * @var bool
     */
    protected $fullsize = false;

    /**
     * @var string
     */
    protected $videoLinkText;

    /**
     * @var string
     */
    protected $headlineText = '';

    /**
     * @var bool
     */
    protected $addPlayButton = false;

    /**
     * AbstractVideo constructor.
     */
    public function __construct(array $data)
    {
        $this->setData($data);
    }

    /**
     * Return the video provider type/alias. For example 'youtube' or 'vimeo'.
     */
    abstract public static function getType(): string;

    /**
     * Return the twig template name.
     */
    abstract public static function getTemplate(): string;

    /**
     * Set video data from raw.
     *
     * If you need to adjust value, it is recommended to overwrite setProperty() instead.
     */
    public function setData(array $rawData): void
    {
        $this->rawData = $rawData;

        foreach ($rawData as $key => $value) {
            $this->setProperty($key, $value);
        }
    }

    /**
     * @throws \ReflectionException
     */
    public function getData(): array
    {
        $result = [];

        $class = new ReflectionClass(static::class);

        foreach ($class->getMethods() as $method) {
            if ('get' == substr($method->name, 0, 3) && 'getData' !== $method->name) {
                if ($method->isStatic()) {
                    continue;
                }
                $propName = strtolower(substr($method->name, 3, 1)).substr($method->name, 4);

                $result[$propName] = $method->invoke($this);
            }
        }

        return $result;
    }

    public function getRawData(): array
    {
        return $this->rawData;
    }

    public function isFullsize(): bool
    {
        return $this->fullsize;
    }

    public function getVideoLinkText(): string
    {
        return $this->videoLinkText;
    }

    /**
     * {@inheritdoc}
     */
    public function getHeadlineText(): string
    {
        return $this->headlineText;
    }

    public function getAddPlayButton(): bool
    {
        return $this->addPlayButton;
    }

    /**
     * Set object property.
     *
     * If you overwrite this method, it is recommended to just adjust needed values and call parent::setProperty() afterwards
     *
     * @param $value
     */
    protected function setProperty(string $property, $value)
    {
        switch ($property) {
            case 'videoAutoplay':
                $property = 'autoplay';
                $value = (bool) $value;

                break;

            case 'videoFullsize':
                $property = 'fullsize';
                $value = (bool) $value;

                break;

            case 'headline':
                if (empty($value)) {
                    return;
                }
                $property = 'headlineText';
                $value = StringUtil::deserialize($value);

                if (\is_array($value)) {
                    $value = $value['value'];
                }

                break;
        }

        if (property_exists($this, $property)) {
            $this->{$property} = $value;
        }
    }
}
