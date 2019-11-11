(function(){
    'use strict';
    angular.module('webApp')

    .component('appDatatable', {
        bindings: {
          config: '=',
          instance: '=',
          name: '@'
        },
        templateUrl: 'views/common/appDatatable.html',
        controller: function($compile, $scope, $rootScope, DTOptionsBuilder, DTColumnBuilder, $mdDialog, Requester, Notifications){
          var vm = this;
          var language = {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }

          };
          vm.dtColumns = [];
          vm.dtInstances = {};

          $rootScope.$on('changeWomanStyle', updateWomanDT);
          $rootScope.$on('changeManStyle', updateManDT);

          function updateWomanDT(event, args){
            if(vm.dtInstances[args.name] && typeof(vm.dtInstances[args.name].changeData) === 'function'){
              vm.dtInstances[args.name].changeData(Requester.get('catalog/products_style/' + args.style));
            }
          }

          function updateManDT(event, args){
            if(vm.dtInstances[args.name] && typeof(vm.dtInstances[args.name].changeData) === 'function'){
              vm.dtInstances[args.name].changeData(Requester.get('catalog/products_style/' + args.style));
            }
          }



          vm.$onInit = function(){
            vm.dtInstances[vm.name] = {};
            vm.dtOptions = DTOptionsBuilder.fromFnPromise(Requester.get(vm.config.api))
              .withPaginationType('full_numbers').withDisplayLength((vm.config.pageLength)?vm.config.pageLength:10).withOption('lengthMenu', [[5, 10, 15, 20, 25, 50,-1],[5,10,15,20,25, 50,"All"]])
              .withLanguage(language)
              .withOption('createdRow', function(row) {
                $compile(angular.element(row).contents())($scope);
              });

            for(var index in vm.config.columns){
              if(vm.config.columns[index].custom){
                vm.dtColumns.push(DTColumnBuilder.newColumn(vm.config.columns[index].key).withTitle(vm.config.columns[index].title).renderWith(vm.config.columns[index].custom).notSortable());
              } else {
                vm.dtColumns.push(DTColumnBuilder.newColumn(vm.config.columns[index].key).withTitle(vm.config.columns[index].title));
              }
            }
          };



          vm.showModal = function(type, element_id) {
            var types = {
              image: { template: 'views/common/imageViewer.html', callUrl: 'catalog/images/', controller: ImgDialogCtrl },
              sizes: { template: 'views/sizes_detail.html', callUrl: 'catalog/sizes/', controller: DialogController },


            };
            $mdDialog.show({
              locals:{ url: types[type].callUrl + element_id },
              controller: types[type].controller,
              controllerAs: '$ctrl',
              templateUrl: types[type].template,
              parent: angular.element(document.body),
              clickOutsideToClose:true
            })
          };

          function ImgDialogCtrl($scope, $mdDialog, url, APP) {
            function init(){
              Requester.get(url).then(function(data) {
                $scope.src = APP.images_repo + data[0].src;
              })
            }
            init();

            $scope.hide = function() {
              $mdDialog.hide();
            };

            $scope.cancel = function() {
              $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
              $mdDialog.hide(answer);
            };
          }

          function DialogController($scope, $mdDialog, url, APP) {
            let $ctrl = this;
            $ctrl.title = 'Detalle Talla';
            $ctrl.isEdit = true;
            function init(){
              $ctrl.images_url = APP.images_repo;
              Requester.get(url).then(function(data) { console.log(data)
                $ctrl.size = data[0];
              });
              Requester.get('catalog/products').then(function(products) {
                $ctrl.products = products;
              })
            }
            init();

            $ctrl.hide = function() {
              $mdDialog.hide();
            };

            $ctrl.update = function () {
              var sizeObj = {
                size: $ctrl.size.size,
                description: $ctrl.size.description,
                waist: $ctrl.size.waist,
                hip: $ctrl.size.hip
              };
              Requester.put('catalog/sizes/' + $ctrl.size.size_id, sizeObj).then(function(data) { console.log(data)
                if(data.status == 200){
                  Notifications.message('success', 'Contenido actualizado correctamente');
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
