<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\EventListener;

use HeimrichHannot\VideoBundle\Event\BeforeRenderPlayerEvent;

class BeforeRenderPlayerEventListener
{
    public function __invoke(BeforeRenderPlayerEvent $event)
    {
        $context = $event->getContext();

        $event->setContext($context);
    }
}
