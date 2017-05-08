

app.service('notificationService', function ($rootScope,$firebaseArray) {

var db = firebase.database().ref().child('users').child($rootScope.uid);
var nRef = db.child('notifications');
 var data = $firebaseArray(nRef);


function getNotifications(){
                 return data ;
				
			}
function totalNotifications(){
	    return data.length;
}

function deleteNotification(notification){

}

function onUpdateNotify(){
    
    let f = db.child('followers');
    let followersData = $firebaseArray(f);


    // Now get all uid of followers 
   for(var i=0;i<followers.length;i++){
   	 followers[i] = followersData[i].$key;
   }

console.log('')

}

function removeNotification(x){
  userRef.child('notification').child(x).remove();
}
			return {
				get:getNotifications,
				total:totalNotifications,
				update:onUpdateNotify
				
			}
 

	
});




