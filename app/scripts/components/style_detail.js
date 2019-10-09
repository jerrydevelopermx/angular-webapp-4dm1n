(function(){
    'use strict';
    angular.module('webApp')

    .component('styleDetail', {
        bindings: {
          data: '<',
        },
        templateUrl: 'views/style_detail.html',
        controller: function($compile, $scope, $rootScope, $mdDialog, Auth, Requester, APP, $stateParams, Notifications, $state){
          let vm = this;
          vm.style = {};
          vm.isEdit = false;
          vm.genders = [];
          vm.$onInit = function() {
            if(Auth.validate()) {
              $scope.$emit("userLogged", { status: true });
            }
            vm.genders = [
                          {name:'Mujer', id: 'mujer'},
                          {name:'Hombre', id: 'hombre'}
                        ];

            vm.title = 'Agregar estilo';
            if($stateParams.id){
              vm.isEdit = true;
              vm.style_id = $stateParams.id;
              getData();
            }
            vm.images_url = APP.images_repo;

          }

          function getData() {
            vm.title = 'Detalle estilo';
            Requester.get('catalog/styles/' + vm.style_id).then(function(data) {
              vm.id = data[0].style_id;
              vm.style.gender = data[0].gender;
              vm.style.name = data[0].name;
              vm.style.src = data[0].src;
              vm.style.published = (data[0].published == '1');
              vm.style.description = data[0].description;
            })
          }


          vm.update = function () {
            vm.style.published = (vm.style.published == false) ? 0 : vm.style.published;
            Requester.put('content/styles/' + vm.style_id, vm.style).then(function(data) {
              if(data.status == 200){
                Notifications.message('success', 'Contenido actualizado correctamente');
              }
            },
            function(error){
              Notifications.message('error', error);
            });
          };

          vm.add = function () {
            Requester.post('catalog/styles/', vm.style).then(function(data) {
              if(data.status == 200){
                Notifications.message('success', 'Estilo agregado correctamente');
                $state.go('styleDetail',{id: data.data});
              }
            },
            function(error){
              Notifications.message('error', error);
            });
          };


          vm.imageSelector = function(element_id){
            $mdDialog.show({
              locals:{ element_id: element_id },
              controllerAs: '$ctrl',
              controller: ImgDialogCtrl,
              templateUrl: 'views/image_selector.html',
              parent: angular.element(document.body),
              clickOutsideToClose:true
            })
          }

          function ImgDialogCtrl($scope, $mdDialog, APP, Requester, element_id, Notifications) {
            let $ctrl = this;
            $ctrl.selectedImage = '';
            function init(){
              $ctrl.images_repo = APP.images_repo;
              $ctrl.selectedImage = '';
              $ctrl.dtConfig = {
                api: 'catalog/images',
                columns : [
                  { key: 'src', title: 'Archivo'},
                  { key: 'description', title: 'Descripción'},
                  { key: null, title: 'Vista previa', custom: function(data) { return '<img src="' + $ctrl.images_repo + data.src +'" width="200"/>' } },
                  { key: null, title: 'Seleccionar', custom: function(data) { return '<input type="radio" value="'+ data.image_id +'" ng-model="$ctrl.selectedImage" ng-change="$ctrl.config.expression(\'' + data.image_id+'\')"/>' } },
                ],
                expression: function(value){
                  $ctrl.selectedImage = value;
                },
                pageLength: 5
              };
            }
            init();
            $ctrl.hide = function() {
              $mdDialog.hide();
            };

            $ctrl.changeImage = function() {
              var element = {
                cover_image_id : $ctrl.selectedImage
              };

              Requester.put('content/styles/' + element_id, element).then(function(data) {
                if(data.status == 200){
                  Notifications.message('success', 'Contenido actualizado correctamente');
                  $mdDialog.hide();
                  getData()
                }
              },
              function(error){
                Notifications.message('error', error);
              });
            };
          };
        }
      })


})();
