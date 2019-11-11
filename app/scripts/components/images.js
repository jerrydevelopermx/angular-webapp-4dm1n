(function(){
    'use strict';
    angular.module('webApp')

    .component('images', {
        bindings: {
          data: '='
        },
        templateUrl: 'views/images.html',
        controller: function($mdDialog, $scope, Auth, $state){
          var vm = this;

          vm.$onInit = function(){
            if(Auth.validate()) {
              $scope.$emit("userLogged", { status: true });
            }

            vm.dtConfig = {
              api: 'catalog/images',
              columns : [
                { key: 'src', title: 'Archivo'},
                { key: 'description', title: 'Descripción'},
                { key: 'height', title: 'Alto'},
                { key: 'width', title: 'Ancho'},
                { key: null, title: '', custom: function(data) { return '<a href ng-click="$ctrl.showModal(\'image\', \'' + data.image_id + '\')"><i class="material-icons md-30">visibility</i></a>' } },

              ]
            };
          };

          vm.showImage = function(ev) {
              $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/common/imageViewer.html',
                parent: angular.element(document.body),
                //targetEvent: ev,
                clickOutsideToClose:true
              })
              /*.then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
              }, function() {
                $scope.status = 'You cancelled the dialog.';
              });*/
            };

            function DialogController($scope, $mdDialog) {
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

            vm.addImage = function() {
              $state.go('imageUploader');
            }

        }
      })
})();
