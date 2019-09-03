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
        controller: function($compile, $scope, $rootScope, DTOptionsBuilder, DTColumnBuilder, $mdDialog, Requester){
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
          $rootScope.$on("dtContentUpdated", updateStylesDT);

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
          /*
          UPDATE styles datatable
          */
          function updateStylesDT(){ console.log('rerender')
          console.log(vm.dtInstances['styles'])
            vm.dtInstances['styles']._renderer.rerender();
          }


          vm.$onInit = function(){
            vm.dtInstances[vm.name] = {};
            vm.dtOptions = DTOptionsBuilder.fromFnPromise(Requester.get(vm.config.api))
              .withPaginationType('full_numbers')
              .withLanguage(language)
              /*.withOption('scrollX', true)
              .withOption('scrollCollapse', true)
              .withFixedColumns({
                  leftColumns: 2
              })*/
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
            //  gallery: { template: 'views/gallery_detail.html', callUrl: 'catalog/galleries/', controller: GalleryDialogCtrl },
              style: { template: 'views/style_detail.html', callUrl: 'catalog/styles/', controller: StyleDialogCtrl },
              product: { template: 'views/product_detail.html', callUrl: 'catalog/products/', controller: DialogController },

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

            function init(){
              $scope.images_url = APP.images_repo;
              Requester.get(url).then(function(data) { console.log(data)
                $scope.data = data;
                //$scope.src = APP.images_repo + ((result.data[0].src) ? result.data[0].src : '');
                //console.log($scope.src)
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

            $scope.updateStyle = function () {


            }

          }

          function StyleDialogCtrl($scope, $mdDialog, url, APP, Notifications) {
            let $ctrl = this;
            $ctrl.style = {};
            function init(){
              $ctrl.images_url = APP.images_repo;
              Requester.get(url).then(function(data) { console.log(data)
                $ctrl.id = data[0].style_id;
                $ctrl.style.gender = data[0].gender;
                $ctrl.style.name = data[0].name;
                $ctrl.style.src = data[0].src;
                $ctrl.style.description = data[0].description;
              })
            }
            init();

            $ctrl.hide = function() {
              $mdDialog.hide();
            };

            $ctrl.update = function () {
              Requester.put('content/styles/' + $ctrl.id, $ctrl.style).then(function(data) {
                if(data.status == 200){
                  Notifications.message('success', 'Contenido actualizado correctamente');
                  $mdDialog.hide();
                  //$scope.$emit("dtContentUpdated", {});
                }
              },
              function(error){
                Notifications.message('error', error);
              });
            }
          };

          /*function GalleryDialogCtrl($scope, $mdDialog, url, APP, Notifications) {
            let $ctrl = this;
            $ctrl.gallery = {};
            function init(){
              $ctrl.images_url = APP.images_repo;
              Requester.get(url).then(function(data) {
                $ctrl.id = data[0].gallery_id;
                $ctrl.gallery.name = data[0].name;
                $ctrl.gallery.description = data[0].description;
                $ctrl.type = data[0].gallery_type;
                $ctrl.page = data[0].parent_id;
                $ctrl.data = data;
              })
            }
            init();

            $ctrl.selectImage = function () { console.log("aj")
              $mdDialog.show({
                locals:{ url: 'catalog/images/' },
                controller: ImgDialogCtrl,
                controllerAs: '$ctrl',
                templateUrl: 'views/common/imageViewer.html',
              //  parent: angular.element(document.body),
                //clickOutsideToClose:true
              });
            }

            $ctrl.hide = function() {
              $mdDialog.hide();
            };


          };*/
        }
      })
})();
