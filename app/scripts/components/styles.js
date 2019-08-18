(function(){
    'use strict';
    angular.module('webApp')

    .component('styles', {
        bindings: {
          data: '=',
        },
        templateUrl: 'views/styles.html',
        controller: function(){
          var vm = this;

          vm.$onInit = function(){

            vm.dtConfig = {
              api: 'catalog/styles',
              columns : [
                { key: 'name', title: 'Nombre'},
                { key: 'gender', title: 'Género'},
                { key: 'description', title: 'Descripción'},
                { key: null, title: '', custom: function(data) { return '<a href ng-click="$ctrl.showModal(\'style\', \'' + data.style_id + '\')"><i class="material-icons md-30">create</i></a>' } },
              ]
            };
          }

        }
      })
})();
