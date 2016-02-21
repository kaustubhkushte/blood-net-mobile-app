app.factory('NetworkStatusFactory', function($rootScope, $cordovaNetwork){

  return {
    isOnline: function(){
      if(ionic.Platform.isWebView()){
        return $cordovaNetwork.isOnline();
      } else {
        return navigator.onLine;
      }
    },
    isOffline: function(){
      if(ionic.Platform.isWebView()){
        return !$cordovaNetwork.isOnline();
      } else {
        return !navigator.onLine;
      }
    },
    startWatching: function(){
        if(ionic.Platform.isWebView()){

          $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
            console.log("went online");
            $rootScope.online = true;
          });

          $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("went offline");
            $rootScope.online = false;
          });

        }
        else {
          window.addEventListener("online", function(e) {
            console.log("went online");
            $rootScope.online = true;
          }, false);

          window.addEventListener("offline", function(e) {
            console.log("went offline");
            $rootScope.online = false;
          }, false);
        }
    }
  }
});
