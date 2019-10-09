angular
  .module('webApp')
  .config(routes);

/**
 * @function routes
 */
function routes ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
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

                .state('galleryDetail', {
                    url: '/galerias/detalle/{id}',
                    component: 'galleryDetail',
                    publicPage: true
                })

                .state('styles', {
                    url: '/estilos',
                    component: 'styles',
                    publicPage: true
                })

                .state('styleDetail', {
                    url: '/estilos/detalle/{id}',
                    component: 'styleDetail',
                    publicPage: true
                })

                .state('styleAdd', {
                    url: '/estilos/agregar',
                    component: 'styleDetail',
                    publicPage: true
                })

                .state('products', {
                    url: '/productos',
                    component: 'products',
                    publicPage: true
                })
                .state('productDetail', {
                    url: '/productos/detalle/{id}',
                    component: 'productDetail',
                    publicPage: true
                })

                .state('productAdd', {
                    url: '/productos/agregar/{gender}/{style}',
                    component: 'productDetail',
                    publicPage: true
                })
                .state('pagesContent', {
                    url: '/contenido-paginas/:page',
                    component: 'pagesContent',
                    publicPage: true
                });
}
