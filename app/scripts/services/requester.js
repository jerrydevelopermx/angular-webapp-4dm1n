angular.module('webApp')
  .factory('Requester',function($q, $http, APP) {


  return {
    get: getRequest,
    post: postRequest,
    put: putRequest
  }

  function getRequest(api){
    var defer = $q.defer();
    $http.get(APP.api_url + api).then(function(result) {
        defer.resolve(result.data);
    });
    return defer.promise;
  }

  function postRequest(api, params){
    var defer = $q.defer();
    console.log(APP.api_url + api)
    $http.post(APP.api_url + api, JSON.stringify(params), {headers: {'Content-Type': 'application/json; charset=UTF-8'}}).then(function(result) {
        defer.resolve(result.data);
    }, function(error){
      defer.reject(error)
    });
    return defer.promise;
  }

  function putRequest(api, params){
    var defer = $q.defer();
    console.log(APP.api_url + api);
    console.log(params)
    $http.put(APP.api_url + api, JSON.stringify(params), {headers: {'Content-Type': 'application/json; charset=UTF-8'}}).then(function(result) {
        defer.resolve(result.data);
    }, function(error){
      defer.reject(error)
    });
    return defer.promise;
  }
});
