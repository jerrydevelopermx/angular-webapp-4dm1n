(function(){
    'use strict';
    angular.module('webApp')

    .component('styles', {
        bindings: {
          data: '=',
        },
        templateUrl: 'views/styles.html',
        controller: function($scope, Auth, $state){
          var vm = this;

          vm.$onInit = function(){
            var user = Auth.userValidate();
            if(user.user_id) {
              $scope.$emit("userLogged", { status: true, user_type: user.user_type });
            }
            Auth.validateSuperUserAccess();

            vm.dtConfig = {
              api: 'catalog/styles',
              columns : [
                { key: 'name', title: 'Nombre'},
                { key: 'gender', title: 'Género'},
                { key: 'description', title: 'Descripción'},
                { key: null, title: '', custom: function(data) { return '<a href="#!/estilos/detalle/'+ data.style_id+' "><i class="material-icons md-30">create</i></a>' } },

                //{ key: null, title: '', custom: function(data) { return '<a href ng-click="$ctrl.showModal(\'style\', \'' + data.style_id + '\')"><i class="material-icons md-30">create</i></a>' } },
              ]
            };
          }

          vm.addStyles = function(){
            $state.go('styleAdd')
          }

        }
      })
})();
