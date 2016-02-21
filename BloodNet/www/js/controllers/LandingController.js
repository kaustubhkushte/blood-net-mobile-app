controllers.controller('LandingController',['$scope',
'AppHelperFactory',
'AppConstants',
'$cordovaDatePicker',
'$ionicModal',
'LandingFactory',
                                            '$cordovaSocialSharing',
function($scope,helper,constants,datePicker,$ionicModal,lf,$cordovaSocialSharing){

  $scope.$on('$ionicView.beforeEnter', function(){
    if (helper.getValue(constants.isUserRegistered)==='yes') {
      helper.disableBackNavigation();
      helper.goTo('userProfile');
    }
  });

  helper.log('Landing Loaded');

  $scope.mobileNumberRegEx="/^[0-9]{10,10}$/;"
$scope.share = function () {
    $cordovaSocialSharing.share('This is my message', 'Subject string', null, 'http://www.mylink.com');
}
  $scope.register = {};
  $scope.register.fName = 'Kaustubh';
  $scope.register.lName = 'Kushte';
  $scope.register.email = 'kaustubh@techjini.com';
  $scope.register.mobileNumber = 9945933899;
  $scope.register.gender = 0;


  $scope.register.dob = '1985-08-14';
  $scope.register.bloodGroup = 2;
  $scope.register.wholeBloodDate = '2012-09-09';
  $scope.register.platelatesDate = '2012-09-09';
  $scope.register.plasmaDate = '2012-09-09';
  $scope.register.preferredLocationName = 'BTM';
  $scope.register.preferredLocationLat = 77.33;
  $scope.register.preferredLocationLong = 28.22;
  $scope.register.pushToken = '';

  //TODO : Move blood list to a data folder
  $scope.locations = [
      {"title":"BTM","lat":12,"long":232},
      {"title":"JP Nagar","lat":12,"long":232}
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
    //Store Mobile Number for future use
    helper.storeValue(constants.emailToken,$scope.register.email);
    $scope.register.pushToken =  helper.getValue(constants.notificationToken);
    lf.sendRegistrationDetails($scope.register).then(function(result){
      //Store User Session
      helper.storeValue(constants.isUserRegistered,true);
      //Move to User's Landing Page
      helper.disableBackNavigation();
      helper.goTo('userProfile');
    });

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

  //Select DOB
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
          $scope.register.dob = helper.getServerDateFormat(date);
        }
    });
  }


  //Select LastDonationDate
  $scope.showLastDonationDatePicker = function(dontationType)
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
          var dateStr =helper.getServerDateFormat(date);;
          switch (dontationType) {
            case 0:
            {
              $scope.register.wholeBloodDate = dateStr;
            }
            break;
            case 1:
            {
              $scope.register.platelatesDate = dateStr;
            }
            break;
            case 2:
            {
              $scope.register.plasmaDate = dateStr;
            }
            break;
            default:

          }
        }
    });
  }


}]);