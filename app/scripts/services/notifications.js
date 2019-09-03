angular.module('webApp')
  .factory('Notifications',function($mdToast) {


  return {
    message: getMessage
  }

  function getMessage(type, content){
    $mdToast.show(
      $mdToast.simple()
        .content(content)
        .hideDelay(2000)
        .position('bottom left')
        .theme(type + '-toast')
    );
  }


});
