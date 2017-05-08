


app.controller('friendCtrl', function ($scope,$rootScope,$state,$stateParams) {

const db = firebase.database().ref();
  const usersRef = db.child('users');
  // const followingList = usersRef('users').child($scope.user.uniqueId).child('following');
  
   //then i will make a loop and save the matching user in another array of object. 

var arr = [];
var usersArr = [];
 var userRef = db.child('users').child($rootScope.uid);
 userRef.child('following').on('value', function(snap){
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
 

});



	$rootScope.selectedUser =$stateParams.selectedUser || null;


$scope.removeFriend = function(id){
 var r= usersRef.child($rootScope.uid).child('following').child(id);
 r.remove();
 $state.go('friends');
}


    
});