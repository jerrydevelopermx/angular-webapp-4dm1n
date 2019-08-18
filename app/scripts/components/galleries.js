(function(){
    'use strict';
    angular.module('webApp')

    .component('galleries', {
        bindings: {
          data: '=',
        },
        templateUrl: 'views/galleries.html',
        controller: function(){
          var vm = this;

          vm.$onInit = function(){

            vm.dtConfig = {
              api: 'catalog/galleries',
              columns : [
                { key: 'name', title: 'Nombre'},
                { key: 'description', title: 'Descripción'},
                { key: 'gallery_type', title: 'Tipo'},
                { key: 'page_id', title: 'Página'},
                { key: null, title: '', custom: function(data) { return '<a href ng-click="$ctrl.showModal(\'gallery\', \'' + data.gallery_id + '\')"><i class="material-icons md-30">create</i></a>' } },
              ]
            };
          }

        }

      })
})();
