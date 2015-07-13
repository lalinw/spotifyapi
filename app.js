var url;
var app = angular.module('app', [])
var topT = [];
var sth;

var ctrl = app.controller('ctrl', function($scope, $http) {
  $scope.audioObject = {};
  
  $scope.getResults = function() {
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

  $scope.changed = function(){
    $scope.results1 = null;
    $scope.results2 = null;
    topT = null;
  }

  var ttObj = {};
  $scope.getTopTracks = function(id) {
    url = 'https://api.spotify.com/v1/artists/' + id + '/top-tracks?country=US'
    $http.get(url).success(function(response){
      $scope.toptracks = response.tracks;
    })
    // //topT.push($scope.toptracks);
    // var sth = new ttObj($scope.toptracks);
    alert($scope.toptracks);
  }






})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});

//shows info on hover



/*
sources---
get an artist's top tracks
  https://api.spotify.com/v1/artists/{id}/top-tracks?country=US
  OR 
  artists.items.href + '/top-tracks?country=US'
  can get id by...
  (using the artists search) artists.items.id
get artist image..
  artists.items.images[2].url
artists.items.followers.total
artists.items.name
artists.items.popularity

top tracks
(search top tracks--off search bar)
album name-- tracks.album.name
track name-- tracks.album.external_urls.name
track preview-- tracks.album.external_urls.preview_url




*/