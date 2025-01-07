<?php

namespace HeimrichHannot\VideoBundle\DataContainer;

use Contao\CoreBundle\DependencyInjection\Attribute\AsCallback;
use Contao\CoreBundle\Twig\Finder\FinderFactory;
use Contao\DataContainer;

class PageContainer
{

    public function __construct(private FinderFactory $finderFactory)
    {
    }

    #[AsCallback(table: 'tl_page', target: 'fields.videofullsizeTemplate.options')]
    public function onFieldsVideofullsizeTemplateOptionsCallback(?DataContainer $dc = null): array
    {
        $finder = $this->finderFactory->create();

        $finder
            ->identifier('huh_video/fullsize')
            ->extension('html.twig')
            ->withVariants();

        return  $finder->asTemplateOptions();
    }

    #[AsCallback(table: 'tl_page', target: 'fields.videoprivacyTemplate.options')]
    public function onFieldsVideoprivacyTemplateOptionsCallback(?DataContainer $dc = null): array
    {
        $finder = $this->finderFactory->create();

        $finder
            ->identifier('huh_video/privacy')
            ->extension('html.twig')
            ->withVariants();

        return  $finder->asTemplateOptions();
    }
}