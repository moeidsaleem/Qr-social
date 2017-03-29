

let app = angular.module('myApp', [
	'ngRoute',
	'firebase',
	'ui.router',
	'monospaced.qrcode']);


app.run( function ($rootScope,$state,$firebaseAuth,$stateParams) {
     
	 $rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
        
	
 const db   = firebase.database().ref();
 const users = db.child('users');
 const fireDb = db.child('fireData'); 
 const date = new Date();


		    $rootScope.auth = $firebaseAuth();

		$rootScope.test = false;
		$rootScope.testFunc= function(){

			$rootScope.login = function(){
				console.log($rootScope.email + $rootScope.password);
				$rootScope.auth.$signInWithEmailAndPassword($rootScope.email , $rootScope.password).then(function(firebaseUser){
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


	            	}).catch(function(error) {
	                	console.error("Authentication failed:", error);
               });
			}

   // logout 
   $rootScope.logout = function(){
	   console.log('you have logged out');
	   $rootScope.uid = null;
	   $rootScope.email = '';
	   $rootScope.password = '';
	   $rootScope.test = !$rootScope.test;

	   $state.go('login');
   }

  


        //   THIS IS SIGN UP 
			$rootScope.signup = function(){
             console.log('you signup');
			 $rootScope.auth.$createUserWithEmailAndPassword($rootScope.email, $rootScope.password).then(
    		function(firebaseUser){
            // logic after sign up 
            console.log( "user signed up with following email" + firebaseUser.email + firebaseUser.uid);
                $rootScope.uid = firebaseUser.uid;
                afterSignUp();
				$state.go('dashboard');
				$rootScope.test = !$rootScope.test;



    	}).catch(function(error){
    		// error handling
    		$rootScope.authErr = "Error : "+error;
    		
    	});
    

			}
			

		}

	

  let afterSignUp = function(){
             /*
                parent.child(identifier).set({
                    key:value,
                    key:value,
                    key:value,
                    key:value
                })
             */
       users.child($rootScope.uid).set({  /*create new user*/
                password:$rootScope.password,
                email:$rootScope.email,
                uniqueId:$rootScope.uid
               });
        //   $rootScope.val = $scope.email;
        //    $rootScope.hideX = true;
        //    $rootScope.showX = true;
        //    if($rootScope.status === 'valid'){
        //       $state.go('adminControl');
        // } else {
        //   $scope.result ='error , Unable to access admin panel';
        // }
 


  }
});


