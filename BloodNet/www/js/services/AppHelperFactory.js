app.factory('AppHelperFactory',
['$rootScope',
'$cordovaNetwork',
'toastr',
'NetworkStatusFactory',
'$log',
'$ionicHistory',
'$state',
'AppConstants',
'$cordovaInAppBrowser',
'$cordovaDevice',
'$q',
'$ionicLoading',
function($rootScope, $cordovaNetwork,toastr,NetworkStatus,$log,$ionicHistory,$state,constants,$cordovaInAppBrowser,$cordovaDevice,$q,$ionicLoading){

  var _stringify = function(jsonObject)
  {
      var seen = [];

      return JSON.stringify(jsonObject, function(key, val) {
         if (typeof val == "object") {
              if (seen.indexOf(val) >= 0)
                  return
              seen.push(val)
          }
          return val
      });
  }

  var showError = function(errorDetails)
  {
    toastr.error(errorDetails.message, errorDetails.title);
  };

  var isOnline = function()
  {
    return NetworkStatus.isOnline();
  }

  var _error = function(msg){
      $log.error(msg);
  }

  var log = function(msg){
      $log.log(msg);
  }

  var debug = function(msg)
  {
    $log.debug(msg);
  }
  var disableBackNavigation = function()
  {
    $ionicHistory.nextViewOptions({
      disableAnimate: false,
      disableBack: true
    });
  }

  var storeValue = function(key,value)
  {
    var deferred = $q.defer();
    $localForage.setItem(key,value).then(function() {
      deferred.resolve(constants.statusSuccess);
    });
    return deferred.promise;
  }

  var _storeSecureValue = function(key,value)
  {
    var deferred = $q.defer();
    $localForage.setItem(key,value).then(function() {
      deferred.resolve(constants.statusSuccess);
    });
    return deferred.promise;
  }

  var getValue = function(key)
  {
    var deferred = $q.defer();
    $localForage.getItem(key).then(function(value){
      deferred.resolve(value);
    });
    return deferred.promise;
  }

  var _getSecureValue = function(key)
  {
    var deferred = $q.defer();
    $localForage.getItem(key).then(function(value){
      deferred.resolve(value);
    });
    return deferred.promise;
  }

  var goTo = function(path,params)
  {
    if (params !== undefined) {
        $state.transitionTo(path,params);
    }
    else {
      $state.transitionTo(path);
    }

  }

  var isCountrySelected = function(){

    var deferred = $q.defer();

    getValue(constants.usersCountry).then(function(value){
      var countryCode = value;
      if (countryCode == undefined) {
        deferred.resolve(false);
      }
      else if(countryCode != '')
      {
        deferred.resolve(true);
      }
      else {
        deferred.resolve(false);
      }
    });

    return deferred.promise;

  };


  var openURLInAppBrowser = function(url)
  {
    var options = {
        location: 'no',
        clearcache: 'yes',
        toolbar: 'yes',
        closebuttoncaption:'Close'
      };

    return $cordovaInAppBrowser.open(url, '_blank', options);
  }

  var didUserAcceptedTerms = function() {
    var deferred = $q.defer();
    getValue(constants.areTermsAccepted).then(function(value){
      var termsFlag = value;
      if (termsFlag == undefined) {
        deferred.resolve(false);
      }
      else if(termsFlag == true)
      {
        deferred.resolve(true);
      }
      else
      {
        deferred.resolve(false);
      }
    });
    return deferred.promise;
  }



  var checkLogin = function() {
    var deferred = $q.defer();

    getValue(constants.userLoginStatus).then(function(value){
      var loginFlag = value;

      if (loginFlag == undefined) {
        deferred.resolve(false);
      }
      else if(loginFlag == true)
      {
        deferred.resolve(true);
      }
      else {
        deferred.resolve(false);
      }
    });

    return deferred.promise;
  }


  var errDataConnectionUnavailable = function()
  {
    showError({title:"Couldn't connect to server !",message:'Please check if you have active data connection'});
  }

  var addDeviceDetails = function(params)
  {
    // deviceID
    // deviceOS
    // deviceOSVersion
    // deviceName
    params['deviceID'] = ionic.Platform.is('browser') ? '' : $cordovaDevice.getUUID();
    params['deviceOS'] = ionic.Platform.platform();
    params['deviceOSVersion'] =  ionic.Platform.version();
    params['deviceName'] = ionic.Platform.is('browser') ? 'browser': $cordovaDevice.getModel();
  }


  var _setupDB = function()
  {
    db.transaction(function(tx){
      tx.executeSql('CREATE TABLE IF NOT EXISTS CountryList ( countryCode integer, countryName text, locale text )');

    },function(e){
      _error(e);
    },function(){

    })
  }

  var _handleDBError = function(errMsg)
  {
    _error(errMsg);
  }

  var _prepareError = function(errMsg)
  {
    return {message:errMsg,status:constants.statusFailure};
  }

  var _prepareSuccess = function(successMsg)
  {
    return {status:constants.statusSuccess};
  }

  var _getTimeStamp = function()
  {
    return new Date().getTime();
  }
  return {
    showError: showError,
    isOnline : isOnline,
    log:log,
    disableBackNavigation:disableBackNavigation,
    storeValue:storeValue,
    getValue:getValue,
    goTo:goTo,
    isCountrySelected:isCountrySelected,
    openURLInAppBrowser:openURLInAppBrowser,
    checkLogin:checkLogin,
    didUserAcceptedTerms:didUserAcceptedTerms,
    error:_error,
    debug:debug,
    errDataConnectionUnavailable:errDataConnectionUnavailable,
    addDeviceDetails:addDeviceDetails,
    setupDB:_setupDB,
    handleDBError:_handleDBError,
    getErrorResponse:_prepareError,
    getSuccessResponse:_prepareSuccess,
    getSecureValue : _getSecureValue,
    storeSecureValue : _storeSecureValue,
    getTimeStamp: _getTimeStamp,
    stringify:_stringify
  }
}]);
