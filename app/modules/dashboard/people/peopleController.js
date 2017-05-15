


app.controller('peopleCtrl', function ($scope,$state,$firebaseArray,$rootScope) {


const db = firebase.database().ref();
const usersRef= db.child('users');
const userRef = usersRef.child($rootScope.uid);


// TypeAhead
  $scope.query = ''



  var _selected;

  $scope.selected = undefined;
 // $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  // Any function returning a promise object can be used to load values asynchronously
 

  $scope.ngModelOptionsSelected = function(value) {
    if (arguments.length) {
      _selected = value;
    } else {
      return _selected;
    }
  };


  $scope.modelOptions = {
    debounce: {
      default: 500,
      blur: 250
    },
    getterSetter: true
  };
$scope.statesWithFlags = $firebaseArray(usersRef);




$scope.friendRequest = function(x){
     userRef.child('reqSent').child(x.uniqueId).set({
        email:x.email,
        uniqueId:x.uniqueId,
        followDate: d.toLocaleDateString(),
        following:true
     });
var otherRef = usersRef.child(x.uniqueId).child('friendRequest').child($scope.user.uniqueId);
otherRef.set({
                email:$scope.user.email,
                uniqueId:$scope.user.uniqueId,
                followingSince: d.toLocaleDateString(),
                following:false
   });


}

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







//Now the ultimate Algorithm.
//to Cluster them according to our needs.
$scope.search = function(){
userRef.on('value', function(snap){
var jagg = [];

// Creating my Jagg
for(var i=0;i<4;i++){
switch(i){
  case 0:
  jagg[i] = snap.val().firstName;
  continue;
  case 1:
  jagg[i] = snap.val().university;
  continue;
  case 2:
  jagg[i] = snap.val().age;
  continue;
  case 3:
  jagg[i] = snap.val().city;
  break;
}
}


var r=0;
var arr = [];
// Creating usersJagg
usersRef.orderByChild('firstName').equalTo($scope.query).on('value', function(s){
  
   s.forEach(function(item){
   var  a = item.val().firstName;
   var b  = item.val().university;
   var c = item.val().age;
   var d = item.val().city;
   var e = {counter:0,profilePicUrl:item.val().profilePicUrl,university:item.val().university,username:item.val().username,name:item.val().name,uniqueId:item.val().uniqueId,email:item.val().email,phone:item.val().phone,country:item.val().country,aboutMe:item.val().aboutMe,company:item.val().company,zipCode:item.val().zipCode,lastName:item.val().lastName,firstName:item.val().firstName,education:item.val().education};

   arr[r] = [a,b,c,d,e];
   r++; /*increasing loop*/
   });
  // console.log(arr);

// MAJOR ALGORITHM
for( var i = 0;i<r;i++){ //i is users.
   for(var y = 0;y<4;y++){ // user total Filters.
   if(jagg[y] == arr[i][y]){
       var a = arr[i].length;
      arr[i][a-1].counter++;

   } 
}
} 
// Now sorting with order 
//console.log(arr);
// sort by value
arr.sort(function (a, b) {
  return  b[arr.length].counter -a[arr.length].counter ;
});
//console.log(arr);

$scope.users=[];
for(var i=0;i<arr.length;i++){
   var length = arr[i].length;
  $scope.users[i] = arr[i][4];
}
$scope.users.reverse();
console.log($scope.users);

return true;


   })
})


}

});