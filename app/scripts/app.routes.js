angular
  .module('webApp')
  .config(routes);

/**
 * @function routes
 */
function routes ($stateProvider) {

    $stateProvider

                .state('home', {
                    url: '/',
                    component: 'appMain',
                    publicPage: true
                })
                .state('login', {
                    url: '/login',
                    component: 'appLogin',
                    publicPage: true
                })

                .state('sizesGuide', {
                    url: '/guia-tallas',
                    component: 'sizesGuide',
                    publicPage: true
                })

                .state('images', {
                    url: '/imagenes',
                    component: 'images',
                    publicPage: true
                })
                .state('galleries', {
                    url: '/galerias',
                    component: 'galleries',
                    publicPage: true
                })
                .state('styles', {
                    url: '/estilos',
                    component: 'styles',
                    publicPage: true
                })
                
                .state('products', {
                    url: '/productos',
                    component: 'products',
                    publicPage: true
                })

                .state('pagesContent', {
                    url: '/contenido-paginas/:page',
                    component: 'pagesContent',
                    publicPage: true
                });
}
