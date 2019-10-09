(function(){
    'use strict';
    angular.module('webApp')

    .component('sizesGuide', {
        bindings: {
          data: '<',
        },
        templateUrl: 'views/sizesGuide.html',
        controller: function($scope, Auth, $mdDialog, Requester, Notifications){
          var vm = this;

          vm.$onInit = function(){
            if(Auth.validate()) {
              $scope.$emit("userLogged", { status: true });
            }
            vm.dtConfig = {
              api: 'catalog/sizes_product',
              columns : [
                { key: 'product_id', title: 'Producto'},
                { key: 'size', title: 'Talla'},
                { key: 'description', title: 'Descripción'},
                { key: 'waist', title: 'Cintura'},
                { key: 'hip', title: 'Cadera'},
                { key: null, title: '', custom: function(data) { return '<a href ng-click="$ctrl.showModal(\'sizes\', \'' + data.size_id + '\')"><i class="material-icons md-30">create</i></a>' } }

              ]
            };
          };

          vm.showModal = function() {
            $mdDialog.show({
              controller: DialogController,
              controllerAs: '$ctrl',
              templateUrl: 'views/sizes_detail.html',
              parent: angular.element(document.body),
              clickOutsideToClose:true
            })
          };

          function DialogController($scope, $mdDialog, APP) {
            let $ctrl = this;
            $ctrl.size = {};
            $ctrl.title = 'Agregar Talla';
            $ctrl.isEdit = false;

            function init(){
              Requester.get('catalog/products').then(function(products) {
                $ctrl.products = products;
              })
            }
            init();

            $ctrl.hide = function() {
              $mdDialog.hide();
            };

            $ctrl.save = function () {
              Requester.post('catalog/sizes', $ctrl.size).then(function(data) { console.log(data)
                if(data.status == 200){
                  Notifications.message('success', 'Contenido agregado correctamente');
                  $mdDialog.hide();
                }
              },
              function(error){
                Notifications.message('error', error);
              });
            }

          }

        }
    })

})();
