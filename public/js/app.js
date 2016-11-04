var app = angular.module('restaurantApp', []);

app.factory('rests', ['$http', function($http) {
  var o = {
    allRests: []
  };

  o.getAll = function() {
    return $http.get('/rests').success(function(data) {
      angular.copy(data, o.allRests);
    });
  };

  o.create = function(rest) {
    return $http.post('/rests', rest).success(function(data) {
      o.allRests.push(data);
    });
  };

  o.upvote = function(rest) {
    return $http.put('/rests/' + rest._id + '/upvote')
      .success(function(data) {
        rest.rating += 1;
      });
    };

  o.deleteRest = function(rest) {
    return $http.delete('/rests/' + rest._id + '/delete')
      .success(function(data) {
        var index = o.allRests.indexOf(rest);
        console.log(index);
        if (index > -1) {
          o.allRests.splice(index, 1);
        };
      });
    };

  return o;
}]);

app.controller('restaurantController', ['$scope', 'rests', function($scope, rests) {
    rests.getAll();
    $scope.rests = rests.allRests;

    $scope.ratings = [0,1,2,3,4,5];

    $scope.addRest = function() {
      if (!$scope.title || $scope.title === '' || !$scope.rating) {
        return;
      }

      rests.create({title: $scope.title, rating: $scope.rating});
      $scope.title = '';
    };

    $scope.incrementUpvotesCount = function(rest) {
      rests.upvote(rest);
    };

    $scope.deleteRest = function(rest) {
      rests.deleteRest(rest);
    };
  }
]);
