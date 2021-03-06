(function(){
    'use strict';
    angular.module('webApp')

    .component('userDetail', {
        bindings: {
          data: '<',
        },
        templateUrl: 'views/user_detail.html',
        controller: function($compile, $scope, $rootScope, $mdDialog, Auth, Requester, APP, $stateParams, Notifications, $state){
          let vm = this;
          vm.isEdit = false;
          vm.genders = [];
          var user;

          vm.$onInit = function() {
            user = Auth.userValidate();
            if(user.user_id) {
              $scope.$emit("userLogged", { status: true, user_type: user.user_type });
            }
            Auth.validateSuperUserAccess();

            vm.genders = [
                          {name:'Mujer', id: 'mujer'},
                          {name:'Hombre', id: 'hombre'}
                        ];
            vm.types = [
                          {name:'Super usuario', id: 'SuperUser'},
                          {name:'Usuario', id: 'User'}
                        ];

            vm.title = 'Agregar usuario';
            if($stateParams.id){
              vm.isEdit = true;
              vm.user_id = $stateParams.id;
              vm.title = 'Editar usuario';
              getData();
            } else {
              if($state.current.name === 'profile'){
                vm.isProfile = true;
                vm.user_id = user.user_id;
                vm.title = 'Mi perfil';
                getData()
              }
            }
            vm.images_url = APP.images_repo;

          }


          function getData() {
            Requester.get('catalog/users/' + vm.user_id).then(function(data) {
              vm.user = data[0];
            })
          }

          vm.update = function () {
            vm.user.current_user = user.user_id;
            Requester.put('catalog/users/' + vm.user_id, vm.user).then(function(data) {
              if(data.status == 200){
                Notifications.message('success', 'Usuario actualizado correctamente');
              }
            },
            function(error){
              Notifications.message('error', error);
            });
          };

          vm.add = function () {
            vm.user.current_user = user.user_id;
            Requester.post('catalog/users/', vm.user).then(function(data) {
              if(data.status == 200){
                Notifications.message('success', 'Usuario agregado correctamente');
              }
            },
            function(error){
              Notifications.message('error', error);
            });
          };

          vm.changePassword = function() {
            $mdDialog.show({
              locals:{ user_id: user.user_id },
              controllerAs: '$ctrl',
              controller: DialogController,
              templateUrl: 'views/common/passwordChange.html',
              parent: angular.element(document.body),
              clickOutsideToClose:true
            })
          }

          function DialogController($scope, $mdDialog, APP, user_id) {
            let $ctrl = this;
            $ctrl.passwordsMatch = true;

            $ctrl.hide = function() {
              $mdDialog.hide();
            };

            $ctrl.validatePasswords = function(){
              if($ctrl.password.new && $ctrl.password.newRepeat){
                $ctrl.passwordsMatch = ($ctrl.password.new === $ctrl.password.newRepeat);
              }
            };

            $ctrl.update = function () {
              var user = {
                password: $ctrl.password.new
              }
              Requester.put('catalog/user_credentials/' + user_id, user).then(function(data) {
                if(data.status == 200){
                  Notifications.message('success', 'Contraseña actualizada correctamente');
                  $mdDialog.hide();
                }
              },
              function(error){
                Notifications.message('error', error);
              });
            }

          }


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
