var url;
var app = angular.module('app', [])
var topT = [];
var tts;

var ctrl = app.controller('ctrl', function($scope, $http) {
  $scope.audioObject = {};
  
  $scope.getResults = function() {
    $scope.results1 = null;
    $scope.results2 = null;
    $scope.top = [];
    topT = [];
    url = 'https://api.spotify.com/v1/search?type=' + $scope.searchType + '&query=' + $scope.search;
    //get url based on whether they are searhcing by track or artist
    $http.get(url).success(function(response){
      if ($scope.searchType == 'track') {
        $scope.results1 = response.tracks.items;
      } else {
        $scope.results2 = response.artists.items;
      }
      //resulting array is initialized here
    })
  }

  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()   
      $scope.currentSong = false
      return
    } else {
      if($scope.audioObject.pause != undefined) {
        $scope.audioObject.pause()
      }
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.currentSong = song
    }
  }

  $scope.getTopTracks = function(id) {
    url = 'https://api.spotify.com/v1/artists/' + id + '/top-tracks?country=US';

    $http.get(url).success(function(response){
      $scope.toptracks = response.tracks;
      angular.forEach($scope.toptracks, function(d, i){
        tts = $scope.obj = {};
        $scope.obj.name = d.name;
        $scope.obj.preview_url = d.preview_url;
        $scope.obj.album = d.album.name;
        $scope.obj.artistId = id;
        topT.push(tts);
      })      
    });
    $scope.top = topT;
  }


})

app.filter('filtertt', function() {
  return function(topT, artist) {
    var filtered = [];
    angular.forEach(topT, function(item) {
      if(item.artistId == artist.id) {
        filtered.push(item);
      }
    });
    return filtered;
  };
});


// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});
