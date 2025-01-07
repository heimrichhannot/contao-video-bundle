<?php

/*
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @license LGPL-3.0-or-later
 */

namespace HeimrichHannot\VideoBundle\Controller;

use Contao\Model;
use HeimrichHannot\UtilsBundle\Util\Utils;
use HeimrichHannot\VideoBundle\Collection\VideoProviderCollection;
use HeimrichHannot\VideoBundle\Generator\VideoGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class FrontendController.
 *
 * @Route("/huh_video", name="huh_video_", defaults={"_scope"="frontend", "_token_check"=false })
 */
class FrontendController extends AbstractController
{
    /**
     * @var VideoGenerator
     */
    private $videoGenerator;
    /**
     * @var VideoProviderCollection
     */
    private $videoProviderCollection;

    /**
     * FrontendController constructor.
     */
    public function __construct(VideoGenerator $videoGenerator, VideoProviderCollection $videoProviderCollection, private readonly Utils $utils)
    {
        $this->videoGenerator = $videoGenerator;
        $this->videoProviderCollection = $videoProviderCollection;
    }

    /**
     * @Route("/videobyentity/{entity}/{id}", name="video-by-entity", requirements={"id"="\d+"})
     *
     * @param string $entity Table name without tl_ prefix
     * @param int    $id
     *
     * @return Response
     */
    public function showVideoByEntityAction($entity, $id)
    {
        /** @var Model|null $entity */
        $entity = $this->utils->model()->findModelInstanceByPk('tl_'.$entity, $id);

        if (!$entity) {
            return new Response('No entity with video found', 404);
        }

        try {
            $videoClass = $this->videoProviderCollection->getClassByVideoProvider($entity->videoProvider);

            return new Response($this->videoGenerator->generate(new $videoClass($entity->row()), ['ignoreFullsize' => true]));
        } catch (\Exception $e) {
            return new Response('No video found for given entity', 404);
        }
    }
}
