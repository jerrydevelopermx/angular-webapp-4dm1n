(function(){
    'use strict';
    angular.module('webApp')

    .component('pagesContent', {
        bindings: {
          data: '=',
        },
        templateUrl: 'views/pagesContent.html',
        controller: function($stateParams, Requester, $scope, Auth){

          var vm = this;
          vm.page = '';
          vm.content = {};
          vm.$onInit = function(){
            if(Auth.validate()) {
              $scope.$emit("userLogged", { status: true });
            }
            console.log($stateParams)
            vm.page = $stateParams.page;


            getData();


          };

          function getData(){
            Requester.get('content/chunks/' + vm.page, {}).then(function(data){
              vm.content = data;
            }, function(){

            });
          }
        }
      })
})();
