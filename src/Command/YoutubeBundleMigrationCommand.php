<?php

namespace HeimrichHannot\VideoBundle\Command;

use Contao\ContentModel;
use Contao\CoreBundle\Framework\ContaoFramework;
use Doctrine\DBAL\Connection;
use HeimrichHannot\ListBundle\HeimrichHannotContaoListBundle;
use HeimrichHannot\ListBundle\Model\ListConfigElementModel;
use HeimrichHannot\ReaderBundle\HeimrichHannotContaoReaderBundle;
use HeimrichHannot\ReaderBundle\Model\ReaderConfigElementModel;
use HeimrichHannot\VideoBundle\ConfigElementType\VideoConfigElementType;
use HeimrichHannot\VideoBundle\Controller\ContentElement\ExtendedVideoElementController;
use HeimrichHannot\VideoBundle\Video\YouTubeVideo;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
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
    protected bool $dryRun = false;

    public function __construct(Connection $connection, ParameterBagInterface $parameterBag, ContaoFramework $framework)
    {
        $this->connection = $connection;
        $this->parameterBag = $parameterBag;
        $this->framework = $framework;

        parent::__construct();
    }


    protected function configure()
    {
        $this
            ->setDescription(self::$defaultDescription)
            ->addOption('dry-run', null, InputOption::VALUE_NONE, 'Preview migration without changing the database.')
        ;
    }


    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->framework->initialize();

        $io = new SymfonyStyle($input, $output);

        $io->title("Migrating youtube bundle to video bundle");

        if ($input->hasOption('dry-run') && $input->getOption('dry-run')) {
            $this->dryRun = true;
            $io->note('Dry run enabled, no data will be changed.');
            $io->newLine();
        }

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

        if (!$io->confirm("Do you want to continue?")) {
            return Command::SUCCESS;
        }


        if (count($contentElements) > 0) {
            $io->text("Migrating content elements");
            $this->migrateContentElements($contentElements, $io);
        }

        if (isset($listConfigElements)) {
            $io->text("Migrating list config elements");
            $this->migrateConfigTypeElements($listConfigElements, ListConfigElementModel::class, $io);
        }

        if (isset($readerConfigElements)) {
            $io->text("Migrating reader config elements");
            $this->migrateConfigTypeElements($readerConfigElements, ReaderConfigElementModel::class, $io);
        }

        if (isset($news)) {
            $io->text("Migrating news elements");
            $this->migrateNews($news, $io);
        }

        $io->success("Migration finished");

        return Command::SUCCESS;
    }

    protected function updateLinkText(string $linkText): string
    {
        $modelLinkMapping = [
            'huh.youtube.modal.link.default' => 'huh_video.fields.videoLinkText.default',
            'huh.youtube.modal.link.play' => 'huh_video.fields.videoLinkText.play',
            'huh.youtube.modal.link.window' => 'huh_video.fields.videoLinkText.window',
            'huh.youtube.modal.link.article' => 'huh_video.fields.videoLinkText.article',
        ];

        if (in_array($linkText, array_keys($modelLinkMapping))) {
            return $modelLinkMapping[$linkText];
        } else {
            return 'huh.youtube.modal.link.default';
        }
    }

    private function migrateContentElements(array $contentElements, SymfonyStyle $io): void
    {
        $count = 0;

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
            $contentModel->videoAutoplay = $contentModel->autoplay ?? '';
            $contentModel->videoShowRelated = $contentModel->ytShowRelated;
            $contentModel->videoFullsize = $contentModel->youtubeFullsize;
            $contentModel->videoLinkText = $this->updateLinkText($contentModel->youtubeLinkText);

            if (!$this->dryRun) {
                $contentModel->save();
            }
            $count++;
        }

        $io->text("Migrated <bg=yellow;fg=black> " . $count . " </> content elements");
    }

    /**
     * @param array $configTypeIds
     * @param class-string<ListConfigElementModel,ReaderConfigElementModel> $modelClass
     * @param SymfonyStyle $io
     * @return void
     */
    private function migrateConfigTypeElements(array $configTypeIds, string $modelClass, SymfonyStyle $io): void
    {
        $count = 0;

        foreach ($configTypeIds as $configTypeId) {
            $configElementModel = $modelClass::findByPk($configTypeId);
            if (!$configElementModel) {
                if ($io->isVerbose()) {
                    $io->text("Config element with id <bg=yellow;fg=black> " . $configTypeId . " </> not found in table <bg=yellow;fg=black> " . $modelClass::getTable() . " </>");
                }
                continue;
            }

            $configElementModel->type = VideoConfigElementType::getType();
            $configElementModel->imageSelectorField = $configElementModel->youtubeSelectorField;

            if (!$this->dryRun) {
                $configElementModel->save();
            }

            $count++;
        }

        $io->text("Migrated <bg=yellow;fg=black> " . $count . " </> config elements in table <bg=yellow;fg=black> " . $modelClass::getTable() . " </>");
    }

    private function migrateNews(array $news, SymfonyStyle $io)
    {
        foreach ($news as $newsId) {
            $newsModel = NewsModel::findByPk($newsId);
            if (!$newsModel) {
                if ($io->isVerbose()) {
                    $io->text("News element with id <bg=yellow;fg=black> " . $newsId . " </> not found");
                }
                continue;
            }

            if ($newsModel->addYouTube) {
                $newsModel->addVideo = true;
                $newsModel->videoProvider = YouTubeVideo::getType();
                $newsModel->videoAutoplay = $newsModel->autoplay;
                $newsModel->videoFullsize = $newsModel->youtubeFullsize;
                $newsModel->videoLinkText = $this->updateLinkText($newsModel->youtubeLinkText);

                if (!$this->dryRun) {
                    $newsModel->save();
                }
                $count++;
            }
        }

        $io->text("Migrated <bg=yellow;fg=black> " . $count . " </> news elements");
    }
}