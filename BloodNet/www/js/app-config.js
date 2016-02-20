app.config(['$ionicConfigProvider',
'$httpProvider',
'$stateProvider',
'$urlRouterProvider',
function($ionicConfigProvider,$httpProvider,$stateProvider,$urlRouterProvider) {
  //Setting number of views to be cache
  $ionicConfigProvider.views.maxCache(1);
  $ionicConfigProvider.scrolling.jsScrolling(false);


  //Change back button style
  $ionicConfigProvider.backButton.text('Back').icon('ion-chevron-left');
  $ionicConfigProvider.backButton.previousTitleText(false);

  //http interceptors
  $httpProvider.interceptors.push(function($rootScope,$q) {
    return {
      request: function(config) {

        if (config.shouldShowLoader !== undefined && config.shouldShowLoader === false) {
          //Do not show loader
          return config;
        }

        $rootScope.$broadcast('loading:show');
        return config;
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide');
        return response;
      },
      responseError:function(result)
      {

        var errorDetails = {};
        switch (result.status) {
          case 404:
          {
              errorDetails.title = "HTTP Error : 404";
              errorDetails.message= "Resource not found";
          }
          break;
          case 405:
          {
              errorDetails.title = "HTTP Error : 405";
              errorDetails.message= "Method not allowed";
          }
          break;
          case 500:
          {
              errorDetails.title = "HTTP Error : 500";
              errorDetails.message= "Internal Server Error";
          }
          break;
          default:
          {
            errorDetails.title = "Unexpected error !";
            errorDetails.message= "Failed to parse reponse received";
          }

        }

        $rootScope.$broadcast('http:error',errorDetails);
        return $q.reject(result);
      }
    }
  });



  //App States
  //TODO : Different landing for Web App

  $stateProvider.state('main',{
    url:'/',
    templateUrl:'templates/landing-mobile.html',
    controller:'LandingController'
  })
  .state('donationRequest',{
    url:'/donationRequest/?:dontationMessage&:hospitalLat&:hospitalLong&:hospitalName',
    templateUrl:'templates/notification-request.html',
    controller:'DonationRequestController'
  })
  // .state('app', {
  //   url: '/app',
  //   abstract: true,
  //   templateUrl: 'templates/menu.html',
  //   controller:'MenuController'
  // })
  // .state('app.home',{
  //   url:'/home',
  //   views: {
  //       'menuContent' :{
  //         templateUrl: "templates/home.html",
  //         controller: 'HomeController'
  //       }
  //   }
  // });


  $urlRouterProvider.otherwise('/');

}]);