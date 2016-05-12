angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaFlashlight) {

  /*$cordovaFlashlight.available().then(function(availability) {
    var avail = availability; // is available
  }, function () {
    // unavailable
  });*/

  $scope.LightOn = function(){
    $cordovaFlashligth.switchOn();  
  }
    
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('ControladorBarCode', function($scope, $cordovaBarcodeScanner) {

  $scope.scanBarCode = function() {

    $cordovaBarcodeScanner.scan().then(function(imageData){

      alert(imageData.text);
      console.log("format" + imageData.format)

    }, function(error){
      console.log("un error ha sucedido" + error);
    });

  }

})


.controller('GeolocationCtrl', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {
     
    $ionicPlatform.ready(function() {    
 
        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });
         
        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };
 
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;
             
            var myLatlng = new google.maps.LatLng(lat, long);
             
            var mapOptions = {
                center: myLatlng,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };          
             
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);          
             
            $scope.map = map;   
            $ionicLoading.hide();           
             
        }, function(err) {
            $ionicLoading.hide();
            console.log(err);
        });
    })               
});
