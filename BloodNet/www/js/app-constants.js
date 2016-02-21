//Dummy API : http://localhost/hsbsapp/dummy-api.php
//Dev Server https://sandboxau7-contractorpro.cs23.force.com/hsbs/services/apexrest/MHSBSDispatcher
app.constant("AppConstants", {
        baseURL: 'https://sandboxau7-contractorpro.cs23.force.com/hsbs/services/apexrest/MHSBSDispatcher',
        showVerboseLogs:true,
        appVer: 'applicationVersion',
        buildNum: 'buildNumber',
        statusSuccess : 'success',
        statusFailure : 'failure',
        statusError : 'error',
        statusNoData : 'no-data',
        doNotShowLoaderScreen : false,
        notificationToken : 'AndroidPushToken',
        emailToken:'email' ,
        apiUrl:{
          'users':'http://10.14.120.235:81/app_dev.php/api/v1/users/'
        }
    });
