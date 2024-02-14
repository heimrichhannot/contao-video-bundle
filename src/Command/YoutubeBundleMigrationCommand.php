<?php

namespace HeimrichHannot\VideoBundle\Command;

use Contao\ContentModel;
use Contao\CoreBundle\Framework\ContaoFramework;
use Doctrine\DBAL\Connection;
use HeimrichHannot\ListBundle\HeimrichHannotContaoListBundle;
use HeimrichHannot\ReaderBundle\HeimrichHannotContaoReaderBundle;
use HeimrichHannot\VideoBundle\ContentElement\VideoElement;
use HeimrichHannot\VideoBundle\Controller\ContentElement\ExtendedVideoElementController;
use HeimrichHannot\VideoBundle\Video\YouTubeVideo;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class YoutubeBundleMigrationCommand extends Command
{
    protected static $defaultName = 'huh:video:migrate-youtube-bundle';
    protected static $defaultDescription = 'Migrate youtube bundle to video bundle';

    private Connection $connection;
    private ParameterBagInterface $parameterBag;
    private ContaoFramework $framework;

    public function __construct(Connection $connection, ParameterBagInterface $parameterBag, ContaoFramework $framework)
    {
        $this->connection = $connection;
        $this->parameterBag = $parameterBag;
        $this->framework = $framework;

        parent::__construct();
    }


    protected function configure()
    {
        $this->setDescription(self::$defaultDescription);
    }


    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->framework->initialize();

        $io = new SymfonyStyle($input, $output);

        $io->title("Migrating youtube bundle to video bundle");

        $result  = $this->connection->executeQuery('SELECT id FROM tl_content WHERE type = "youtube"');
        $contentElements = $result->fetchFirstColumn();
        $io->text("Found <bg=yellow;fg=black> " . count($contentElements) . " </> content elements with type youtube");

        if (class_exists(HeimrichHannotContaoListBundle::class)) {
            $result = $this->connection->executeQuery('SELECT id FROM tl_list_config_element WHERE type = "youtube"');
            $listConfigElements = $result->fetchFirstColumn();
            $io->text("Found <bg=yellow;fg=black> " . count($listConfigElements) . " </> list config elements with type youtube");
        }

        if (class_exists(HeimrichHannotContaoReaderBundle::class)) {
            $result = $this->connection->executeQuery('SELECT id FROM tl_reader_config_element WHERE type = "youtube"');
            $readerConfigElements = $result->fetchFirstColumn();
            $io->text("Found <bg=yellow;fg=black> " . count($readerConfigElements) . " </> reader config elements with type youtube");
        }

        $bundleConfig = $this->parameterBag->get('huh_video');
        if (isset($bundleConfig['enable_news_support']) && true === $bundleConfig['enable_news_support']) {
            $result = $this->connection->executeQuery('SELECT id FROM tl_news WHERE addYouTube = 1');
            $news = $result->fetchFirstColumn();
            $io->text("Found <bg=yellow;fg=black> " . count($news) . " </> news elements with addYouTube = 1");
        }

        $io->confirm("Do you want to continue?");

        $this->migrateContentElements($contentElements, $io);

        return Command::SUCCESS;
    }

    private function migrateContentElements(array $contentElements, SymfonyStyle $io)
    {
        $modelLinkMapping = [
            'huh.youtube.modal.link.default' => 'huh_video.fields.videoLinkText.default',
            'huh.youtube.modal.link.play' => 'huh_video.fields.videoLinkText.play',
            'huh.youtube.modal.link.window' => 'huh_video.fields.videoLinkText.window',
            'huh.youtube.modal.link.article' => 'huh_video.fields.videoLinkText.article',
        ];

        foreach ($contentElements as $contentElement) {
            $contentModel = ContentModel::findByPk($contentElement);
            if (!$contentModel) {
                if ($io->isVerbose()) {
                    $io->text("Content element with id <bg=yellow;fg=black> " . $contentElement . " </> not found");
                }
                continue;
            }

            if ($contentModel->type !== 'youtube') {
                if ($io->isVerbose()) {
                    $io->text("Content element with id <bg=yellow;fg=black> " . $contentElement . " </> is not of type youtube");
                }
                continue;
            }

            $contentModel->type = ExtendedVideoElementController::TYPE;
            $contentModel->videoProvider = YouTubeVideo::getType();
            $contentModel->videoAutoplay = $contentModel->autoplay;
            $contentModel->videoShowRelated = $contentModel->ytShowRelated;
            $contentModel->videoFullsize = $contentModel->youtubeFullsize;

            if (in_array($contentElement->youtubeLinkText, array_keys($modelLinkMapping))) {
                $contentModel->videoLinkText = $modelLinkMapping[$contentElement->youtubeLinkText];
            } else {
                $contentModel->videoLinkText = 'huh.youtube.modal.link.default';
            }

//            $contentModel->save()
        }
    }

}