<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */


namespace HeimrichHannot\VideoBundle\Generator;


use HeimrichHannot\VideoBundle\Video\AbstractVideo;
use Twig\Environment;

class VideoGenerator
{
    /**
     * @var Environment
     */
    private $twig;


    /**
     * VideoGenerator constructor.
     */
    public function __construct(Environment $twig)
    {
        $this->twig = $twig;
    }

    public function generate(AbstractVideo $video): string
    {
        $context = [];
        $context = $video->getData();
        $context['videoplayer'] = $this->twig->render($video->getTemplate(), $context);
        return $this->twig->render('@HeimrichHannotVideo/wrapper/videowrapper_default.html.twig', $context);
    }
}