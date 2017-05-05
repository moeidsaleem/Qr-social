

let app = angular.module('myApp', [
	'ngRoute',
	'firebase',
	'ui.router',
	'monospaced.qrcode',
	'LocalStorageModule']);



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


