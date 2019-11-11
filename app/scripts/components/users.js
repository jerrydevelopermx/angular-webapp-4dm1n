(function(){
    'use strict';
    angular.module('webApp')

    .component('users', {
        bindings: {
          data: '=',
        },
        templateUrl: 'views/users.html',
        controller: function(APP, Requester, $scope, Auth, $state){
          var vm = this;

          vm.$onInit = function(){

            if(Auth.validate()) {
              $scope.$emit("userLogged", { status: true });
            }
            Auth.validateSuperUserAccess();

            vm.dtConfig = {
              api: 'catalog/users',
              columns : [
                { key: 'name', title: 'Nombre'},
                { key: 'last_name', title: 'Apellidos'},
                { key: 'email', title: 'E-mail'},
                { key: 'user_type', title: 'Tipo'},
                { key: null, title: '', custom: function(data) { return '<a href="#!/usuarios/detalle/'+ data.user_id+' "><i class="material-icons md-30">create</i></a>' } },
              ]
            };
            vm.addUser = function(){
              $state.go('userAdd')
            }
          }
        }

      })


})();
