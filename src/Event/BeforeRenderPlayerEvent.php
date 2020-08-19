<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\Event;

use Contao\PageModel;
use HeimrichHannot\VideoBundle\Video\VideoInterface;
use Symfony\Component\EventDispatcher\Event;

class BeforeRenderPlayerEvent extends Event
{
    public const NAME = 'huh.video.before_render_player';
    /**
     * @var VideoInterface
     */
    private $video;
    /**
     * @var array
     */
    private $context;
    /**
     * @var mixed
     */
    private $parent;
    /**
     * @var PageModel|null
     */
    private $rootPage;
    /**
     * @var array
     */
    private $options;

    /**
     * BeforeRenderPlayerEvent constructor.
     */
    public function __construct(VideoInterface $video, array $context, $parent, ?PageModel $rootPage, array $options)
    {
        $this->video = $video;
        $this->context = $context;
        $this->parent = $parent;
        $this->rootPage = $rootPage;
        $this->options = $options;
    }

    public function getVideo(): VideoInterface
    {
        return $this->video;
    }

    public function getContext(): array
    {
        return $this->context;
    }

    public function setContext(array $context): void
    {
        $this->context = $context;
    }

    /**
     * @return mixed
     */
    public function getParent()
    {
        return $this->parent;
    }

    public function getRootPage(): ?PageModel
    {
        return $this->rootPage;
    }

    public function getOptions(): array
    {
        return $this->options;
    }
}
