$(document).ready(function(){
  	$('.web').hide();
  	$("#home").show();
  	$('.nav_home').click(function(){
  		$('.nav').removeClass("active");
  		$('.web').hide();
  		$("#home").show();
  		$('.nav_home').addClass("active");
  	});
	$('.nav_AB').click(function(){
  		$('.nav').removeClass("active");
  		$('.web').hide();
  		$("#about_us").show();
  		$('.nav_AB').addClass("active");
  	});
  	$('.nav_QA').click(function(){
  		$('.nav').removeClass("active");
  		$('.web').hide();
  		$("#QA").show();
  		$('.nav_QA').addClass("active");
  	});
  	$('.nav_CU').click(function(){
  		$('.nav').removeClass("active");
  		$('.web').hide();
  		$("#contact_us").show();
  		$('.nav_CU').addClass("active");
  	});
  	$('.nav_cats').click(function(){
  		$('.nav').removeClass("active");
  		$('.web').hide();
  		$("#cats_main").show();
  		$('.nav_cats').addClass("active");
  	});
  	$('.btn_sign_up').click(function(){
  		$('.nav').removeClass("active");
  		$('.web').hide();
  		$("#SignUp").show();
  	});
  	$('.btn_sign_in').click(function(){
  		$('.nav').removeClass("active");
  		$('.web').hide();
  		$("#SignIn").show();
  	});

  
  });
  $(document).ready(function() {
	// when a nav parent is clicked
	$(".side_nav .menu").click(function() {
    var $ul = $(this).parent(".side_nav").children("ul");
		// if section is already active and clicked again
		if ( $ul.hasClass("active") ) {
			$ul.removeClass("active");
			$ul.slideUp();
		} else {
		// if section is made active
			$ul.addClass("active");
			$ul.slideDown();
			return false;
		}
	}); // end click event handler
});
  function SignOut(){
    firebase.auth().signOut();
    console.log('LogOut');
    $('.page').hide();
    $("#home").show();
    $message.html('');
    return true;
  }
