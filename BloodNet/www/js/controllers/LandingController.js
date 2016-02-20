controllers.controller('LandingController',['$scope',
'AppHelperFactory',
'AppConstants',
'$cordovaDatePicker',
'$ionicModal',
function($scope,helper,constants,datePicker,$ionicModal){

  helper.log('Landing Loaded');

  $scope.mobileNumberRegEx="/^[0-9]{10,10}$/;"

  $scope.register = {};
  $scope.register.wholeBloodDate = '';
  $scope.register.platelatesDate = '';
  $scope.register.plasmaDate = '';
  $scope.register.preferredLocationName = '';
  $scope.register.preferredLocationLat = 77.33;
  $scope.register.preferredLocationLong = 28.22;

  //TODO : Move blood list to a data folder
  $scope.locations = [
      {"title":"BTM","lat":12,"long":232},
      {"title":"BTM","lat":12,"long":232}
  ];
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


  $ionicModal.fromTemplateUrl('templates/preffered-location-search.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  });

  $scope.showLocationSearchModal = function() {
    $scope.curSelectedLocation = undefined;
    $scope.modal.show();
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.cancelLocationSearch = function()
  {
    $scope.modal.hide();
  }


  $scope.submitDetails = function()
  {
    alert(1);
  }



  $scope.selectedLocation = function(location)
  {
    $scope.curSelectedLocation = location;
    helper.debug(location);
  }

  $scope.doneSelection = function()
  {
    if ($scope.curSelectedLocation != undefined) {
      $scope.register.preferredLocationName = $scope.curSelectedLocation.title;
      $scope.register.preferredLocationLat = $scope.curSelectedLocation.lat;
      $scope.register.preferredLocationLong = $scope.curSelectedLocation.long;
    }
    $scope.closeModal();
  }


  $scope.showDOBPicker = function()
  {
    var datePickerOptions = {
      date: new Date(),
      mode: 'date', // or 'time'
      minDate: new Date('1945','01','01'),
      allowOldDates: true,
      allowFutureDates: false,
      doneButtonLabel: 'DONE',
      doneButtonColor: '#000000',
      cancelButtonLabel: 'CANCEL',
      cancelButtonColor: '#000000'
    };
    datePicker.show(datePickerOptions).then(function(date){
        if (date !== undefined) {
          var month = date.getMonth();
          var day = date.getDay();
          var year = date.getFullYear();
          $scope.register.dob = year +'/'+day+'/'+month;
        }
    });
  }


}]);