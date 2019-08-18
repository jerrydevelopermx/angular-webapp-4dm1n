(function(){
    'use strict';
    angular.module('webApp')

    .component('elementContent', {
        bindings: {
          data: '='
        },
        templateUrl: 'views/common/element-content.html',
        controller: componentController
      })


      function componentController($scope){
        var vm = this;

        vm.$onInit = function(){
          //console.log(this.data)
        }

        vm.redirectTo = function(url){
          console.log(url)
        }

      }

})();
