

let app = angular.module('myApp', [
	'ngRoute',
	'firebase',
	'ui.router',
	'monospaced.qrcode',
	'LocalStorageModule']);


app.service('sessionService', function ($rootScope,$state,localStorageService) {

this.startSession = function(key,val){
    return localStorageService.set(key,val);
}
this.getSession = function(key) {
   return localStorageService.get(key);
  }
  //..
this.endSession = function(key){
   return localStorageService.remove(key);
  }
this.endAllSessions = function(){
	   return localStorageService.clearAll();
}

this.checkSession = function(){
			if(this.getSession('uid') && this.getSession('email') && this.getSession('password')){
				$rootScope.email = this.getSession('email');
				$rootScope.password = this.getSession('password');
				$rootScope.uid = this.getSession('uid'); 
				$state.go('dashboard');
				return true;
            }else{
                   return false;
            }


            // console.log(endAllSessions());
	console.log(this.getSession('email'));
	console.log(this.getSession('password'));
	console.log(this.getSession('uid'));

	}
	// $rootScope.checkSession();


	
});


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
			


    //SignUp with Social 
    $rootScope.signinSocial = function(provider){
    	console.log('signyup with facebook');
        
			$rootScope.auth.signInWithPopup(provider)
			.then(function(firebaseUser){
	         	console.log("Signed in as:", firebaseUser.uid);
				 $rootScope.uid = firebaseUser.uid;
			
				 $state.go('dashboard');
				 $rootScope.test = !$rootScope.test;
				 let lastLoginRef = users.child(firebaseUser.uid).child('last_login');
				//  users.child($rootScope.uid).child('last_login').set(date.toLocaleTimeString);
				// we can also chain the two calls together
				lastLoginRef.push().set({
				timing: date.toLocaleTimeString(),
				CurrentDate:date.toLocaleDateString()
				});

<<<<<<< HEAD

	            	}).catch(function(error) {
	                	console.error("Authentication failed:", error);
               });
		
    }
        //   THIS IS SIGN UP 
			$rootScope.signup = function(){
=======
			 //   THIS IS SIGN UP 
			function signup(email, pass){
>>>>>>> e1140adbc12a00d8b920f5b149df03884bcabccd
             console.log('you signup');
			 $rootScope.auth.$createUserWithEmailAndPassword(email, pass).then(
    		function(firebaseUser){
            // logic after sign up 
            console.log( "user signed up with following email" + firebaseUser.email + firebaseUser.uid);
                $rootScope.uid = firebaseUser.uid;
                afterSignUp(); /* handling database creation*/

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
				logout:logout
			}


	
});

app.run( function ($rootScope,$state,sessionService,authService,$stateParams) {
 

$rootScope.go = function(route){
   return $state.go('route');
}
 $rootScope.click = function(){
  authService.logout();
 }
	//  $rootScope.$state = $state;
	// $rootScope.$stateParams = $stateParams;
	// $rootScope.email = '';
	// $rootScope.pass = '';
     sessionService.checkSession();

        
	
 const db   = firebase.database().ref();
 const users = db.child('users');
 const fireDb = db.child('fireData'); 
 const date = new Date();
			

	   // logout 
   $rootScope.logout = function(){
	   console.log('you have logged out');
	   $rootScope.uid = null;
	   $rootScope.email = '';
	   $rootScope.password = '';
	   $rootScope.authenticator = !$rootScope.authenticator;
	   $state.go('login');

	   // end All sessions 
	   endAllSessions(); /* data is cleared. */
   }

  

    //SignUp with Social 
    $rootScope.signinSocial = function(provider){
    	console.log('signyup with facebook');
        
			$rootScope.auth.signInWithPopup(provider)
			.then(function(firebaseUser){
	         	console.log("Signed in as:", firebaseUser.uid);
				 $rootScope.uid = firebaseUser.uid;
			
				 $state.go('dashboard');
				 $rootScope.authenticator = !$rootScope.authenticator;
				 let lastLoginRef = users.child(firebaseUser.uid).child('last_login');
				//  users.child($rootScope.uid).child('last_login').set(date.toLocaleTimeString);
				// we can also chain the two calls together
				lastLoginRef.push().set({
				timing: date.toLocaleTimeString(),
				CurrentDate:date.toLocaleDateString()
				});


	            	}).catch(function(error) {
	                	console.error("Authentication failed:", error);
               });
		
    }
       
		


$rootScope.loginUser = function(){
		$rootScope.login($rootScope.email , $rootScope.password);
}


	

});


