<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
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

    /**
     * @return VideoInterface
     */
    public function getVideo(): VideoInterface
    {
        return $this->video;
    }

    /**
     * @return array
     */
    public function getContext(): array
    {
        return $this->context;
    }

    /**
     * @param array $context
     */
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
     * @return PageModel|null
     */
    public function getRootPage(): ?PageModel
    {
        return $this->rootPage;
    }

    /**
     * @return array
     */
    public function getOptions(): array
    {
        return $this->options;
    }
}