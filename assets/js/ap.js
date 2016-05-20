

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
/*
              var j=0;
   for (var i = 0; i < $scope.UserList.length; i++) {
        if ($scope.UserList[i].onLine) {
           $scope.UserListOnLine[j] = $scope.UserList[i];
           j++;
        }
         
      }*/
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


    $scope.changeDiv = function(){ 

      var divusers= $('#cbp-spmenu-s1'),
     divchat= $('#cbp-spmenu-s2');
         divusers.hide();
         divchat.show();
}


    }]);
  





var AppEvent = angular.module('AppEvent',[]);

    AppEvent.controller('EventController',['$http','$log','$scope',function($http,$log,$scope){


      $scope.predicate = '-id';
      $scope.reverse = false;
      $scope.baseUrl ='$location.protocol()' + "://" + '$location.host';
      $scope.EventList =[];
      $scope.items =[];

    

        io.socket.get('/event/newEvent');

        $http.get($scope.baseUrl+'/event')
           .success(function(success_data){

              $scope.EventList = success_data;
              $log.info(success_data);
           });
     

    $http.get('/event/find').success(function(data) {
          for (var i =0 ; i < 3 ; i++) {
            data[i].index = i;
          }
          $scope.items = data;
        });
  
      $scope.eventTitle="";
      

      io.socket.on('event',function(obj){

        if(obj.verb === 'created'){
          $log.info(obj)
          $scope.EventList.push(obj.data); //add the new to the DOM
          $scope.$digest();
        }
 
      });

      $scope.AddEvent = function(){
        $log.info($scope.eventTitle);
        io.socket.post('/event/newEvent',{titleEvent: $scope.eventTitle , date : $scope.eventDate});
        $scope.eventTitle = "";
        $scope.eventDate="";
      };

    }]);




