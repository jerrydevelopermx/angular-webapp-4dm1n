angular.module('webApp')
  .factory('Auth',function($q, $state, localStorageService, Requester) {


  return {
    login: login,
    logout : logout,
    validate : validateSession,
    validateSuperUserAccess : validateSuperUserAccess,
    userValidate : validateUser
  }


  function login(credentials){
    var defer = $q.defer();
    Requester.post('auth/login/', credentials).then(function(data) {
      localStorageService.set('token', data.token);
      localStorageService.set('user', data.user[0]);

      defer.resolve(data);
    },
    function(error){
      defer.reject(error)
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

  function validateUser(){
    if(localStorageService.get('token') == null){
      $state.go('login');
    } else {
      return localStorageService.get('user');
    }
  }

  function validateSuperUserAccess(){
    var user = localStorageService.get('user');
    if(user.user_type != 'SuperUser'){
      $state.go('home');
    }
  }



});
