var app = angular.module('albumArt');

app.controller('main-controller', function($scope, $firebase, $rootScope, itunesService, envService, chatMessages) {
  
  var ref = new Firebase("https://albumart.firebaseio.com");
  var sync = $firebase(ref).$asArray();
  
  
  $scope.messages = chatMessages;

  $scope.addMessage = function(message, username) {
    sync.$add({content: message});
    $scope.message = "";
  };

  var finalArray = [];

   $scope.getSongData = function() {
      itunesService.getMusic($scope.artist).then(function(res){
          console.log(res);
          $scope.musicData = res.data.results;
          var musicData = $scope.musicData;
          for (var key in musicData) {
            finalArray.push({
                albumArt: musicData[key].artworkUrl100
            });
          };
      });
   };
   $scope.songData = finalArray;

});