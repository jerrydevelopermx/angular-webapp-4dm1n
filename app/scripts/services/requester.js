angular.module('webApp')
  .factory('Requester',function($q, $http, APP) {


  return {
    get: getRequest,
    post: postRequest

  }

  function getRequest(api){
    var defer = $q.defer();
    $http.get(APP.api_url + api).then(function(result) {
        defer.resolve(result.data);
    });
    return defer.promise;
  }

  function postRequest(api, params){
    var defer = $q.defer(); console.log(APP.api_url + api)
    $http.post(APP.api_url + api, params).then(function(result) {
        defer.resolve(result.data);
    }, function(error){
      defer.reject(error)
    });
    return defer.promise;
  }

});
