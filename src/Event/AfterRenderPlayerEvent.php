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

    /**
     * @return string
     */
    public function getBuffer(): string
    {
        return $this->buffer;
    }

    /**
     * @param string $buffer
     */
    public function setBuffer(string $buffer): void
    {
        $this->buffer = $buffer;
    }

    /**
     * @return VideoInterface
     */
    public function getVideo(): VideoInterface
    {
        return $this->video;
    }

    /**
     * @param VideoInterface $video
     */
    public function setVideo(VideoInterface $video): void
    {
        $this->video = $video;
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
     * @param mixed $parent
     */
    public function setParent($parent): void
    {
        $this->parent = $parent;
    }

    /**
     * @return PageModel|null
     */
    public function getRootPage(): ?PageModel
    {
        return $this->rootPage;
    }

    /**
     * @param PageModel|null $rootPage
     */
    public function setRootPage(?PageModel $rootPage): void
    {
        $this->rootPage = $rootPage;
    }

    /**
     * @return array
     */
    public function getOptions(): array
    {
        return $this->options;
    }

    /**
     * @param array $options
     */
    public function setOptions(array $options): void
    {
        $this->options = $options;
    }
}