$(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCHevoUyDNJs5Jo1jEzSeNTh8VrvKxTdMs",
    authDomain: "catadoption-94656.firebaseapp.com",
    databaseURL: "https://catadoption-94656.firebaseio.com",
    projectId: "catadoption-94656",
    storageBucket: "catadoption-94656.appspot.com",
    messagingSenderId: "448758551745"
  };
  firebase.initializeApp(config);

  // Firebase database reference
  var dbChatRoom = firebase.database().ref().child('message');
  var dbUser = firebase.database().ref().child('user');

  var photoURL;
  var $img = $('.img');
  
  // REGISTER DOM ELEMENTS
  const $messageField = $('#messageInput');
  const $messageList = $('#messages');
  const $email = $('#email');
  const $password = $('#password');
  const $btnSignIn = $('#btnSignIn');
  const $btnSignUp = $('#btnSignUp');
  const $btnSignOut = $('#btnSignOut');
  const $message = $('#messages');
  const $hovershadow = $('.hover-shadow');
  const $signInfo = $('#sign-info');
  const $btnSubmit = $('#btnSubmit');
  const $userName = $('#userName');
  const $occupation = $('#occupation').val();
  const $phone = $('#phone').val();
  const $address = $('#address').val();
  const $file = $('#file');
  const $profileName = $('#profile-name');
  const $profileEmail = $('#profile-email');
  const $profileAge = $('#profile-phone');
  const $profileOccupation = $('#profile-occupation');
  const $profileDescription = $('#profile-address');

  // Hovershadow
  $hovershadow.hover(
    function(){
      $(this).addClass("mdl-shadow--4dp");
    },
    function(){
      $(this).removeClass("mdl-shadow--4dp");
    }
  );
  
  var storageRef = firebase.storage().ref();

  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];

    var metadata = {
      'contentType': file.type
    };
    
    // Push to child path.
    // [START oncomplete]
    storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
      console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      console.log(snapshot.metadata);
      photoURL = snapshot.metadata.downloadURLs[0];
      console.log('File available at', photoURL);
    }).catch(function(error) {
      // [START onfailure]
      console.error('Upload failed:', error);
      // [END onfailure]
    });
    // [END oncomplete]
  }

  window.onload = function() {
    $file.change(handleFileSelect);
  }

  // Sign In
  $btnSignIn.click(function(e){
    const email = $email.val();
    const pass = $password.val();
    const auth = firebase.auth();
    // signIn
    const promise = auth.signInWithEmailAndPassword(email, pass);
    if(promise.emailVerified){
    	promise.catch(function(e){
      		console.log(e.message);
      		$signInfo.html(e.message);

    	});
    	promise.then(function(){
      		console.log('SignIn User');
    	});
    }
  });

  // SignUp
  $btnSignUp.click(function(e){
    const email = $email.val();
    const pass = $password.val();
    const auth = firebase.auth();
    // signUp
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(function(e){
      console.log(e.message);
      $signInfo.html(e.message);
    });
    promise.then(function(user){
    	
      console.log("SignUp user is "+user.email);
      const dbUserid = dbUser.child(user.uid);
      dbUserid.push({email:user.email});
    });
  });

  // Listening Login User
  firebase.auth().onAuthStateChanged(function(user){
    var user = firebase.auth().currentUser;
  	$message.html('');
    if(user) {
      user_profile(user);
      userProfile(user);
      console.log(user);
      if(user.emailVerified){
      	$('.btn').removeClass("active");
  	  	$('.btnProfile').addClass("active");
  	  }
  	  else{
  	  	$signInfo.html("Please verify your email before sign in.");
  	  	user.sendEmailVerification().then(function() {
  			// Email sent.
  			$signInfo.html("Verification email has been sent to " + user.email + " .");
		}, function(error) {
  			// An error happened.
  			$signInfo.html("Error. Please contact service center.");
		});
  	  }
      
      
      // Add a callback that is triggered for each chat message.
      dbChatRoom.limitToLast(10).on('child_added', function (snapshot) {
        //GET DATA
        var data = snapshot.val();
        var username = data.name || "anonymous";
        var message = data.text;

		
        //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
        var $messageElement = $("<li>");
        var $nameElement = $("<strong class='example-chat-username'></strong>");
        $nameElement.text(username);
        $messageElement.text(message).prepend($nameElement);
		
        //ADD MESSAGE
        $messageList.append($messageElement)

        //SCROLL TO BOTTOM OF MESSAGE LIST
        $messageList[0].scrollTop = $messageList[0].scrollHeight;
      });//child_added callback

      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: "+profile.providerId);
        console.log("  Provider-specific UID: "+profile.uid);
        console.log("  Name: "+profile.displayName);
        console.log("  Email: "+profile.email);
        console.log("  Age: "+profile.age);
        console.log("  Occupation: "+profile.occupation);
        console.log("  Description: "+profile.description);
        console.log("  Photo URL: "+profile.photoURL);
      });
    } else {
      console.log("not logged in");
      $profileName.html("N/A");
      $profileEmail.html('N/A');
      $profileAge.html("N/A");
      $profileOccupation.html("N/A");
      $profileDescription.html("N/A");
      $img.attr("src","");
      $userName.val('');
      $file.val('');
    }
  });

  // SignOut
  $btnSignOut.click(function(){
    firebase.auth().signOut();
    console.log('LogOut');
  });

    
  // LISTEN FOR KEYPRESS EVENT
  $messageField.keypress(function (e) {
    var user = firebase.auth().currentUser;
    if (e.keyCode == 13) {
      //FIELD VALUES
      var username = user.displayName;
      var message = $messageField.val();
      console.log(username);
      console.log(message);

      //SAVE DATA TO FIREBASE AND EMPTY FIELD
      dbChatRoom.push({name:username, text:message});
      $messageField.val('');
    }
  });
  
  function user_profile(user){
  	var username = user.displayName;
  	var email = user.email;
  	var photoUrl = user.photoURL;
      
    $profileName.html(username||user.email);
    $profileEmail.html(email);
    $img.attr("src", photoUrl);
  }
  
  function userProfile(user){
    var dbUserInfo = firebase.database().ref('user/' + user.uid);
    dbUserInfo.on("value", function(snapshot){
      var username = user.displayName;
      var email = user.email;
      var phone = snapshot.val().phone;
      var address = snapshot.val().address;
      
      $profileName.html(username);
      $profileEmail.html(email);
      $profilePhone.html(phone);
      $profileAddress.html(address);
      $userName.val(username || user.email);
    });
  }

	// Submit
  $btnSubmit.click(function(){
    var user = firebase.auth().currentUser;
    const $userName = $('#userName').val();
    const $age = $('#phone').val();
    const $description = $('#address').val();

    const promise = user.updateProfile({
      displayName: $userName,
      photoURL: photoURL
    });
    promise.then(function() {
      var dbUserid = dbUser.child(user.uid);
      user = firebase.auth().currentUser;
      if (user) {
        dbUserid.update({
          'username': userName,
          'phone': $age,
          'address': $description
        });
      console.log("Update successful.");
      userProfile(user);
      }
    });
  });
});
