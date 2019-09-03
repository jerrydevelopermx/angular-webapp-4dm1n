(function(){
    'use strict';
    angular.module('webApp')

    .component('galleryDetail', {
        bindings: {
          data: '<',
        },
        templateUrl: 'views/gallery_detail.html',
        controller: function($compile, $scope, $rootScope, $mdDialog, Auth, Requester, APP, $stateParams,Notifications){
          let vm = this;
          vm.gallery = {};

          vm.$onInit = function() {
            if(Auth.validate()) {
              $scope.$emit("userLogged", { status: true });
            }
            vm.gallery_id = $stateParams.id;
            vm.images_url = APP.images_repo;
            getData();
          }

          function getData(){
            Requester.get('catalog/galleries/' + vm.gallery_id).then(function(data) { console.log(data)
              vm.id = data[0].gallery_id;
              vm.gallery.name = data[0].name;
              vm.gallery.description = data[0].description;
              vm.type = data[0].gallery_type;
              vm.page = data[0].parent_id;
              vm.data = data;
            })
          }

          vm.update = function () {
            Requester.put('catalog/galleries/' + vm.gallery_id, vm.gallery).then(function(data) {
              if(data.status == 200){
                Notifications.message('success', 'Contenido actualizado correctamente');
              }
            },
            function(error){
              Notifications.message('error', error);
            });
          };

          vm.updateText = function(index) {
            var text = {
              image_id: vm.data[index].image_id,
              description: vm.data[index].text
            }
            Requester.put('catalog/galleries_images/' + vm.data[index].gallery_id, text).then(function(data) { console.log(data)
              if(data.status == 200){
                Notifications.message('success', 'Contenido actualizado correctamente');
              }
            },
            function(error){
              Notifications.message('error', error);
            });
          };

          vm.updateOrder = function(index, direction) {
            var index2 = (direction == 'up') ? index-1 : index+1;
            var img1 = {
              image_id: vm.data[index].image_id,
              order_index: vm.data[index2].order_index
            }
            var img2 = {
              image_id: vm.data[index2].image_id,
              order_index: vm.data[index].order_index
            }
            Requester.put('catalog/galleries_images/' + vm.data[index].gallery_id, img1).then(function(data) {
              if(data.status == 200){
                Requester.put('catalog/galleries_images/' + vm.data[index2].gallery_id, img2).then(function(data) {
                  if(data.status == 200){
                    Notifications.message('success', 'Contenido actualizado correctamente');
                    getData();
                  }
                },
                function(error){
                  Notifications.message('error', error);
                });
              }
            },
            function(error){
              Notifications.message('error', error);
            });

          };

          vm.imageSelector = function(gallery_id, image_id){
            $mdDialog.show({
              locals:{ gallery_id: gallery_id, image_id: image_id  },
              controllerAs: '$ctrl',
              controller: ImgDialogCtrl,
              templateUrl: 'views/image_selector.html',
              parent: angular.element(document.body),
              clickOutsideToClose:true
            })
          }

          function ImgDialogCtrl($scope, $mdDialog, APP, Requester, gallery_id, image_id, Notifications) {
            let $ctrl = this;
            $ctrl.selectedImage = '';
            function init(){
              $ctrl.images_repo = APP.images_repo;
              Requester.get('catalog/images').then(function(data) {
                console.log(data)
                $ctrl.data = data;
              })
            }
            init();

            $ctrl.hide = function() {
              $mdDialog.hide();
            };



            $ctrl.changeImage = function() {
              var element = {
                image_id: image_id,
                new_image_id : $ctrl.selectedImage
              };
              Requester.put('catalog/galleries_images/' + gallery_id, element).then(function(data) {
                if(data.status == 200){
                  Notifications.message('success', 'Contenido actualizado correctamente');
                  $mdDialog.hide();
                  getData();
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
