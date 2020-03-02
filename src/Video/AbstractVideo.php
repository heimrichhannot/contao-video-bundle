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


use ReflectionClass;

abstract class AbstractVideo
{
    /**
     * @var array
     */
    protected $rawData;

    /**
     * @var string
     */
    protected $posterSRC;

    /**
     * AbstractVideo constructor.
     * @param array $data
     */
    public function __construct(array $data)
    {
        $this->setData($data);
    }


    /**
     * Return the video provider type/alias. For example 'youtube' or 'vimeo'
     *
     * @return string
     */
    abstract public static function getType(): string;

    /**
     * Return the twig template name
     *
     * @return string
     */
    abstract public static function getTemplate(): string;

    public function setData(array $rawData)
    {
        $this->rawData = $rawData;
        foreach ($rawData as $key => $value)
        {
            if (property_exists($this, $key)) {
                $this->{$key} = $value;
            }
        }
    }

    /**
     * @return array
     * @throws \ReflectionException
     */
    public function getData(): array
    {

        $result = array();

        $class = new ReflectionClass(static::class);
        foreach ($class->getMethods() as $method) {
            if (substr($method->name, 0, 3) == 'get' && $method->name !== 'getData') {
                if ($method->isStatic()) {
                    continue;
                }
                $propName = strtolower(substr($method->name, 3, 1)) . substr($method->name, 4);

                $result[$propName] = $method->invoke($this);
            }
        }
        return $result;
    }

    /**
     * @return array
     */
    public function getRawData(): array
    {
        return $this->rawData;
    }
}