(function(){
    'use strict';
    angular.module('webApp')

    .component('appGallery', {
        bindings: {
          data: '<',
        },
        templateUrl: 'views/common/gallery.html'
      })
})();
