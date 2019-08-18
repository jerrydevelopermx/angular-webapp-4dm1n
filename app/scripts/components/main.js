(function(){
    'use strict';
    angular.module('webApp')

    .component('appMain', {
        bindings: {
          data: '<',
        },
        templateUrl: 'views/main.html',
        controller: componentController
      })

      function componentController($scope){
        var vm = this;
        console.log("MAIN Component controller here!");

        vm.$onInit = function(){
          $scope.$emit('init MAIN component()');
          console.log('init MAIN component()');
        };

        vm.$postLink = function(){
          console.log('MAIN Post link() DOM ready!')
        };

        vm.$onChanges = function($event){
          console.log($event);
        };

        vm.$onDestroy = function(){
          console.log('MAIN component destroy!! :( ')
        };

      }
      
})();
