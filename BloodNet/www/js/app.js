// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('bloodNet', ['ionic','ionic.service.core','app.controllers','ngAnimate', 'toastr']);

app.run(function($ionicPlatform,$cordovaPush,$rootScope,AppHelperFactory,AppConstants) {
  var androidConfig = {
    "senderID": "946497734636",
  };


  $ionicPlatform.ready(function() {
    if (window.cordova) {
      //   var push = new Ionic.Push({
      //   "debug": false,
      //   "onNotification": function(notification) {
      //     alert('Received push notification!');
      //     alert(notification);
      //   },
      //   "pluginConfig": {
      //     "android": {
      //       "iconColor": "#0000FF"
      //     }
      //   }
      // });
      // push.register(function(token) {
      //   //alert(token.token);
      //   AppHelperFactory.copyToClipBoard(token.token);
      // });
      
      // Register for notification
      $cordovaPush.register(androidConfig).then(function(result) {
        // Success
      }, function(err) {
        // Error
        alert(err);
      });


      $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
        switch(notification.event) {
          case 'registered':
            if (notification.regid.length > 0 ) {
              //Store the Token For sending it to server
              AppHelperFactory.storeValue(AppConstants.notificationToken,notification.regid);
              //TODO : For development purpose remove while app is in production.
              AppHelperFactory.copyToClipBoard(notification.regid);
              alert('registration ID = ' + notification.regid);
            }
            break;

          case 'message':
            // this is the actual push notification. its format depends on the data model from the push server
            alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
            break;

          case 'error':
            alert('GCM error = ' + notification.msg);
            break;

          default:
            alert('An unknown GCM event has occurred');
            break;
        }
      });
    }

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

