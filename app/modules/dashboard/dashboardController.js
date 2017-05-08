/*
All logic controller - DASHBOARD CONTROLLER 
Last updated: 17/04/2017
Author: atirxidigtal 

*/

// app.filter('clustering', function(){

//   return function(query){
  
//     var output = [];
//     var userRef = db.child('users').child($rootScope.uid);

//   usersRef.on('value', function(snap){
//   console.log(snap.val());
//    var Values = Object.keys(snap.val());
//       console.log(Values); // Contain uniqueId of all users
//       var total = Values.length;

//       var arr = [];
//       arr = $firebaseArray(usersRef);
   


//     return output;
//   });
// }
// });


app.controller('DashboardCtrl',function ($scope,$timeout,notificationService,sessionService,
  $rootScope,$firebaseObject,$firebaseArray,$state,localStorageService,authService) {
 
 var vm = this;
 vm.authService = authService;
 vm.sessionService = sessionService;
 vm.notification = notificationService;
 

 if(!sessionService.getSession('uid')){
      $state.go('login');
 }else{

  const db = firebase.database().ref();
  const usersRef = db.child('users');
  const userRef = usersRef.child($rootScope.uid);

  $scope.notifications = vm.notification.get();
   
  // const followingList = usersRef('users').child($scope.user.uniqueId).child('following');
     $scope.users = $firebaseArray(usersRef);

 
 $scope.openUser = function(x){
  usersRef.child(x.userId).on('value',function(snap){
      console.log(snap.val());
      $scope.selectedUser = snap.val();
      $state.go('friends.detail',{selectedUser:$scope.selectedUser});
  
  });

 }
// Now i need to get all friends 
//first i will get all following user's key in an array. 
//then i will make a loop and save the matching user in another array of object. 

var arr = [];
var usersArr = [];




  $scope.follow = function(x){
                  console.log(x.uniqueId);  
                  var d = new Date();
                  var fRef = userRef.child('following').child(x.uniqueId);
                  fRef.set({
                    email:x.email,
                    uniqueId:x.uniqueId,
                    followDate: d.toLocaleDateString(),
                    following:true
                  });
              // Hence Following user info added into current user following list.


              // Now to add current user info into to be followed user following list.
              var otherRef = usersRef.child(x.uniqueId).child('followers').child($scope.user.uniqueId);
              otherRef.set({
                email:$scope.user.email,
                uniqueId:$scope.user.uniqueId,
                followingSince: d.toLocaleDateString(),
                following:false
   });

  //  Now disable the button
  
}





$scope.getClickUser = function(x){
  $scope.c = x;
    $state.go('peopleDetails');

  console.log($scope.c);
}


let todoRef = userRef.child('todos');
$scope.todos = $firebaseArray(todoRef); /*GET Todos*/
$scope.addTodo = function(){
  todoRef.push().set({
    text:$scope.todo.text,
    checked:false
  });
  $scope.todo = {};

}

 // create a destroy function
  $scope.removeTodo = function(todo) {
    $scope.todos.$remove(todo); 
  };

  $scope.todoUpdate = function(x){
   todoRef.update();
  }

 } /*This is where sessions ends*/
});