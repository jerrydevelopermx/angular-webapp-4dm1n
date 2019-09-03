(function(){
    'use strict';
    angular.module('webApp')

    .component('products', {
        bindings: {
          data: '=',
        },
        templateUrl: 'views/products.html',
        controller: function(APP, Requester, $scope, Auth){
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
              //{ key: null, title: '', custom: function(data) { return '<a href ng-click="$ctrl.showModal(\'product\', \'' + data.product_id + '\')"><i class="material-icons md-30">create</i></a>' } }
              { key: null, title: '', custom: function(data) { return '<i class="material-icons md-30">create</i>' } }
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
              //{ key: null, title: '', custom: function(data) { return '<a href ng-click="$ctrl.showModal(\'product\', \'' + data.product_id + '\')"><i class="material-icons md-30">create</i></a>' } }
              { key: null, title: '', custom: function(data) { return '<i class="material-icons md-30">create</i>' } }

            ]
          };

          vm.$onInit = function(){
            if(Auth.validate()) {
              $scope.$emit("userLogged", { status: true });
            }
            getStyles();
            initializeDatatables();

          }

          vm.changeWomanStyle = function(){ console.log('changeWomanStyle')
            $scope.$emit("changeWomanStyle", { style: vm.selectedWomanStyle, name:'woman' });
          }

          vm.changeManStyle = function(){console.log('changeManStyle')
            $scope.$emit("changeManStyle", { style: vm.selectedManStyle, name:'man' });
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
