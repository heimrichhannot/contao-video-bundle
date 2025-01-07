<?php

/*
 * Copyright (c) 2022 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\Event;

use Contao\PageModel;
use HeimrichHannot\VideoBundle\Video\VideoInterface;
use Symfony\Contracts\EventDispatcher\Event;

class AfterRenderPlayerEvent extends Event
{
    public const NAME = 'huh.video.after_render_player';

    /**
     * AfterRenderPlayerEvent constructor.
     */
    public function __construct(private string $buffer, private VideoInterface $video, private array $context, private $parent, private ?PageModel $rootPage, private array $options)
    {
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

    public function setParent(mixed $parent): void
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
