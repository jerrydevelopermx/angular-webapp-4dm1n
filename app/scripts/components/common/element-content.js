(function(){
    'use strict';
    angular.module('webApp')

    .component('elementContent', {
        bindings: {
          data: '='
        },
        templateUrl: 'views/common/element-content.html',
        controller: componentController
      })


      function componentController($scope, APP, $mdDialog){
        var vm = this;
        vm.images_url = '';
        vm.$onInit = function(){
          vm.images_url = APP.images_repo;
        }

        vm.redirectTo = function(url){
          console.log(url)
        }


        vm.showEditor = function(element_id){
          $mdDialog.show({
            locals:{ element_id: element_id },
            controllerAs: '$ctrl',
            controller: ContentDialogCtrl,
            templateUrl: 'views/text_editor.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true
          })
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
              src_id : $ctrl.selectedImage
            };
            Requester.post('content/chunk_elements/' + element_id, element).then(function(data) {
              if(data.status == 200){
                Notifications.message('success', 'Contenido actualizado correctamente');
                $mdDialog.hide();
                $scope.$emit("contentUpdated", {});
              }
            },
            function(error){
              Notifications.message('error', error);
            });
          };
        };

        function ContentDialogCtrl($scope, $mdDialog, APP, Requester, Notifications, element_id) {
          let $ctrl = this;
          $ctrl.title = '';
          $ctrl.content = '';
          $ctrl.tinymceOptions = {
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
          };
          function init(){
            Requester.get('content/chunk_elements/' + element_id).then(function(data) { console.log(data)
              $ctrl.title = data[0].title;
              $ctrl.content = data[0].text;
              $ctrl.element_id = data[0].element_id;
              $ctrl.text_id = data[0].text_id;
            })
          }
          $ctrl.hide = function() {
            $mdDialog.hide();
          };

          $ctrl.saveTitle = function() {
            var element = {
              title : $ctrl.title
            };
            Requester.post('content/chunk_elements/' + $ctrl.element_id, element).then(function(data) {
              if(data.status == 200){
                Notifications.message('success', 'Contenido actualizado correctamente');
                $mdDialog.hide();
                $scope.$emit("contentUpdated", {});
              }
            },
            function(error){
              Notifications.message('error', error);
            });
          };

          $ctrl.saveContent = function() {
            var content = {
              text : $ctrl.content
            };
            Requester.post('content/chunk_text/' + $ctrl.text_id, content).then(function(data) {
              if(data.status == 200){
                Notifications.message('success', 'Contenido actualizado correctamente');
                $mdDialog.hide();
                $scope.$emit("contentUpdated", {});
              }
            },
            function(error){
              Notifications.message('error', error);
            });
          };

          init();
        }

      }

})();
