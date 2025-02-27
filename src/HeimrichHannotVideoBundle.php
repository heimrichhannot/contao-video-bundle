<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle;

use HeimrichHannot\VideoBundle\DependencyInjection\HeimrichHannotVideoExtension;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class HeimrichHannotVideoBundle extends Bundle
{
    public function getContainerExtension(): HeimrichHannotVideoExtension
    {
        return new HeimrichHannotVideoExtension();
    }
}
