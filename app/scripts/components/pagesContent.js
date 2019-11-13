(function(){
    'use strict';
    angular.module('webApp')

    .component('pagesContent', {
        bindings: {
          data: '=',
        },
        templateUrl: 'views/pagesContent.html',
        controller: function($rootScope, $stateParams, Requester, $scope, Auth, $timeout, $mdSidenav){

          var vm = this;
          vm.page = '';
          vm.content = {};
          vm.$onInit = function(){
            $mdSidenav('left').close()
              .then(function() {});

            var user = Auth.userValidate();
            if(user.user_id) {
              $scope.$emit("userLogged", { status: true, user_type: user.user_type });
            }

            vm.page = $stateParams.page;
            $timeout(function(){
              $('.pages-links').removeClass('active-link');
              $('#'+vm.page+'-link').addClass('active-link');
            },0)

            getData();
          };

          vm.$onDestroy = function(){
            updateLinks();
          }

          function updateLinks(){
            $('.pages-links').removeClass('active-link');
            //$('#'+vm.page+'-link').addClass('active-link');
          }
          function getData(){
            Requester.get('content/chunks_page/' + vm.page, {}).then(function(data){
              vm.content = data;
            }, function(){

            });
          }

          $rootScope.$on('contentUpdated', function(event, params){
            getData();
          });

        }
      })
})();
