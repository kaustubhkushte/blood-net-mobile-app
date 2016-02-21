var apiManager = angular.module('app.services', []);

apiManager.factory('restAPI', ['$http',
'$httpParamSerializer',
'$q',
'$rootScope',
'AppHelperFactory',
'AppConstants',function($http,$httpParamSerializer,$q,$rootScope,helper,constants) {

  function _getToken()
  {
    return "";
  }


  var _encrypt = function(plainText,iv,key)
  {
    var encryptedText = CryptoJS.AES.encrypt(plainText, key, { iv: iv });
    return encryptedText
  }


  var _SendPOST = function(params,url,shouldShowLoader) {
    //Encrypted token
    var token = _getToken();
    var httpConfig = {};
    httpConfig['method'] = 'POST';
    httpConfig['url'] = url;
    httpConfig['data'] = params;
    httpConfig['headers'] = {};
    httpConfig['headers']['Token'] = token;

    if (shouldShowLoader !== undefined) {
        httpConfig['shouldShowLoader'] = shouldShowLoader;
    }

    return $http(httpConfig).then(function(response){

    });
  };
  return {
    SendPOST:_SendPOST
  }

}]);