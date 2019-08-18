(function(){
    'use strict';
    angular.module('webApp')

    .component('appNColsRows', {
        bindings: {
          data: '=',
        },
        templateUrl: 'views/common/content-n-cols-rows.html',
        controller: componentController
      });

      function componentController($scope){
        var vm = this;

        vm.$onInit = function(){
        //  console.log(vm.data)
        }
      }

})();
