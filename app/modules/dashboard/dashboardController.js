/*
All logic controller - DASHBOARD CONTROLLER 
Last updated: 17/04/2017
Author: atirxidigtal 

*/

app.filter('algo', function($rootScope){
  var db = firebase.database().ref();
  var userDb = db.child($rootScope.uid);
 var data = $firebaseArray(db); //got all the user
  var user = $firebaseArray(userDb);
  var userObj = $firebaseObject(userDb);
  var userx = [];
  var arr = [];
     var jagg = [[]]; 

 return function(query){
  
    for(var i=0; i<data.length;i++){
      for(var y = 0;y<4;y++){
     switch(y){
       case 0:
         jagg[i][y] = data[i].firstName;
         break;
       case 1:
         jagg[i][y] = data[i].university;
         break;
       case 2:
         jagg[i][y] = data[i].city;
         break;
       case 3:
         jagg[i][y] = data[i].company;
         break;
             }
        
        //now jagg is ready
        
        } // y loop ends
      } // i loop ends
   
   
  for(var b = 0;b<user.length;b++){
   switch(b){
       case 0:
         userx[b] = userObj.firstName;
         break;
       case 1:
         userx[b] = userObj.university;
         break;
       case 2:
         userx[b] = userObj.city;
         break;
       case 3:
        userx[b] = userObj.company;
         break;
             }
  }  // now user is array is ready
   
   
   //applying our algorithm
   
   for(var i =0; i<data.length;i++){
    for(var y =0; y<4;y++){
     if(jagg[i][0] = query){
           
       if(jagg[i][y] = userx[y]){
         arr.push(jagg[i]);
       
       } else{
       continue;
       }
     
   }
    }
      return arr;
     
}
});

app.controller('DashboardCtrl',  function ($scope,sessionService,$rootScope,$firebaseObject,$firebaseArray,$state,localStorageService,authService) {


 var vm = this;
 vm.authService = authService;
 vm.sessionService = sessionService;




 if(!sessionService.getSession('uid')){
      $state.go('login');
 }else{

  const db = firebase.database().ref();
  const usersRef = db.child('users');
  // const followingList = usersRef('users').child($scope.user.uniqueId).child('following');
  
     $scope.users = $firebaseArray(usersRef);


// Now i need to get all friends 
//first i will get all following user's key in an array. 
//then i will make a loop and save the matching user in another array of object. 


var arr = [];
var usersArr = [];
if($rootScope.uid == null){
  console.log('you are not logged In');
  $state.go('login');
}else{
var arr = [];
var usersArr = [];

var userRef = db.child('users').child($rootScope.uid);
var f = userRef.child('following').on('value', function(snap){

     var val = snap.val();
     var values = Object.keys(val);
     console.log(values); // Contain Friends
    console.log(values.length);  //total no of Friends
    for(var i=0;i<values.length;i++)
    usersRef.orderByKey().equalTo(values[i].toString()).on('value', function(s){
     s.forEach(function(item){
        console.log(item.val().uniqueId);
      arr.push(item.val());
      
      
     })
     
    })
  console.log(arr);
  
    usersRef.on('value', function(snap){
     var Values = Object.keys(snap.val());
      console.log(Values); // Contain uniqueId of all users
     console.log(Values.length);  /*All users in database*/
     for(var y = 0; y<Values.length; y++){
      
     }
      
     
  })
  $scope.friends = arr;
  //  usersRef.orderByKey().equalTo(values).on('child_added', function(s){
  //    console.log(s);
  //  })


});


  // download the data into a local object
  var syncObject = $firebaseObject(userRef);
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($scope, "user");





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

$scope.onProfileUpdate = function(){
  // Generate a notification to all the freinds 
  userRef.child('name').set($scope.user.firstName + ' ' +$scope.user.lastName)
  console.log('profile Updated');

  //  Now to notify other friends that profile has been updated. 
  // Get Those users unique key and add them in an array 
  // For every value of array, generate notification.
userRef.child('followers').on('value', function(snap){
    let arrFriends = [];
    arrFriends.push(snap.key());
    usersRef.child(arrFriends[i]).child('notification').push().set({
      notify:snap.val().firstName + ' ' + snap.val().lastName + 'updated profile'
    });
});



}

$scope.removeNotification = function(x){
  userRef.child('notification').child(x).remove();
}




$scope.removeFriend = function(id){
 var r= usersRef.child($rootScope.uid).child('following').child(id);
 r.remove();
 $state.go('friends');
}


 }
 
 $scope.search = function(query){
     usersRef.on('value', function(snap){
         var Values = Object.keys(snap.val());
         var total = Values.length;
         
         var arr = [];
         var farr = [];
         var counter = 0;
         var checkFilter = ['education', 'age', '']
         arr = $firebaseArray(usersRef);
         for(var i=0; i<checkFilter.length; i++){
             
             for(var y = 0; y<total;y++){
                 if(query == arr[y].firstName || query== arr[y].lastName){
                     var str =  arr[y].firstName || arr[y].lastName;
                     
                 }
             }
         }
         
     })
 }


});
