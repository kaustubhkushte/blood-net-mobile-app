app.factory('LandingFactory',
['AppConstants',
'$http',
function(constants,$http){

  var _sendRegistrationDetails = function(params)
  {
    var url = constants.apiUrl.users;
    var httpConfig = {};
    httpConfig['method'] = 'POST';
    httpConfig['url'] = url;
    httpConfig['data'] = params;
    return $http(httpConfig).then(function(response){
      return response;
    });
  }

  return {
    sendRegistrationDetails:_sendRegistrationDetails
  }
}]);
