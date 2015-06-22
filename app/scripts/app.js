'use strict';

/**
 * @ngdoc overview
 * @name unimiAppApp
 * @description
 * # unimiAppApp
 *
 * Main module of the application.
 */
angular
  .module('unimiAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
	'infinite-scroll'
  ])
  .config(function ($routeProvider, $httpProvider) {
    // ATTENZIONE: senza questa riga di configurazione 
    // non vengono inviati i cookie con le richieste $http
    // http://stackoverflow.com/questions/17064791/http-doesnt-send-cookie-in-requests
    $httpProvider.defaults.withCredentials = true;
//	$httpProvider.interceptors.push('authfilter');
	
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/cdses/:fKey', {
        templateUrl: 'views/cdses.html',
        controller: 'CdsesCtrl'
      })
      .when('/faculty/:fKey', {
        templateUrl: 'views/faculty.html',
        controller: 'FacultyCtrl'
      })
      .when('/faculties', {
        templateUrl: 'views/faculties.html',
        controller: 'FacultiesCtrl'
      })
      .when('/cds/:cdsKey', {
        templateUrl: 'views/cds.html',
        controller: 'CdsCtrl'
      })
      .when('/teacher/:userid', {
        templateUrl: 'views/teacher.html',
        controller: 'TeacherCtrl'
      })
      .when('/cds/:cdsKey/projects', {
        templateUrl: 'views/cdsprojects.html',
        controller: 'CdsprojectsCtrl'
      })
      .when('/teachers', {
        templateUrl: 'views/teachers.html',
        controller: 'TeachersCtrl'
      })
      .when('/quicksearch/:keywords', {
        templateUrl: 'views/quicksearch.html',
        controller: 'QuicksearchCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $location, unimiService) {
	  $rootScope.loadingUser = true;
	  $rootScope.logoutUrl = 'https://www.elearning.unimi.it/authentication/portal/logout.aspx?backurl=' + $location.absUrl();
	  // unimiService.getLoggedUser().success(function(data) {
		// $rootScope.token = data;
		// $rootScope.loadingUser = false;
	  // });
	  $rootScope.goSearch = function() {
		  var keywords = $rootScope.keywords || '';
		  keywords = keywords.trim();
		  if (keywords) {
			$location.path('/quicksearch/' + keywords);
		  }
	  };
  });
