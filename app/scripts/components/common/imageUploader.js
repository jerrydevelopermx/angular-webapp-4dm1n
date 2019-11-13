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
            vm.imgTypes = [{
                            id:'/',
                            name:'Secciones',
                            use: 'Contenido de todas las secciones del sitio.',
                            dimensions: 'Verticales, (560 x 400)px. Horizontales, (400 x 545)px.'
                          },
                          { id:'banners/',
                            name:'Banner',
                            use: 'Banners en todas las secciones del sitio.',
                            dimensions: '(1300 x 438)px'
                          },
                          { id:'catalog/woman/',
                            name:'Catálogo Mujeres',
                            use: 'Catálogo de productos de Mujer.',
                            dimensions: '(330 × 495)px'
                          },
                          { id:'catalog/man/',
                            name:'Catálogo Hombres',
                            use: 'Catálogo de productos de Hombre.',
                            dimensions: '(330 × 495)px'
                          }
                        ];

            if(Auth.validate()) {
              $scope.$emit("userLogged", { status: true });
            }

          };

          // for multiple files:
          vm.uploadFiles = function (files) {
            vm.files = files;

            Upload.upload({...{ data: { file: files, description: vm.description, location: vm.location.id }, url:  APP.api_url + 'catalog/images' }})
            .then(function (resp) {
                if(resp.status) {
                  Notifications.message('success', 'Imagen agregada correctamente');
                }
            }, function (resp) {
                //console.log('Error status: ' + resp.status);
            }, function (evt) {
                vm.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                //console.log('progress: ' + vm.progressPercentage + '% ');
            })

          }

        }
      })
})();
