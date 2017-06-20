var clicked=true;
$(document).ready(function(){
	$(".questionOne").click(function(){
		if(clicked){
			clicked=false;
			$(".answerOne").slideDown();
		}
		else{
			clicked=true;
			$(".answerOne").slideUp();
		}
	});
});
	
var click=true;
$(document).ready(function(){
	$(".questionTwo").click(function(){
		if(click){
			click=false;
			$(".answerTwo").slideDown();
		}
		else{
			click=true;
			$(".answerTwo").slideUp();
		}
	});
});
		
var pressed=true;
$(document).ready(function(){
	$(".questionThree").click(function(){
		if(pressed){
			pressed=false;
			$(".answerThree").slideDown();
		}
		else{
			pressed=true;
			$(".answerThree").slideUp();
		}
	});
});
		
var press=true;
$(document).ready(function(){
	$(".questionFour").click(function(){
		if(press){
			press=false;
			$(".answerFour").slideDown();
		}
		else{
			press=true;
			$(".answerFour").slideUp();
		}
	});
});