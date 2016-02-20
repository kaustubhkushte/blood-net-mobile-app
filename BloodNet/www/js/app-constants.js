//Dummy API : http://localhost/hsbsapp/dummy-api.php
//Dev Server https://sandboxau7-contractorpro.cs23.force.com/hsbs/services/apexrest/MHSBSDispatcher
app.constant("AppConstants", {
        baseURL: 'https://sandboxau7-contractorpro.cs23.force.com/hsbs/services/apexrest/MHSBSDispatcher',
        showVerboseLogs:true,        
        emailID: 'emailAddress',
        userID:'userID',
        areTermsAccepted:'areTermsAcceptedByUser',
        userLoginStatus:'isUserLoggedIn',
        usersCountry: 'countryCode',
        usersCountryName:'countryName',
        usersLocale:'locale',
        appVer: 'applicationVersion',
        buildNum: 'buildNumber',
        statusSuccess : 'success',
        statusFailure : 'failure',
        statusError : 'error',
        statusNoData : 'no-data',
        databaseName : 'hsbsApp.db',
        setOfBldgVerticals : 'BuildingSectorsVerticalsTypes',
        setOfQuestionnaire : 'SurveyQuestionnaire',
        setOfStatesCities : 'StateCities',
        doNotShowLoaderScreen : false,
        surveyStatusBegin : 0,
        surveyStatusTermsAccepted : 1,
        surveyStatusInProgress : 2,
        surveyStatusComplete : 3,
    });
