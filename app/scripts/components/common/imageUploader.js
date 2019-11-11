(function(){
    'use strict';
    angular.module('webApp')

    .component('imageUploader', {
        bindings: {
          data: '<',
        },
        templateUrl: 'views/common/imageUploader.html',
        controller : function($scope, Auth, APP, Upload, Notifications){
          let vm = this;

          vm.$onInit = function() {
            vm.imgTypes = [{id:'/', name:'Secciones'}, {id:'banners/',name:'Banner'}, {id:'catalog/woman/',name:'Catálogo Mujeres'}, {id:'catalog/man/',name:'Catálogo Hombres'}];

            if(Auth.validate()) {
              $scope.$emit("userLogged", { status: true });
            }

          };

          // upload on file select or drop
          vm.upload = function (file) {
              Upload.upload({
                  url: APP.api_url + 'catalog/images',
                  data: {file: file, 'username': 'hola'}
              }).then(function (resp) {
                  console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
              }, function (resp) {
                  console.log('Error status: ' + resp.status);
              }, function (evt) {
                  var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                  console.log('progress: ' + progressPercentage + '% ');
              });
          };
          // for multiple files:
          vm.uploadFiles = function (files) {
            vm.files = files;
          //  var data =
            console.log({...{ data: { file: files }, url:  APP.api_url + 'catalog/images' }})

            Upload.upload({...{ data: { file: files, description: vm.description, location: vm.location }, url:  APP.api_url + 'catalog/images' }})
            .then(function (resp) {
                //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                if(resp.status) {
                  Notifications.message('success', 'Imagen agregada correctamente');
                }
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                vm.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + vm.progressPercentage + '% ');
            })
            /*if (files && files.length) {
              for (var i = 0; i < files.length; i++) {
                //Upload.upload({..., data: {file: files[i]}, ...})...;
              }
              // or send them all together for HTML5 browsers:
              //Upload.upload({..., data: {file: files}, ...})...;
            }*/
          }

        }
      })
})();
