controllers.controller('LandingController',['$scope',
'AppHelperFactory',
'AppConstants',
'$cordovaDatePicker',
'$ionicModal',
'$cordovaBarcodeScanner',
'$timeout',
function($scope,helper,constants,datePicker,$ionicModal,scanner,$timeout){

  helper.log('Landing Loaded');
  $scope.feedback = {};

  //TODO : Send Rquest Form

  $scope.scanQRCode = function()
  {
    helper.showSuccessMsg({message:'Please wait ...',title:'Initialzing QR Corde Reader'})
    $timeout(function() {
      //Scan QR Code
      scanner.scan().then(function(barcodeData) {
          // Success! Barcode data is here
          helper.debug(barcodeData);
          $scope.showFeedbackModal();
        }, function(error) {
          // An error occurred
        });

    }, 1000);
  }

  $scope.sendFeedBack = function()
  {
    $scope.closeModal();
  }
  $ionicModal.fromTemplateUrl('templates/dontation-feedback.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  });

  $scope.showFeedbackModal = function() {
    $scope.modal.show();
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });


}]);