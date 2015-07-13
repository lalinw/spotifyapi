var data;
var url;
var app = angular.module('app', [])
var toptracks;




var ctrl = app.controller('ctrl', function($scope, $http) {
  $scope.audioObject = {}
  

  $scope.getResults = function() {
    url = 'https://api.spotify.com/v1/search?type=' + $scope.searchType + '&query=' + $scope.search;
    //get url based on whether they are searhcing by track or artist
    $http.get(url).success(function(response){
      if ($scope.searchType == 'track') {
        data = $scope.results = response.tracks.items;
      } else {
        data = $scope.results = response.artists.items;
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
    $scope.results = null;
  }

  $scope.getTopTracks = function(id) {
    url = 'https://api.spotify.com/v1/artists/' + id + '/top-tracks?country=US'
    $http.get(url).success(function(response){
      toptracks = $scope.toptracks = response.tracks;
    })
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