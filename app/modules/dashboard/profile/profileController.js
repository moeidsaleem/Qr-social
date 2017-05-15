


app.controller('profileCtrl', function ($scope,$rootScope,$firebaseObject,notificationService) {




var storageRef = firebase.storage().ref();

  const db = firebase.database().ref();
 var userRef = db.child('users').child($rootScope.uid);
  // download the data into a local object
  var syncObject = $firebaseObject(userRef);
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($rootScope, "user");
               
           

$scope.onProfileUpdate = function(){

     notificationService.update();

}
 
 function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
  // Create file metadata including the content type
  var storageRef = firebase.storage().ref();
var metadata = {
  contentType: 'image/*',
  name:file.name
};



var uploadTask = storageRef.child('users/'+$rootScope.uid+'/profile.jpg').put(file, metadata).then(function(){
console.log('upload done!');

});

}







    
});