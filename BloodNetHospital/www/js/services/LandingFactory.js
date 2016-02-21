app.factory('LandingFactory',
['AppConstants',
'$http',
function(constants,$http){

  var _sendRequestDetails = function(params)
  {
    var url = constants.apiUrl.hospital;
    var httpConfig = {};
    httpConfig['method'] = 'POST';
    httpConfig['url'] = url;
    httpConfig['data'] = params;
    httpConfig['headers'] = {};
    httpConfig['headers']['Token'] = "OTYxMTUxODUxMQ==";

    return $http(httpConfig).then(function(response){
      return response;
    });
  }

  return {
    sendRequestDetails:_sendRequestDetails
  }
}]);
