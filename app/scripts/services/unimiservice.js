'use strict';

//var restUrl = 'http://ariel.ariel.ctu.unimi.it/unimirest/unimi/';
var restUrl = 'http://ale.unimi.it/unimirest/unimi/';

/**
 * @ngdoc service
 * @name unimiAppApp.unimiService
 * @description
 * # unimiService
 * Service in the unimiAppApp.
 */
angular.module('unimiAppApp')
  // .factory('authfilter', function($q, $window, $location, $rootScope) {
	  // return {
		  // response: function(response) {
			// if (response.headers('X-Nouser') === 'true') {
				// delete($rootScope.token);
			// }
			// return response;
		  // },
		  // responseError: function(response) {
			// if (response.status === 401) {
				// $window.location.href = 'https://www.elearning.unimi.it/authentication/portal/login.aspx?c=true&url=' + $location.absUrl();
			// }
			// return $q.reject(response);
		  // }
	  // };
  // })
  .service('unimiService', function ($http) {
    var that = this;
	
	this.restUrl = restUrl;
	this.currentYear = '2015';
	
	this.isOnlyActive = true;
	this.isW4Mode = true;
	this.isOnlyAriel = true;
	
	if (sessionStorage) {
		this.isOnlyActive = sessionStorage.isOnlyActive ? sessionStorage.isOnlyActive === 'true' : true;
		this.isW4Mode = sessionStorage.isW4Mode ? sessionStorage.isW4Mode === 'true' : true;
		this.isOnlyAriel = sessionStorage.isOnlyAriel ? sessionStorage.isOnlyAriel === 'true' : true;
	}
	
	function saveState()
	{
		if (sessionStorage) {
			sessionStorage.isOnlyActive = that.isOnlyActive;
			sessionStorage.isW4Mode = that.isW4Mode;
			sessionStorage.isOnlyAriel = that.isOnlyAriel;
		}
	}

	this.setOnlyActive = function(state) {
		that.isOnlyActive = state;
		saveState();
	};

	this.setW4Mode = function(state) {
		that.isW4Mode = state;
		saveState();
	};

	this.setOnlyAriel = function(state) {
		that.isOnlyAriel = state;
		saveState();
	};
	
	this.getLoggedUser = function(keywords) {
		return $http.get(that.restUrl + 'loggeduser');
	};

	this.getFaculties = function() {
		return $http.get(that.restUrl + 'faculties');
	};
	
	this.getFaculty = function(fKey) {
		return $http.get(that.restUrl + 'faculty/' + fKey + '/cdses');
	};
	
	this.getCdsOfs = function(cdsKey) {
		return $http.get(that.restUrl + 'cds/' + cdsKey + '/ofs');
	};

	this.getCdsProjects = function(cdsKey) {
		return $http.get(that.restUrl + 'cds/' + cdsKey + '/projects');
	};
	
	this.getUserOf = function(userCds, userYear) {
		return $http.get(that.restUrl + 'userOf/' + userCds + '/' + userYear);
	};
	
	this.getUserData = function(email) {
		return $http.get(that.restUrl + 'userdata/' + email);
	};

	this.getTeachers = function() {
		return $http.get(that.restUrl + 'teachers');
	};
	
	this.getTeacher = function(userid) {
		return $http.get(that.restUrl + 'teacher/' + userid);
	};

	this.quicksearch = function(keywords) {
		return $http.get(that.restUrl + 'quicksearch/' + keywords);
	};


  });
