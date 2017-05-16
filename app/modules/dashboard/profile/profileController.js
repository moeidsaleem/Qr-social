


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
 

  // Get a reference to the storage service, which is used to create references in your storage bucket
  var uploader = document.getElementById('uploader');
  var fileButton = document.getElementById('fileButton');

//listen for file selection
fileButton.addEventListener('change', function(e){
  //get file
  var file = e.target.files[0];


  //create a storage ref
 var storageRef =  firebase.storage().ref('users/'+$rootScope.user.username+'/'+file.name);

//upload a file
var task = storageRef.put(file);


//update progres bar 
task.on('state_changed',
  function progress(snapshot){
    var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    uploader.value = percentage;


}, function error(err){

}, function complete(){
  userRef.child('photo').set(task.snapshot.downloadURL);
  var downloadURL = task.snapshot.downloadURL;
  
 

})


});



});