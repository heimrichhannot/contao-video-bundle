<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */


namespace HeimrichHannot\VideoBundle\Collection;


class VideoProviderCollection
{
    /**
     * @var array
     */
    private $bundleConfig;

    /**
     * VideoCollection constructor.
     */
    public function __construct(array $bundleConfig)
    {
        $this->bundleConfig = $bundleConfig;
    }

    public function getVideoProvider()
    {
        if (isset($this->bundleConfig['videoProvider'])) {
            return array_keys($this->bundleConfig['videoProvider']);
        }
    }

    /**
     * @param string $provider
     * @return mixed
     * @throws \Exception
     */
    public function getClassByVideoProvider(string $provider)
    {
        if (isset($this->bundleConfig['videoProvider'][$provider]['class'])) {
            return $this->bundleConfig['videoProvider'][$provider]['class'];
        }
        throw new \Exception("No configuration exists for given provider.");
    }
}