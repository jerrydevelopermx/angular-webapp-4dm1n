(function(){
    'use strict';
    angular.module('webApp')

    .component('products', {
        bindings: {
          data: '=',
        },
        templateUrl: 'views/products.html',
        controller: function(APP, Requester, $scope, Auth, $state){
          var vm = this;
          vm.womanStyles = [];
          vm.manStyles = [];
          vm.selectedWomanStyle = 'SK-WMN';
          vm.selectedManStyle  = 'SK-MN';

          vm.dtConfig = {
            api: 'catalog/products_style/' + vm.selectedWomanStyle,
            columns : [
              { key: 'code', title: 'Producto'},
              { key: 'description', title: 'Descripción'},
              { key: 'color', title: 'Color'},
              { key: 'price', title: 'Precio'},
              { key: 'sizes', title: 'Tallas'},
              { key: null, title: '', custom: function(data) { return '<a href="#!/productos/detalle/'+ data.product_id+' "><i class="material-icons md-30">create</i></a>' } },
            ]
          };

          vm.dtConfig2 = {
            api: 'catalog/products_style/' + vm.selectedManStyle,
            columns : [
              { key: 'code', title: 'Producto'},
              { key: 'description', title: 'Descripción'},
              { key: 'color', title: 'Color'},
              { key: 'price', title: 'Precio'},
              { key: 'sizes', title: 'Tallas'},
              { key: null, title: '', custom: function(data) { return '<a href="#!/productos/detalle/'+ data.product_id+' "><i class="material-icons md-30">create</i></a>' } },

            ]
          };

          vm.$onInit = function(){
            var user = Auth.userValidate();
            if(user.user_id) {
              $scope.$emit("userLogged", { status: true, user_type: user.user_type });
            }
            Auth.validateSuperUserAccess();

            getStyles();
            initializeDatatables();

          }

          vm.changeWomanStyle = function(){
            $scope.$emit("changeWomanStyle", { style: vm.selectedWomanStyle, name:'woman' });
          }

          vm.changeManStyle = function(){
            $scope.$emit("changeManStyle", { style: vm.selectedManStyle, name:'man' });
          }

          vm.addProduct = function(gender){
            $state.go('productAdd',{ gender: gender, style: (gender == 'mujer') ? vm.selectedWomanStyle : vm.selectedManStyle });
          }
          function getStyles(){
            Requester.get('catalog/styles/').then(function(data) {
              formatStyles(data);
            })
          }

          function initializeDatatables(){

          }

          function formatStyles(styles){
            for(var s in styles){
              if(styles[s].gender === 'mujer') {
                vm.womanStyles.push(styles[s]);
              } else {
                vm.manStyles.push(styles[s]);
              }
            }
          }

        }
      })
})();
