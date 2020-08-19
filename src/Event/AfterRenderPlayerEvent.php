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

class AfterRenderPlayerEvent extends Event
{
    public const NAME = 'huh.video.after_render_player';

    /**
     * @var string
     */
    private $buffer;
    /**
     * @var VideoInterface
     */
    private $video;
    /**
     * @var array
     */
    private $context;
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
     * AfterRenderPlayerEvent constructor.
     */
    public function __construct(string $buffer, VideoInterface $video, array $context, $parent, ?PageModel $rootPage, array $options)
    {
        $this->buffer = $buffer;
        $this->video = $video;
        $this->context = $context;
        $this->parent = $parent;
        $this->rootPage = $rootPage;
        $this->options = $options;
    }

    public function getBuffer(): string
    {
        return $this->buffer;
    }

    public function setBuffer(string $buffer): void
    {
        $this->buffer = $buffer;
    }

    public function getVideo(): VideoInterface
    {
        return $this->video;
    }

    public function setVideo(VideoInterface $video): void
    {
        $this->video = $video;
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

    /**
     * @param mixed $parent
     */
    public function setParent($parent): void
    {
        $this->parent = $parent;
    }

    public function getRootPage(): ?PageModel
    {
        return $this->rootPage;
    }

    public function setRootPage(?PageModel $rootPage): void
    {
        $this->rootPage = $rootPage;
    }

    public function getOptions(): array
    {
        return $this->options;
    }

    public function setOptions(array $options): void
    {
        $this->options = $options;
    }
}
