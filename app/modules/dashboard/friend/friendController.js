


app.controller('friendCtrl', function ($scope,$rootScope,$state,$stateParams,$firebaseArray) {

const db = firebase.database().ref();
  const usersRef = db.child('users');

  // const followingList = usersRef('users').child($scope.user.uniqueId).child('following');
  
   //then i will make a loop and save the matching user in another array of object. 

var arr = [];
var usersArr = [];

var userRef = db.child('users').child($rootScope.uid);
 const reqRef = userRef.child('freindRequest');
  const friendRequest = $firebaseArray(reqRef);

var f = userRef.child('following').on('value', function(snap){

     var val = snap.val();
     var values = Object.keys(val);
   //  console.log(values); // Contain Friends
  //  console.log(values.length);  //total no of Friends
    for(var i=0;i<values.length;i++)
    usersRef.orderByKey().equalTo(values[i].toString()).on('value', function(s){
     s.forEach(function(item){
       // console.log(item.val().uniqueId);
      arr.push(item.val());

     })
     
    })
  console.log(arr);
  
    usersRef.on('value', function(snap){
     var Values = Object.keys(snap.val());
    //  console.log(Values); // Contain uniqueId of all users
     // console.log(Values.length);  /*All users in database*/
     for(var y = 0; y<Values.length; y++){
      
     }
      
     
  })
  $scope.friends = arr;
  //  usersRef.orderByKey().equalTo(values).on('child_added', function(s){
  //    console.log(s);
  //  })


});


// FOLLOW
  $scope.follow = function(x){
      $state.go('friends');

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





	$rootScope.selectedUser =$stateParams.selectedUser || null;


$scope.removeFriend = function(id){
 var r= usersRef.child($rootScope.uid).child('following').child(id);
 r.remove();
 $state.go('friends');
}


    
});