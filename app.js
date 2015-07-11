var data;
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='
var app = angular.module('app', [])

var ctrl = app.controller('ctrl', function($scope, $http) {
  $scope.audioObject = {}
  $scope.getSongs = function() {
    $http.get(baseUrl + $scope.track)
      .success(function(response){
        data = $scope.tracks = response.tracks.items
      
      })
  }
  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()   
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) {
        $scope.audioObject.pause()
      }
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.currentSong = song
    }
  }
})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});


/*
know the length of the sample track 
where is currentSong initialized
is the play() and pause() user-defined!? (not given)
is q for query?
how do you find the -baseURL
search song and artist and then return the overlapped data? (matched both song and artist)
delete duplicates
