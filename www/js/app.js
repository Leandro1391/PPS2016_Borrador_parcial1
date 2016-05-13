// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var myDataRef = new Firebase('https://fiery-inferno-1382.firebaseio.com');
angular.module('starter', ['ionic', 'firebase','starter.controllers', 'starter.services', 'ngCordova', 'ionic-toast'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('root', {
                url : '/root',
                templateUrl : 'root.html',
                controller : 'RootPageController'
    })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'ControladorLinterna'
      }
    }
  })

  .state('tab.geolocation', {
    url: '/geolocation',
    views: {
      'tab-geolocation': {
        templateUrl: 'templates/tab-geolocation.html'
        
      }
    }
  })


  .state('Menu', {
     url : '/Menu',
    templateUrl : 'MenuAbst.html',
    abstract : true
    })


  .state('Menu.home', {
      url: '/home',
      views: {
          'contenido': {
              templateUrl: 'MenuHome.html'
          }
      }
  })


  .state('Menu.uno', {
        url: '/uno',
        views: {
            'contenido': {
             templateUrl: 'MenuUno.html'
              }
        }
    })

  .state('Menu.dos', {
                url: '/dos',
                views: {
                  'contenido': {
                   templateUrl: 'MenuDos.html',
                   controller: 'ControladorToast'
                }
          }
      })




  .state('templateDeviceM',{
    url: '/templateDeviceM',
    templateUrl: 'templates/templateDeviceMotion.html',
    controller: 'ControladorDeviceMotion'
  })

  /*.state('templateFlash',{
    url: '/templateFlash',
    templateUrl: 'templates/templateFlashlight.html',
    controller: 'ControladorLinterna'
  })*/

  .state('templateCam',{
    url: '/templateCam',
    templateUrl: 'templates/templateCamera.html',
    controller: 'ControladorCamara'
  })

  .state('templateVib',{
    url: '/templateVib',
    templateUrl: 'templates/templateVibration.html',
    controller: 'ControladorVibracion'
  })

  .state('templateBarcode',{
    url: '/templateBarcode',
    templateUrl: 'templates/templateBarcodeScanner.html',
    controller: 'ControladorBarCode'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/root');

})



.controller('RootPageController', function($scope, $ionicSideMenuDelegate) {
    })


.controller('NavController', function($scope, $ionicSideMenuDelegate) {
      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
    })


.controller('ControladorToast', ['$scope', 'ionicToast', function($scope, ionicToast) {

$scope.mostrarMensaje = function(mensaje,posicion,cierreAutomatico,duracion){
    
 // <!-- ionicToast.show(message, position(top, middle, bottom), stick(true or false), time); -->
  ionicToast.showInfo(mensaje, posicion, cierreAutomatico, duracion);
  
 }
}]);
