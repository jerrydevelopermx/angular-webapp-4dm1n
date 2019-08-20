(function(){
    'use strict';
    angular.module('webApp')

    .component('appLogin', {
        bindings: {
          data: '=',
        },
        templateUrl: 'views/common/login.html',
        controller: componentController
      })


      function componentController($scope, $state, Auth){
        var vm = this;
        vm.error = "";
        vm.$onInit = function(){}


        vm.login = function(){
          var credentials = {
            username : vm.username,
            password : vm.password
          }
          Auth.login(credentials).then(function(success){
            if(success){
              $scope.$emit("userLogged", { status: true });
              $state.go('home');
            }
          }, function(error){
            vm.error = error;
          });

        }

      }
})();
