// setter
var app = angular.module("app",[]).config(['$routeProvider' , function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'login.html',
		controller: 'loginController'
	});
	$routeProvider.when('/home', {
		templateUrl: '/home.html',
		controller: 'homeController'
	})
	$routeProvider.otherwise({redirectTo : '/login' })
}]);

app.factory("AuthenticationService",  ['$location', function($location) {
	return {
		login: function(credentials) {
			if(credentials.username === "ralph") {
				$location.path('/home');
			}
		},
		logout: function() {
			$location.path('/login');
		} 
	};
}]);

app.controller('loginController', ['$scope','AuthenticationService', function( $scope, AuthenticationService) {
	$scope.credentials = { username: "", password: "" };
	$scope.login = function() {
		AuthenticationService.login($scope.credentials);
	}
}]);

app.controller('homeController', ['$scope','AuthenticationService', function( $scope, AuthenticationService) {
	$scope.title = "home";
	$scope.message = "mouse over these Images";
	$scope.logout = function() {
		AuthenticationService.logout();
	}
}]);

app.directive('showsMessageWhenHovered',function(){
	return {
		restrict: "A", //A = Attribute , C = ClassName, E = Element, M = HTML Comment
		link: function(scope, element, attributes) {
			var originalMessage = scope.message;
			element.bind("mouseover", function(){
				scope.message = attributes.message;
				scope.$apply();
			});
			element.bind("mouseout", function(){
				scope.message = originalMessage;
				scope.$apply();

			});
		}
	};
});