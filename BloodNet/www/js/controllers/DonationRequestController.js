controllers.controller('DonationRequestController',['$scope',
'AppHelperFactory',
'AppConstants',
'$cordovaDatePicker',
'$ionicModal',
'$stateParams',
function($scope,helper,constants,datePicker,$ionicModal,$stateParams){

  helper.log('Donation Request Loaded');
  helper.log($stateParams);
  $scope.request = {};
  $scope.request.dontationMessage = $stateParams.dontationMessage;
  $scope.request.hospitalName = $stateParams.hospitalName;
}]);