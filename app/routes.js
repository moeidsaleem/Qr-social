


app.config(function ($locationProvider,$stateProvider,$urlRouterProvider,localStorageServiceProvider) {


// Setting local storage for sessions and storage.
localStorageServiceProvider
    .setStorageType('sessionStorage')
    .setNotify(true, true);

   

$stateProvider
     .state('login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'app/modules/login/login.html',
        controllerAs: 'vm',

      
      })
     .state('signup', {
        url: '/signup',
        controller: 'LoginCtrl',
        templateUrl: 'app/modules/login/signup.html',
        controllerAs: 'vm',

      
      })
      .state('dashboard', {
        name:'dashboard',
      controller:'DashboardCtrl',
        url: '/dashboard',
        views:{
          header:{
            templateUrl:'app/modules/dashboard/header.html',

          },
          sidebar:{
            templateUrl:'app/modules/dashboard/sidebar.html'
          },
          content:{
            templateUrl:'app/modules/dashboard/dashboard.html'
          },
          footer:{
            templateUrl:'app/modules/extras/footer.html'
          }
        }
      })
     .state('profile',{
       parent:'dashboard',
       url:'/profile',
      controller:'DashboardCtrl',
       templateUrl:'app/modules/dashboard/profile/profile.html'
     })
       .state('home',{
       parent:'dashboard',
       url:'/dashboard/home',
        controller:'DashboardCtrl',
       templateUrl:'app/modules/dashboard/home.html'
     })
      .state('people.search',{
       parent:'dashboard',
       url:'/dashboard/search',
        controller:'peopleCtrl',
       templateUrl:'app/modules/dashboard/people/people.search.html'
     })
         .state('people',{
       parent:'dashboard',
       url:'/dashboard/people/',
        controller:'peopleCtrl',
       templateUrl:'app/modules/dashboard/people/people.html'
     })
       .state('friends',{
       parent:'dashboard',
       url:'/dashboard/friends',
        controller:'DashboardCtrl',
       templateUrl:'app/modules/dashboard/friend/friends.html'
     })
        .state('friends.detail',{
       parent:'dashboard',
       url:'dashboard/friends/detail',
       params:{selectedUser: null,Name:null},
        controller:'DashboardCtrl',
       templateUrl:'app/modules/dashboard/friend/friend.detail.html'
     })
       .state('meeting', {
        parent:'dashboard',
        url:'dashboard/meeting',
        controller: 'meetingCtrl',
        templateUrl: 'app/modules/dashboard/meeting/meeting.html',
        controllerAs: 'vm'
      })
      .state('sidebar', {
        parent:'dashboard',
        controller: 'DashboardController',
        templateUrl: 'app/modules/extras/sidebar.html',
        controllerAs: 'vm'
      });
     
        

     $urlRouterProvider.otherwise('/login');
    //  // Remove the ! from the hash so that
    // // auth0.js can properly parse it
    $locationProvider.hashPrefix(''); 

    
});