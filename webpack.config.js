var Encore = require('@symfony/webpack-encore');

Encore
.setOutputPath('public/assets/')
.addEntry('contao-video-bundle', './assets/js/contao-video-bundle.js')
.addEntry('contao-video-bundle-be', './assets/js/contao-video-bundle-be.js')
.addEntry('contao-video-bundle-theme', './assets/js/contao-video-bundle-theme.js')
.setPublicPath('/bundles/heimrichhannotvideo/assets')
.setManifestKeyPrefix('bundles/heimrichhannotvideo/assets')
.disableSingleRuntimeChunk()
.splitEntryChunks()
.configureSplitChunks(function(splitChunks) {
    splitChunks.name =  function (module, chunks, cacheGroupKey) {
        const moduleFileName = module.identifier().split('/').reduceRight(item => item).split('.').slice(0, -1).join('.');
        return `${moduleFileName}`;
    };
})
.enableSassLoader()
.enablePostCssLoader()
.enableSourceMaps(!Encore.isProduction())
;

module.exports = Encore.getWebpackConfig();