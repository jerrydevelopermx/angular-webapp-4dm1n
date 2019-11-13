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
          Auth.login(credentials).then(function(response){
            if(response){
              $scope.$emit("userLogged", { status: true, username: response.user[0].name, user_type: response.user[0].user_type });
              $state.go('home');
            }
          }, function(error){
            vm.error = 'Usuario o contraseña incorrectos. Inténtelo de nuevo.';
          });

        }

      }
})();
