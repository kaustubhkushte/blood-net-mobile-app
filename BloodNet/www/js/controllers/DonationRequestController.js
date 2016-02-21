controllers.controller('DonationRequestController',['$scope',
'AppHelperFactory',
'AppConstants',
'$cordovaDatePicker',
'$ionicModal',
'$stateParams',
'$cordovaSocialSharing',
function($scope,helper,constants,datePicker,$ionicModal,$stateParams,$cordovaSocialSharing){

  helper.log('Donation Request Loaded');
  helper.log($stateParams);
  $scope.request = {};
  $scope.request.dontationMessage = $stateParams.dontationMessage;
  $scope.request.hospitalName = $stateParams.hospitalName;

  $scope.share = function () {
      $cordovaSocialSharing.share($scope.request.dontationMessage, 'Blood Donation Request', null, '');
  }

  $scope.acceptRequest = function()
  {
    var pl = $stateParams;
    var dontationMessage = pl.dontationMessage;
    var hospitalLat = pl.hospitalLat;
    var hospitalLong = pl.hospitalLong;
    var hospitalName = pl.hospitalName;
    helper.disableBackNavigation();
    helper.goTo('donationPass',{dontationMessage:dontationMessage,hospitalLat:hospitalLat,hospitalLong:hospitalLong,hospitalName:hospitalName});
  }

  $scope.canelRequest = function()
  {
    helper.goBack();
  }
}]);