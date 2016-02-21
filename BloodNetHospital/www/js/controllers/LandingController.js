controllers.controller('LandingController',['$scope',
'AppHelperFactory',
'AppConstants',
'$cordovaDatePicker',
'$ionicModal',
'$cordovaBarcodeScanner',
'$timeout',
'LandingFactory',
function($scope,helper,constants,datePicker,$ionicModal,scanner,$timeout,lf){

  helper.log('Landing Loaded');


  $scope.bloodGroupList = [
{"title":"AB+","value":1},
{"title":"AB-","value":2},
{"title":"A+","value":3},
{"title":"A-","value":4},
{"title":"B+","value":5},
{"title":"B-","value":6},
{"title":"O+","value":7},
{"title":"O-","value":8}
];
  $scope.feedback = {};
  $scope.donateRequest = {};
  $scope.donateRequest.qty = 1;

  $scope.sendRequest = function()
  {
    //Call API
    lf.sendRequestDetails($scope.donateRequest).then(function(response){
      helper.showSuccessMsg({message:'Request sent', title:'Donation Request'});
    });
  }

  //Donation Request Modal
  $ionicModal.fromTemplateUrl('templates/dontation-request.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.requestModal = modal
  });

  $scope.showRequestModal = function() {
    $scope.requestModal.show();
  }

  $scope.closeRequestModal = function() {
    $scope.requestModal.hide();
  };






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

  //Donation Feedback Modal
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