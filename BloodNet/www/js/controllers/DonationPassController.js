controllers.controller('DonationPassController',['$scope',
'AppHelperFactory',
'AppConstants',
'$cordovaDatePicker',
'$ionicModal',
'$stateParams',
function($scope,helper,constants,datePicker,$ionicModal,$stateParams){

  helper.log('DonationPassController Loaded');
  helper.log($stateParams);

}]);