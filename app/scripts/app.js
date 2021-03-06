'use strict';

/**
 * @ngdoc overview
 * @name webApp
 * @description
 * # STUDIOBLACKJEANS
 *
 * Main module of the application.
 */
angular
  .module('webApp',[
      'ui.router',
      'ngMaterial',
      'ngMessages',
      'nemLogging',
      'ngAccordion',
      'datatables',
      'datatables.fixedcolumns',
      'LocalStorageModule',
      'ngSanitize',
      'ngFileUpload',
      'ui.tinymce'
  ])

  .constant('APP',{
    'api_url' : 'http://edd3e0c9.ngrok.io/web-content-api/index.php/',//'http://studioblackjeans.com/studioblackjeans-api/index.php/',,
    'images_repo' : 'http://localhost:1339/'
  })

  .config(function (localStorageServiceProvider, $mdThemingProvider) {
      localStorageServiceProvider
        .setPrefix('webApp')
        .setStorageType('sessionStorage')
        .setNotify(true, true);

      $mdThemingProvider.theme("success-toast");
      $mdThemingProvider.theme("error-toast");

    })



  /*
  .config(['$httpProvider', ($httpProvider) => {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }

    // Answer edited to include suggestions from comments
    // because previous version of code introduced browser-related errors

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    $httpProvider.interceptors.push( logTimeTaken );
  }]);
  */
