(function(){
    'use strict';
    angular.module('webApp')

    .component('styleDetail', {
        bindings: {
          data: '<',
        },
        templateUrl: 'views/style_detail.html',
        controller: function($compile, $scope, $rootScope, $mdDialog, Auth, Requester, APP, $stateParams,Notifications){
          let vm = this;
          vm.style = {};

          vm.$onInit = function() {
            if(Auth.validate()) {
              $scope.$emit("userLogged", { status: true });
            }
            vm.style_id = $stateParams.id;
            vm.images_url = APP.images_repo;
            Requester.get('catalog/styles/' + vm.style_id).then(function(data) { console.log(data)
              vm.id = data[0].style_id;
              vm.style.gender = data[0].gender;
              vm.style.name = data[0].name;
              vm.style.src = data[0].src;
              vm.style.description = data[0].description;
            })


          }


          vm.update = function () {
            Requester.put('content/styles/' + vm.style_id, vm.style).then(function(data) {
              if(data.status == 200){
                Notifications.message('success', 'Contenido actualizado correctamente');
              }
            },
            function(error){
              Notifications.message('error', error);
            });
          }

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
        }
      })


})();
