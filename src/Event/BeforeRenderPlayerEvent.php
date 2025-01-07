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

class BeforeRenderPlayerEvent extends Event
{
    public const NAME = 'huh.video.before_render_player';

    public function __construct(
        private readonly VideoInterface $video,
        private array $context,
        private readonly mixed $parent,
        private readonly ?PageModel $rootPage,
        private readonly array $options,
    ) {
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
