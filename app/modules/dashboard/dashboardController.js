
app.controller('DashboardCtrl',  function ($scope,$rootScope,$firebaseObject,$firebaseArray,$state) {
 
  const db = firebase.database().ref();
  const usersRef = db.child('users');
  // const followingList = usersRef('users').child($scope.user.uniqueId).child('following');
     $scope.users = $firebaseArray(usersRef);


// Now i need to get all friends 
//first i will get all following user's key in an array. 
//then i will make a loop and save the matching user in another array of object. 
var arr = [];





if($rootScope.uid == null){
  console.log('you are not logged In');
  $state.go('login');
}else{
     var userRef = db.child('users').child($rootScope.uid);
var f = userRef.child('following').on('value', function(snap){

     var val = snap.val();
     var values = Object.keys(val);
     console.log(values); // a simple array which contain uniques id of the users to be searched.
    console.log(values.length);
    for(var i=0;i<values.length;i++)
    usersRef.orderByKey().equalTo(values[i].toString()).on('value', function(s){
     s.forEach(function(item){
        console.log(item.val().uniqueId);
      arr.push(item.val());
     })
     
    })
  console.log(arr);
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
  hideIt = true;
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
userRef.child('friends').on('value', function(snap){
    let arrFriends = [];
    arrFriends.push(snap.key());
});
let uF = userRef.child('friends');
$scope.friendx = $firebaseArray(uF);


  
}

}


$scope.removeFriend = function(id){
 var r= usersRef.child($rootScope.uid).child('following').child(id);
 r.remove();
 $state.go('friends');
}




});