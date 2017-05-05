

app.filter('algo', function(){

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
         jagg[i][y+1] = {counter:0};
         break;
             }
        //now jagg is ready
        } // y loop ends
      } // i loop ends

console.log(jagg);


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
   
      return arr;
     }

})