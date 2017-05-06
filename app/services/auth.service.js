

app.service('authService', function ($rootScope,$firebaseAuth,sessionService,$state) {

 var auth = $firebaseAuth();

  const db   = firebase.database().ref();
 const users = db.child('users');
 const fireDb = db.child('fireData'); 
 const date = new Date();
			


function login(email, pass){
				auth.$signInWithEmailAndPassword(email, pass).then(function(firebaseUser){
	         	console.log("Signed in as:", firebaseUser.uid);
				 $rootScope.uid = firebaseUser.uid;
			
				 $state.go('dashboard');
				 let lastLoginRef = users.child(firebaseUser.uid).child('last_login');
				//  users.child($rootScope.uid).child('last_login').set(date.toLocaleTimeString);
				// we can also chain the two calls together
				lastLoginRef.push().set({
				timing: date.toLocaleTimeString(),
				CurrentDate:date.toLocaleDateString()
				});

				// Now making a session with localStorage - When login run a session
				sessionService.startSession('email', email);
				sessionService.startSession('password', pass );
				sessionService.startSession('uid', firebaseUser.uid);

	            	}).catch(function(error) {
	                	console.error("Authentication failed:", error);
               });
			}

			  // logout 
 function logout(){
	   console.log('you have logged out');
	   // $rootScope.uid = null;
	   // $rootScope.email = '';
	   // $rootScope.password = '';
	   // $rootScope.authenticator = !$rootScope.authenticator;
	   $state.go('login');

	   // end All sessions 
	   sessionService.endAllSessions(); /* data is cleared. */
   }
			



			 //   THIS IS SIGN UP 
			function signup(email, pass){
             console.log('you signup');
			 auth.$createUserWithEmailAndPassword(email, pass).then(
    		function(firebaseUser){
            // logic after sign up 
            console.log( "user signed up with following email" + firebaseUser.email + firebaseUser.uid);
                $rootScope.uid = firebaseUser.uid;
                
                   users.child($rootScope.uid).set({  /*create new user*/
                password:$rootScope.password,
                email:$rootScope.email,
                uniqueId:$rootScope.uid
               });
				// Now making a session with localStorage - When login run a session
				sessionService.startSession('email', email);
				sessionService.startSession('password', pass );
				sessionService.startSession('uid', firebaseUser.uid);
				$state.go('dashboard');



    	}).catch(function(error){
    		// error handling
    		$rootScope.authErr = "Error : "+error;
    		
    	});

			}

  let afterSignUp = function(){
            
       users.child($rootScope.uid).set({  /*create new user*/
                password:$rootScope.password,
                email:$rootScope.email,
                uniqueId:$rootScope.uid
               });
  }


			return {
				login:login,
				logout:logout,
				signup:signup
			}
 

	
});




