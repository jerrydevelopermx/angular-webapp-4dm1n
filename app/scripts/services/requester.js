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

  function postRequest(){

  }

});
