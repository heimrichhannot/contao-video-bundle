<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\Collection;

use HeimrichHannot\VideoBundle\Video\VideoInterface;

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

    /**
     * Return all video provider as array.
     *
     * @return array
     */
    public function getVideoProvider()
    {
        if (isset($this->bundleConfig['video_provider'])) {
            return array_keys($this->bundleConfig['video_provider']);
        }
    }

    /**
     * @throws \Exception
     */
    public function getClassByVideoProvider(string $provider): string
    {
        if (isset($this->bundleConfig['video_provider'][$provider]['class'])) {
            return $this->bundleConfig['video_provider'][$provider]['class'];
        }

        throw new \Exception('No configuration exists for given provider');
    }

    /**
     * Return a video object base.
     *
     * @param string $selector
     */
    public function getVideoByRawDataWithSelector(array $data, ?string $selector = 'addVideo'): ?VideoInterface
    {
        if (\is_string($selector) && !isset($data[$selector]) && true !== (bool) $data[$selector]) {
            return null;
        }

        if (!isset($data['videoProvider']) && false === \is_string($data['videoProvider'])) {
            return null;
        }

        try {
            /** @var string|VideoInterface $videoClass */
            $videoClass = $this->getClassByVideoProvider($data['videoProvider']);
        } catch (\Exception $e) {
            return null;
        }

        return new $videoClass($data);
    }
}
