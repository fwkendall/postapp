/*jslint node: true, es6: true,esversion: 6 */

var sourceRoot = "./";

module.exports = {
  cssPath: "./www/lib/style/",
  vendorCSSPath: "../node_modules/bootstrap/dist/css/*.css",
  vendorCSSFileName: "vendor.css",
  fontPath: "./www/lib/fonts/",
  vendorFontPath: "../node_modules/bootstrap/dist/fonts/*",
  sourceCSS: sourceRoot + "/styles/*.css",
  appCSSFileName: "app.css",
  faviconSource: "./resources/favicon/favicon.ico",
  jsEntryPoint: sourceRoot + "/main.ts",
  jsOutputPath: "./www/lib/js",
  mainHtmlTemplate: sourceRoot + "/index.html"
};
