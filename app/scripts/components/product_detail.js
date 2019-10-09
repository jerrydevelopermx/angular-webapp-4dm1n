(function(){
    'use strict';
    angular.module('webApp')

    .component('productDetail', {
        bindings: {
          data: '<',
        },
        templateUrl: 'views/product_detail.html',
        controller: function($compile, $scope, $rootScope, $mdDialog, Auth, Requester, APP, $stateParams,Notifications, $state){
          let vm = this;
          vm.product = {};
          vm.styles = [];
          vm.genders = [{id:'mujer', name:'Mujer'}, {id:'hombre',name:'Hombre'}];
          var gender = '';

          vm.$onInit = function() {
            if(Auth.validate()) {
              $scope.$emit("userLogged", { status: true });
            }
            if($stateParams.id){
              vm.isEdit = true;
              vm.product_id = $stateParams.id;
              vm.title = 'Detalle producto';
              getProduct();
            } else {
              getStylesByGender();
              vm.title = 'Agregar producto';
            }
            vm.images_url = APP.images_repo;


          }

          function getProduct() {
            Requester.get('catalog/products/' + vm.product_id).then(function(data) { console.log(data)
              vm.product = data[0];
              vm.product.published = (data[0].published == '1');
              gender = data[0].gender;
              getStylesByGender();
              vm.images = processImagesArray(data[0].images);
            })
          };

          function getStylesByGender(){
            var gen = (gender !== '') ? gender : $stateParams.gender;
            Requester.get('catalog/styles_gender/' + gen).then(function(data) {
              vm.styles = data;
              if(gender === ''){
                vm.product.style_id = $stateParams.style;
                vm.product.gender = $stateParams.gender;
              }
            })
          }

          function processImagesArray(images){
            return(images.split(',').map(function(image){
              var img = image.split('|');
              return { src: img[0], id: img[1] }
            }));
          }

          vm.changeGender = function(){
            gender = vm.product.gender;
            getStylesByGender();
          }

          vm.update = function () {
            var updateObj = {
              code: vm.product.code,
              description: vm.product.description,
              color: vm.product.color,
              price: vm.product.price,
              published: vm.product.published
            }
            Requester.put('catalog/products/' + vm.product_id, updateObj).then(function(data) {
              if(data.status == 200){
                Notifications.message('success', 'Producto actualizado correctamente');
              }
            },
            function(error){
              Notifications.message('error', error);
            });
          };

          vm.save = function () {
            Requester.post('catalog/products/', vm.product).then(function(data) {
              if(data.status == 200){
                Notifications.message('success', 'Producto agregado correctamente');
                $state.go('productDetail',{id: data.data});
              }
            },
            function(error){
              Notifications.message('error', error);
            });
          };

          vm.imageSelector = function(element_id, product_image_id){
            $mdDialog.show({
              locals:{ element_id: element_id, product_image_id: product_image_id },
              controllerAs: '$ctrl',
              controller: ImgDialogCtrl,
              templateUrl: 'views/image_selector.html',
              parent: angular.element(document.body),
              clickOutsideToClose:true
            })
          }

          function ImgDialogCtrl($scope, $mdDialog, APP, Requester, element_id, product_image_id, Notifications) {
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
                image_id : $ctrl.selectedImage
              };
              Requester.put('catalog/products_image/' + product_image_id, element).then(function(data) {
                if(data.status == 200){
                  Notifications.message('success', 'Contenido actualizado correctamente');
                  $mdDialog.hide();
                  getProduct()
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
