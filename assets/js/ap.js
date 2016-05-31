

var socketApp = angular.module('socketApp',[]);

    socketApp.controller('ChatController',['$http','$log','$scope',function($http,$log,$scope){


      $scope.predicate = '-id';
      $scope.reverse = false;
      $scope.baseUrl ='$location.protocol()' + "://" + '$location.host';
      $scope.chatList =[];
      $scope.getAllchat = function(){

        io.socket.get('/chat/addconv');

        $http.get($scope.baseUrl+'/chat')
           .success(function(success_data){

              $scope.chatList = success_data;
              $log.info(success_data);
           });
      };

      $scope.getAllchat();
  
      $scope.chatMessage="";

      io.socket.on('chat',function(obj){

        if(obj.verb === 'created'){
          $log.info(obj)
          $scope.chatList.push(obj.data); //add the new to the DOM
          $scope.$digest();
        }

      });

      $scope.sendMsg = function(){
        $log.info($scope.chatMessage);
        io.socket.post('/chat/addconv/',{message: $scope.chatMessage});
        $scope.chatMessage = "";
      };
    }]);



var socketAppUsers =angular.module('socketAppUsers',[]);

 socketAppUsers.controller('SessionsController',['$http','$log','$scope',function($http,$log,$scope){
      
     
      $scope.UserListOnLine =[];

    $scope.getAllOnlineUsers = function(){ 

   io.socket.get('/sessions/login/');
   $http.get('/sessions').success(function(success_data){

              $scope.UserListOnLine = success_data;
              $log.info(success_data);

              var j=0;
   for (var i = 0; i < $scope.UserList.length; i++) {
        if ($scope.UserList[i].onLine) {
           $scope.UserListOnLine[j] = $scope.UserList[i];
           j++;
        }
         
      }
           });
 };
 $scope.getAllOnlineUsers();

  io.socket.on('sessions',function(obj){

        if(obj.verb === 'created'){
          $log.info(obj)
          $scope.UserListOnLine.push(obj.data); //add the new to the DOM
          $scope.$digest();
        }

      });



    }]);
  




var AppUser = angular.module('AppUser',[]);

    AppUser.controller('UserController',['$http','$log','$scope',function($http,$log,$scope){
    
      $scope.items =[];

    $http.get('/user/find').success(function(data) {
          for (var i =0 ; i < data.length ; i++) {
            data[i].index = i;
          }
          $scope.items = data;
        });

     

      $scope.EventList =[];
      


    $http.get('/event/find').success(function(data) {
          for (var i =0 ; i < data.length ; i++) {
            data[i].index = i;
          }
          $scope.EventList = data;
        });

     $scope.OnlineUserList =[];
      


    $http.get('/sessions/find').success(function(data) {
          for (var i =0 ; i < data.length ; i++) {
            data[i].index = i;
          }
          $scope.OnlineUserList = data;
        });
   

    }]);





