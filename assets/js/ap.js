var socketApp = angular.module('socketApp',[]);

    socketApp.controller('ChatController',['$http','$log','$scope',function($http,$log,$scope){


      $scope.predicate = '-id';
      $scope.reverse = false;
      $scope.baseUrl = '$location.protocol()' + "://" + '$location.host';
      $scope.chatList =[];


  // récupérer l'historique de chat jusqu à présent.

      $scope.getAllchat = function(){
        io.socket.get('/chat/addconv');

        $http.get($scope.baseUrl+'/chat')
           .success(function(success_data){

              $scope.chatList = success_data;
              $log.info(success_data);
           });
      };
      //

      $scope.getAllchat();
      $scope.chatUser =""
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
        io.socket.post('/chat/addconv/',{user:$scope.chatUser,message: $scope.chatMessage});
        $scope.chatMessage = "";
      };
    }]);