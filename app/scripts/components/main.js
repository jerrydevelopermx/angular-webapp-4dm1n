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

      function componentController($scope, $mdToast, Auth){
        var vm = this;

        vm.$onInit = function(){

          if(Auth.validate()) {
            $scope.$emit("userLogged", { status: true });
          }

          vm.menuItems = [
            {
              name: 'Dashboard',
              icon: 'dashboard',
              sref: 'nosotros'
            },
            {
              name: 'Profile',
              icon: 'person',
              sref: 'productos'
            },
            {
              name: 'Table',
              icon: 'view_module',
              sref: 'servicios'
            },
            {
              name: 'Data Table',
              icon: 'view_module',
              sref: 'contacto'
            }
          ];
        };

        vm.selectItem = function(item){
          //showSimpleToast(item);
        }
        function showSimpleToast(title) {
          $mdToast.show(
            $mdToast.simple()
              .content(title)
              .hideDelay(2000)
              .position('bottom right')
          );
        }

      }

})();
