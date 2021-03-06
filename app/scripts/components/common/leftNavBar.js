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


      function componentController($rootScope, $scope, localStorageService, $mdSidenav){
        var vm = this;
        vm.loggedUser = false;
        vm.menuItems = [];
        var pagesList = `<ul>
                            <li><a id="home-link" class="pages-links" href="#!/contenido-paginas/home"><i class="material-icons md-30">home</i><span>Home</span></a></li>
                            <li><a id="nosotros-link" class="pages-links" href="#!/contenido-paginas/nosotros"><i class="material-icons md-30">supervisor_account</i><span>Nosotros</span></a></li>
                            <li><a id="inspirate-link" class="pages-links" href="#!/contenido-paginas/inspirate"><i class="material-icons md-30">wb_incandescent</i><span>Inspírate</span></a></li>
                            <li><a id="mayoreo-link" class="pages-links" href="#!/contenido-paginas/mayoreo"><i class="material-icons md-30">attach_money</i><span>Venta mayoreo</span></a></li>
                        </ul>`;
        vm.content = [
                        { 'value': pagesList,
                          'heading': '<i class="material-icons md-30">library_books</i> Páginas '
                        }
                      ];

        vm.$onInit = function(){

          vm.navBarItems = {
            User: [{
                    name: 'Banners',
                    icon: 'burst_mode',
                    sref: 'galleries'
                  },
                  {
                    name: 'Imágenes',
                    icon: 'image',
                    sref: 'images'
                  },
                  {
                    name: 'Mi Perfil',
                    icon: 'account_circle',
                    sref: 'profile'
                  }],
            SuperUser: [{
                    name: 'Banners',
                    icon: 'burst_mode',
                    sref: 'galleries'
                  },
                  {
                    name: 'Imágenes',
                    icon: 'image',
                    sref: 'images'
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
                  {
                    name: 'Usuarios',
                    icon: 'people',
                    sref: 'users'
                  },
                  {
                    name: 'Mi Perfil',
                    icon: 'account_circle',
                    sref: 'profile'
                  }]
          };
        };

        vm.selectItem = function(item){
          $mdSidenav('left').close()
            .then(function() {
              //return;
            });
        }

        $('#home-link').bind('click', function () {
            console.log("I would also be triggered!");
        });

        $rootScope.$on('userLogged', function(event, params){
          if(params.user_type) {
            vm.menuItems = vm.navBarItems[params.user_type];
          }
          vm.loggedUser = params.status;

        });
      }
})();
