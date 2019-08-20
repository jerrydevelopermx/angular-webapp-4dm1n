angular.module('webApp')
  .factory('Auth',function($q, $state, localStorageService, Requester) {


  return {
    login: login,
    logout : logout,
    validate : validateSession

  }


  function login(credentials){
    var defer = $q.defer();
    Requester.post('auth/login/', credentials).then(function(data) {
      console.log(data);
      localStorageService.set('token', data.token);
      defer.resolve(true);
    },
    function(error){
      console.log(error)
    });

    return defer.promise;
  }

  function logout(){
    localStorageService.clearAll();
  }

  function validateSession(){
    console.log(localStorageService.get('token'))
    if(localStorageService.get('token') == null){
      $state.go('login');
    } else {
      return true;
    }
  }



});
