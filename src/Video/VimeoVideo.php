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


class VimeoVideo extends AbstractVideo implements PreviewImageInterface, NoCookieUrlInterface
{

    protected $vimeo = '';

    protected $autoplay = false;

    protected $addPreviewImage = false;

    protected $posterSRC;

    /**
     * @inheritDoc
     */
    public static function getType(): string
    {
        return 'vimeo';
    }

    /**
     * @inheritDoc
     */
    public static function getTemplate(): string
    {
        return '@HeimrichHannotVideo/videoprovider/videoprovider_vimeo.html.twig';
    }

    /**
     * @inheritDoc
     */
    public static function getPalette(): string
    {
        return 'vimeo';
    }

    /**
     * @inheritDoc
     */
    public function hasPreviewImage(): bool
    {
        return $this->addPreviewImage && is_string($this->getPreviewImage());
    }

    /**
     * @inheritDoc
     */
    public function getPreviewImage(): ?string
    {
        return $this->posterSRC;
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
            $queryParams['autoplay'] = 1;
        }
        if (!empty($queryParams)) {
            $url .= '?'.http_build_query($queryParams);
        }
        return $url;
    }

    /**
     * @inheritDoc
     */
    public function getNoCookieSrc(): string
    {
        return  $this->createUrl(true);
    }

    /**
     * @inheritDoc
     */
    public function getSrc(): string
    {
        return $this->createUrl(false);
    }
}