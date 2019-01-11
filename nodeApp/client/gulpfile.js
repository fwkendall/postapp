/* jshint node:true*/
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy:true});
var webpack = require("webpack");
var gutil = require("gulp-util");
var webpackConfig = require("./webpack.config.js");
var del = require('del');
var config = require('./app.config');

// Gulp Tasks




// Clean build target ./www dir
var clean = function () {
    return del([
        './www'
    ]);
};

// Copying all lib css to vendor css into lib dir
var vendorStyle = function () {
    return gulp.src(config.vendorCSSPath)
        .pipe($.autoprefixer({ browsers: ['last 4 versions', '> 5%']}))
        .pipe($.concat('vendor.css'))
        .pipe(gulp.dest(config.cssPath));
};

// Copy all lib font to www/lib
var vendorFont = function () {
    return gulp.src(config.vendorFontPath)
        .pipe(gulp.dest(config.fontPath));
};

// Copy all style to www/lib
var style = function () {
    return gulp.src(config.sourceCSS)
        .pipe($.autoprefixer({ browsers: ['last 4 versions', '> 5%']}))
        .pipe($.concat('app.css'))
        .pipe(gulp.dest(config.cssPath));
};

// Webpack for js files
var webpackTask = function (callback) {
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
};

// Copy favicon
var faviconCopy = function () {
    return gulp.src(config.faviconSource)
        .pipe(gulp.dest('./www/'));
};

// Copy asset
var assetCopy = function () {
    return gulp.src('./resources/assets/**')
        .pipe(gulp.dest('./www/assets/'));
};
gulp.task('clean', clean);
gulp.task('vendor-style',['clean'], vendorStyle);
gulp.task('vendor-font',['clean'], vendorFont);
gulp.task('style',['clean'], style);
gulp.task('webpack',['clean'], webpackTask);
gulp.task("favicon-copy",['clean'], faviconCopy);
gulp.task('asset-copy',['clean'], assetCopy);


var taskList = [ 'vendor-style', 'vendor-font' ,  'style', 'webpack', 'favicon-copy', 'asset-copy'];



gulp.task('default', taskList);
