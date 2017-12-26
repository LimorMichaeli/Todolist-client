'use strict';

angular.module('myApp.view2', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2', {
      templateUrl: 'view2/view2.html',
      controller: 'View2Ctrl'
    });
  }])
  .controller('View2Ctrl', function ($scope, $http) {
	  
    $http.get("/Reminders/GetReminders").then(function (resp) {      
      $scope.reminders = resp.data;
    });

	$scope.showDeleteDialog=function(reminder){
		$scope.model=reminder;
		$("#delete-dialog").modal('show');
	};
	
	$scope.showEditDialog=function(reminder){
		reminder.Date=new Date(Date.parse(reminder.Date));
		$scope.model=Object.assign({}, reminder);
		$("#edit-dialog").modal('show');
	};
	
	$scope.delete = function(){
		$http.delete("/Reminders/"+$scope.model.Id);
		$scope.model=null;
		//need to remove from reminders list
		$("#delete-dialog").modal('hide');
	};
	
	$scope.edit = function(){
		$http.put("/Reminders/"+$scope.model.Id,$scope.model).then(function(resp){
			
		});
		$scope.model=null;
		//need to update the reminder in list
		$("#edit-dialog").modal('hide');
	};
		
  });