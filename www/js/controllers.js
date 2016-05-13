angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

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

.controller('ControladorBarCode', function($scope, $cordovaBarcodeScanner, $ionicPlatform) {

  $ionicPlatform.ready(function() {

          console.log("esta listo");

          $scope.scanBarCode = function() {

            console.log("esta re contra listo");

          $cordovaBarcodeScanner.scan().then(function(imageData){

            alert(imageData.text);
            console.log("format" + imageData.format)

          }, function(error){
            console.log("un error ha sucedido" + error);
          });

        }

  });
  

})

.controller('ControladorDeviceMotion', function($scope, $cordovaDeviceMotion, $ionicPlatform) {

  // wopciones de aceleración del reloj
    $scope.options = { 
        frequency: 100, // mide cada 100ms
        deviation : 25  // usamos el deviation para determinar el evento de movimiento, valores recomendados entre 25 y 30
    };
 
    // Medidas actuales
    $scope.measurements = {
        x : null,
        y : null,
        z : null,
        timestamp : null
    }
 
    // Medidas previas    
    $scope.previousMeasurements = {
        x : null,
        y : null,
        z : null,
        timestamp : null
    }   
 
    // Watcher object
    $scope.watch = null;
 
    // Comienza la medición cuando el dispositivo Cordova está listo
    $ionicPlatform.ready(function() {
 
        //Comienza Watching method
        $scope.startWatching = function() {     
 
            // Device motion configuration
            $scope.watch = $cordovaDeviceMotion.watchAcceleration($scope.options);
 
            // Device motion initilaization
            $scope.watch.then(null, function(error) {
                console.log('Error');
            },function(result) {
 
                // Set current data  
                $scope.measurements.x = result.x;
                $scope.measurements.y = result.y;
                $scope.measurements.z = result.z;
                $scope.measurements.timestamp = result.timestamp;                 
 
                // Detecta shake  
                $scope.detectShake(result);  
 
            });     
        };      
 
        // Stop watching method
        $scope.stopWatching = function() {  
            $scope.watch.clearWatch();
        }       
 
        // Detect shake method      
        $scope.detectShake = function(result) { 
 
            //Object to hold measurement difference between current and old data
            var measurementsChange = {};
 
            // Calculate measurement change only if we have two sets of data, current and old
            if ($scope.previousMeasurements.x !== null) {
                measurementsChange.x = Math.abs($scope.previousMeasurements.x, result.x);
                measurementsChange.y = Math.abs($scope.previousMeasurements.y, result.y);
                measurementsChange.z = Math.abs($scope.previousMeasurements.z, result.z);
            }
 
            // If measurement change is bigger then predefined deviation
            if (measurementsChange.x + measurementsChange.y + measurementsChange.z > $scope.options.deviation) {
                $scope.stopWatching();  // Stop watching because it will start triggering like hell
                console.log('Shake detected'); // shake detected
                setTimeout($scope.startWatching(), 1000);  // Again start watching after 1 sex
 
                // Clean previous measurements after succesfull shake detection, so we can do it next time
                $scope.previousMeasurements = { 
                    x: null, 
                    y: null, 
                    z: null
                }               
 
            } else {
                // On first measurements set it as the previous one
                $scope.previousMeasurements = {
                    x: result.x,
                    y: result.y,
                    z: result.z
                }
            }           
 
        }       
 
    });
 
    $scope.$on('$ionicView.beforeLeave', function(){
        $scope.watch.clearWatch(); // Turn off motion detection watcher
    }); 

})


.controller('ControladorCamara', function($scope, $ionicHistory, $firebaseArray, $cordovaCamera) {

//
$scope.mostrarSpin='si';

$scope.datos={
      comentario:"Sin comentario",
      lenguaje:"",
      materia:"",
      titulo:"Sin Titulo"
    };
    
$scope.settings = {
  calidad:50,
    guardar: true,
    editar: true
  };
  $ionicHistory.clearHistory();
 $scope.images  = [];
 var syncArray = $firebaseArray(myDataRef.child('fotos'));



  myDataRef.on("child_added", function(snapshot) {
         
        $scope.mostrarSpin='no';
        console.info("valor array syncArray",syncArray);
        $scope.images=syncArray;
      //  alert("imagen volvio.");

}, function (errorObject) {

    $scope.mostrarSpin='no';

  console.log("The read failed: " + errorObject.code);
}); 

   $scope.upload = function() {
        var options = {
            quality : $scope.settings.calidad,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : $scope.settings.editar,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum:$scope.settings.guardar
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {



            syncArray.$add({image: imageData ,fecha: Firebase.ServerValue.TIMESTAMP,informacion: $scope.datos})
            .then(function() {
                alert("imagen guardada.");
            },function(error){
              alert("error al sincronizar: "+error);
            });
        }, function(error) {
            alert("error.");
        });
    }
})

.controller('ControladorLinterna', function($scope, $cordovaFlashlight, $ionicPlatform){


  $ionicPlatform.ready(function() {

        console.log("esta listo");

        //$scope.configuracion = {estado:false};

        //$cordovaFlashlight.toggle()


        // $scope.algo = function(){

        //         if ($scope.configuracion.estado == true){

        //         console.log("está encendido");
        //         $cordovaFlashlight.switchOn();
        //       }
        //       else{
        //         console.log("está apagado");
        //         $cordovaFlashlight.switchOff();

        //       }

        // }

        $scope.lightOn = function(){

          console.log("está re contra listo");
          $cordovaFlashlight.switchOn();  
        }

        $scope.lightOff = function(){

          console.log("está apagado");
          $cordovaFlashlight.switchOff();
        }

   });

  document.addEventListener("backbutton", function() {
  // pass exitApp as callbacks to the switchOff method 
  $cordovaFlashlight.switchOff(exitApp, exitApp);
}, false);
 
function exitApp() {
  navigator.app.exitApp();
}

})


.controller('ControladorVibracion', function($scope, $cordovaVibration, $ionicPlatform){

   $ionicPlatform.ready(function() {

        console.log("esta listo");

        $scope.vibrar = function(){

          console.log("esta recontra listo");
          // vibra 1 segundo
          $cordovaVibration.vibrate(1000);

        }

   });

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
