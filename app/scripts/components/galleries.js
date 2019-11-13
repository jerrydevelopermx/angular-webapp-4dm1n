(function(){
    'use strict';
    angular.module('webApp')

    .component('galleries', {
        bindings: {
          data: '=',
        },
        templateUrl: 'views/galleries.html',
        controller: function($scope, Auth){
          var vm = this;

          vm.$onInit = function(){
            var user = Auth.userValidate();
            if(user.user_id) {
              $scope.$emit("userLogged", { status: true, user_type: user.user_type });
            }

            vm.dtConfig = {
              api: 'catalog/galleries',
              columns : [
                { key: 'name', title: 'Nombre'},
                { key: 'description', title: 'Descripción'},
                { key: 'gallery_type', title: 'Tipo'},
                { key: 'page_id', title: 'Página'},
                { key: null, title: '', custom: function(data) { return '<a href="#!/galerias/detalle/'+ data.gallery_id+' "><i class="material-icons md-30">create</i></a>' } },

                //{ key: null, title: '', custom: function(data) { return '<a href ng-click="$ctrl.showModal(\'gallery\', \''  #!/galerias'\')"><i class="material-icons md-30">create</i></a>' } },
              ]
            };
          }

        }

      })
})();
