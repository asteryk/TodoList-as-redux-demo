var gulp = require('gulp'),
    // yargs 模块提供 argv 对象，用来读取命令行参数，改写命令
    argv = require('yargs').argv,
    // 执行命令
    exec = require('sync-exec'),
    // 系统信息
    os = require('os'),
    // 文件操作模块
    fs = require('fs'),
    // 路径模块
    path = require('path'),
    // 清理文件
    clean = require('gulp-clean'),
    // SASS/SCSS
    sass = require('gulp-sass'),
    // 让gulp任务，可以相互独立，解除任务间的依赖，增强task复用
    runSequence = require('run-sequence'),
    // gulp-webpack
    gulpWebpack = require('gulp-webpack'),
    // gulp-util
    gutil = require("gulp-util");
// dev server
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
// config path
var config = require('./deploy-config.json');
var webpackConfig = require('./webpack.config.js');
var appConfig = config;
// webapp
var webappDir = path.join('./', appConfig.webapp);
// build dir
var buildDir = path.join('./', appConfig.build);
// path
var cssPath = appConfig.cssPath;
var htmlPath = appConfig.htmlPath;
var scssPath = appConfig.scssPath;
var jsPath = appConfig.jsPath;
var imagesPath = appConfig.imagesPath;

// gulp开始

//清理build和临时目录
gulp.task('clean', function() {

    return gulp.src([buildDir], {
            read: false
        })
        .pipe(clean());
});
// Images
gulp.task('images', function() {
    return gulp.src(path.join(webappDir, imagesPath, '**/*.{jpg,jpeg,gif,png}'))
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest(path.join(buildDir, imagesPath)))
});
// index.html/ico
gulp.task('copy', function() {
    return gulp.src(path.join(webappDir, '*.{html,ico}'))
        .pipe(gulp.dest(buildDir));
});
// sass/scss
gulp.task('sass:compile', function() {
    return gulp.src(path.join(webappDir, scssPath, '**/*.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.join(webappDir, cssPath)));
    // 替换CSS
});
// webpack
gulp.task('webpack-dev', function() {
    var myConfig = Object.create(webpackConfig);
    var compiler = webpack(myConfig);
    new WebpackDevServer(compiler, {
        // server and middleware options
    }).listen(appConfig.port, appConfig.hostname, function(err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        console.log(err);
        // Server listening
        gutil.log("[webpack:dev]", "http://" + appConfig.hostname + ":" + appConfig.port + "/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});
gulp.task('webpack-build', function() {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(myConfig, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
    });
});
//Build
gulp.task('build', function() {
    runSequence(
        'clean',
        'sass:compile',
        'copy',
        'webpack-build'
    );
});
//Server
gulp.task('serve', ['sass:compile', 'webpack-dev']);
gulp.task('default', ['build']);