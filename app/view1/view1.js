'use strict';

angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }]).controller('View1Ctrl', function ($scope, $http) {

    $scope.save = save;
    function save() {
      $http.post("/Reminders",$scope.Model).then(function (resp) {
         $scope.showError = false;
         $scope.showSuccess = false;

         if (resp.data.success) {
           $scope.showSuccess = true;
           $scope.Model={};
         } else {
           $scope.showError = true;
           $scope.errorMessage = resp.data.error;
         }
      });
    }

  });