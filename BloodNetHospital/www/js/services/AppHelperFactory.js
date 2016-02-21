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
'$cordovaClipboard',
'$ionicNavBarDelegate',
function($rootScope, $cordovaNetwork,toastr,NetworkStatus,$log,$ionicHistory,$state,constants,$cordovaInAppBrowser,$cordovaDevice,$q,$ionicLoading,$cordovaClipboard,$ionicNavBarDelegate){

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
    localStorage.setItem(key,value);
  }



  var getValue = function(key)
  {
    return localStorage.getItem(key);
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

  var _copyToClipBoard = function(textToCopy)
  {
    $cordovaClipboard
    .copy(textToCopy)
    .then(function () {
      // success
    }, function () {
      // error
      alert('Failed to copy');
    });
  }

  var _goBack = function()
  {
    $ionicNavBarDelegate.back();
  }

  var _showSuccessMsg = function(messageDetails)
  {
    toastr.success(messageDetails.message, messageDetails.title);
  };
  return {
    showError: showError,
    isOnline : isOnline,
    log:log,
    disableBackNavigation:disableBackNavigation,
    storeValue:storeValue,
    getValue:getValue,
    goTo:goTo,
    openURLInAppBrowser:openURLInAppBrowser,
    error:_error,
    debug:debug,
    errDataConnectionUnavailable:errDataConnectionUnavailable,
    addDeviceDetails:addDeviceDetails,
    getErrorResponse:_prepareError,
    getSuccessResponse:_prepareSuccess,
    getTimeStamp: _getTimeStamp,
    stringify:_stringify,
    copyToClipBoard:_copyToClipBoard,
    goBack:_goBack,
    showSuccessMsg:_showSuccessMsg
  }
}]);
