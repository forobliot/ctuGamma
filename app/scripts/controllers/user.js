'use strict';

/**
 * @ngdoc function
 * @name unimiAppApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the unimiAppApp
 */
angular.module('unimiAppApp')
  .controller('UserCtrl', function ($scope, $rootScope, unimiService) {
	  $scope.mode = 'w4';
      $scope.loading = false;
	  
	  // if ($rootScope.token) {
		// $scope.userEmail = $rootScope.token.Login;
		// $scope.userCds = $rootScope.token.User.CdSList[0].AcademicCourse;
		// $scope.userYear = $rootScope.token.User.CdSList[0].FirstRegistrationYear;  
	  // }
	  
	  $scope.getData = function() {
			$scope.of = null;
			$scope.cds = null;
			
			$scope.loading = true;
		  
			if ($scope.userCds) {
				unimiService.getCdsProjects($scope.userCds).success(function(data) {
					$scope.cds = data;
				}).error(function() { $scope.loading = false; } ).then(function() {
					if ($scope.userCds && $scope.userYear) {
						unimiService.getUserOf($scope.userCds, $scope.userYear).success(function(data) {
							  $scope.of = data;
							  $scope.mode = $scope.of ? 'w4' : 'cds';
						});
					}
					else {
						$scope.mode = $scope.userCds ? 'cds' : $scope.mode;
					}
				}).then(function() { $scope.loading = false; });
			}
	  };
	  
	  $scope.getUserData = function() {
		$scope.userCds = '';
		$scope.userYear = '';
		  
		  var email = ($scope.userEmail || 'nouser').replace(/^\s+|\s+$/gm,'').replace(/\./g, '_');
		  email = email.indexOf('@') < 0 ? email + '@studenti_unimi_it' : email;
		  unimiService.getUserData(email).success(function(data) {
			  if (data)
			  {
				$scope.userCds = data.cds;
				$scope.userYear = data.year;
				
				$scope.getData();
			  }
		  }).error(function() {
			  console.log('404');
		  });
	  };
  });
