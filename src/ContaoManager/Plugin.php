<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */


namespace HeimrichHannot\VideoBundle\ContaoManager;


use Contao\CoreBundle\ContaoCoreBundle;
use Contao\ManagerPlugin\Bundle\BundlePluginInterface;
use Contao\ManagerPlugin\Bundle\Config\BundleConfig;
use Contao\ManagerPlugin\Bundle\Parser\ParserInterface;
use Contao\ManagerPlugin\Config\ConfigPluginInterface;
use Contao\ManagerPlugin\Routing\RoutingPluginInterface;
use HeimrichHannot\EncoreBundle\HeimrichHannotContaoEncoreBundle;
use HeimrichHannot\VideoBundle\HeimrichHannotVideoBundle;
use Symfony\Component\Config\Loader\LoaderInterface;
use Symfony\Component\Config\Loader\LoaderResolverInterface;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Routing\RouteCollection;

class Plugin implements BundlePluginInterface, ConfigPluginInterface, RoutingPluginInterface
{

    /**
     * @inheritDoc
     */
    public function getBundles(ParserInterface $parser)
    {
        $loadAfter = [ContaoCoreBundle::class];
        if (class_exists('HeimrichHannot\EncoreBundle\HeimrichHannotContaoEncoreBundle')) {
            $loadAfter[] = HeimrichHannotContaoEncoreBundle::class;
        }
        return [
            BundleConfig::create(HeimrichHannotVideoBundle::class)->setLoadAfter($loadAfter),
        ];
    }

    /**
     * @inheritDoc
     */
    public function registerContainerConfiguration(LoaderInterface $loader, array $managerConfig)
    {
        $loader->load("@HeimrichHannotVideoBundle/Resources/config/services.yml");
        if (class_exists('HeimrichHannot\EncoreBundle\HeimrichHannotContaoEncoreBundle')) {
            $loader->load("@HeimrichHannotVideoBundle/Resources/config/config_encore.yml");
        }
    }


    /**
     * @inheritDoc
     */
    public function getRouteCollection(LoaderResolverInterface $resolver, KernelInterface $kernel)
    {
        $file = "@HeimrichHannotVideoBundle/Resources/config/routing.yml";
        return $resolver->resolve($file)->load($file);
    }
}