<?php

/*
 * Copyright (c) 2022 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\Video;

class VimeoVideo extends AbstractVideo implements PreviewImageInterface, NoCookieUrlInterface
{
    protected $vimeo = '';

    protected $autoplay = false;

    protected $addPreviewImage = false;

    protected $posterSRC;

    /**
     * {@inheritdoc}
     */
    public static function getType(): string
    {
        return 'vimeo';
    }

    /**
     * {@inheritdoc}
     */
    public static function getTemplate(): string
    {
        return '@HeimrichHannotVideo/videoprovider/videoprovider_vimeo.html.twig';
    }

    /**
     * {@inheritdoc}
     */
    public static function getPalette(): string
    {
        return 'vimeo,transcriptedVimeo';
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
    public function getPreviewImage(): ?string
    {
        return $this->posterSRC;
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
    public function getSrc(): string
    {
        return $this->createUrl(false);
    }

    protected function createUrl(bool $noCookie): string
    {
        $url = 'https://player.vimeo.com/video/';
        $url .= $this->vimeo;

        $queryParams = [];

        if ($noCookie) {
            $queryParams['dnt'] = '1';
        }

//        $params = [
//            'ytShowRelated' => 'rel',
//            'ytModestBranding' => 'modestbranding',
//            'ytShowInfo' => 'showinfo',
//        ];
//        foreach ($params as $property => $param) {
//            if ($this->{$property}) {
//                $queryParams[$param] = $this->{$property};
//            }
//        }
//        $queryParams['rel'] = $this->videoShowRelated;
//        $queryParams['modestbranding'] = $this->ytModestBranding;
//        $queryParams['showinfo'] = $this->ytShowInfo;

        if ($this->autoplay) {
            $queryParams['autoplay'] = '1';
        }

        if (!empty($queryParams)) {
            $url .= '?'.http_build_query($queryParams);
        }

        return $url;
    }
}
