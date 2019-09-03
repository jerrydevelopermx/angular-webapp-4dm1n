(function(){
    'use strict';
    angular.module('webApp')

    .component('appNCols', {
        bindings: {
          data: '=',
        },
        templateUrl: 'views/common/content-n-cols.html',
        controller: componentController
      });

      function componentController($scope, Requester, Notifications){
        var vm = this;

        vm.$onInit = function(){
        //  console.log(vm.data)
        }


        vm.saveGral = function() {
          //console.log(vm.data);
          var chunk = {
            class: vm.data.class,
            title: vm.data.title.text,
            title_class: vm.data.title.class,
            description: vm.data.description.text,
            description_class: vm.data.description.class
          };

          Requester.post('content/chunks/' + vm.data.id, chunk).then(function(data) {
            if(data.status == 200){
              Notifications.message('success', 'Contenido actualizado correctamente');
            }
          },
          function(error){
            Notifications.message('error', error);
          });
        };


      }

})();
