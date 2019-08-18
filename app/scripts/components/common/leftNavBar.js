(function(){
    'use strict';
    angular.module('webApp')

    .component('leftNavBar', {
        bindings: {
          data: '=',
        },
        templateUrl: 'views/common/leftNavBar.html',
        controller: componentController
      })


      function componentController($scope, $mdToast){
        var vm = this;


        vm.$onInit = function(){
          var pagesList = `<ul>
                              <li><a class="pages-links" href="#!/contenido-paginas/home"><i class="material-icons md-30">home</i><span>Home</span></a></li>
                              <li><a class="pages-links" href="#!/contenido-paginas/nosotros"><i class="material-icons md-30">supervisor_account</i><span>Nosotros</span></a></li>
                              <li><a class="pages-links" href="#!/contenido-paginas/inspirate"><i class="material-icons md-30">wb_incandescent</i><span>Inspírate</span></a></li>
                          </ul>`;
          vm.content = [
        	{ 'value': pagesList,
            'heading': '<i class="material-icons md-30">library_books</i> Páginas '
          }
        ];

          vm.menuItems = [
            {
              name: 'Imágenes',
              icon: 'image',
              sref: 'images'
            },
            {
              name: 'Galerías',
              icon: 'burst_mode',
              sref: 'galleries'
            },
            {
              name: 'Estilos',
              icon: 'palette',
              sref: 'styles'
            },
            {
              name: 'Productos',
              icon: 'view_list',
              sref: 'products'
            },
            {
              name: 'Guia de tallas',
              icon: 'accessibility',
              sref: 'sizesGuide'
            },
          ];
        };

        vm.selectItem = function(item){
          showSimpleToast(item);
        }
        function showSimpleToast(title) {
          $mdToast.show(
            $mdToast.simple()
              .content(title)
              .hideDelay(2000)
              .position('bottom right')
          );
        }


      }
})();
