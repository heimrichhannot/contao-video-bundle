<?php

namespace HeimrichHannot\VideoBundle\EventListener\Dca;

use Contao\DataContainer;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class OnMediaQueryOptionCallbackListener
{
    private ParameterBagInterface $parameterBag;

    public function __construct(
        ParameterBagInterface $parameterBag
    )
    {
        $this->parameterBag = $parameterBag;
    }

    public function onMediaQueryOptionsCallback(?DataContainer $dc): array
    {
        $config = $this->parameterBag->get('huh_video');
        $queries = [];

        if (\is_array($config['media_queries'])) {
            foreach ($config['media_queries'] as $key => $query) {
                if (!empty($query['name'])) {
                    $queries[$key] = $query['name'].' ['.$query['query'].']';
                } else {
                    $queries[$key] = $query['query'];
                }
            }
        }

        return $queries;
    }
}