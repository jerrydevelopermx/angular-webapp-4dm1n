(function(){
    'use strict';
    angular.module('webApp')

    .component('sizesGuide', {
        bindings: {
          data: '<',
        },
        templateUrl: 'views/sizesGuide.html',
        controller: function(){
          var vm = this;

          vm.$onInit = function(){

            vm.dtConfig = {
              api: 'catalog/sizes',
              columns : [
                { key: 'product_id', title: 'Producto'},
                { key: 'size', title: 'Talla'},
                { key: 'description', title: 'Descripción'},
                { key: 'waist', title: 'Cintura'},
                { key: 'hip', title: 'Cadera'},
                { key: null, title: '', custom: function(data) { return '<a href ng-click="$ctrl.showModal(\'sizes\', \'' + data.size_id + '\')"><i class="material-icons md-30">create</i></a>' } }

              ]
            };
          }

        }
    })

})();
