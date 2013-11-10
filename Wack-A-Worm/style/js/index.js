//Cached Divs
var startButton;
var worm;
var timeDiv;
var scoreDiv;
//Global Variables
var holes;
var time;
var clock;
var score;
var debug = true;

$(document).ready(function(){
	//div caching
	startButton = $("#startGame");
	worm = $("#mole");
	worm.hide();
	timeDiv = $("#time");
	timeDiv.html("0 seconds");
	scoreDiv = $("#score");
	scoreDiv.html("0 hits!");
	holes = [];

	//top row
	holes[0] = {"x":"41px", "y":"60px"};
	holes[1] = {"x":"41px", "y":"186px"};
	holes[2] = {"x":"41px", "y":"308px"};

	//middle row
	holes[3] = {"x":"165px", "y":"60px"};
	holes[4] = {"x":"165px", "y":"186px"};
	holes[5] = {"x":"165px", "y":"308px"};

	//bottom row
	holes[6] = {"x":"291px", "y":"60px"};
	holes[7] = {"x":"291px", "y":"186px"};
	holes[8] = {"x":"291px", "y":"308px"};

	/*
	 *	event for starting the match
	 */
	startButton.click(function(){
		if(!startButton.is(":disabled")){
			//Reset score, clock, time
			score = 0;
			time = 60;
			clock = setInterval(gameTick,1000);
			scoreDiv.html("0 hits!");
			
			worm.click(function(){							//set click event
				$(this).hide();
				score = score + 1;
				scoreDiv.html(score + " hits!");
				if(debug){
					console.log("Score incremented to " + score);
				}
			});			

			//Disable button
			startButton.attr('disabled','disabled');
			if(debug){
				console.log("StartButton: " + startButton.attr("disabled"));
			}
		}
	});
	
	/*
	 *	function that runs every second when the game is going	
	 */
	function gameTick(){
		if(time > 1 && time > 0){
			time = time - 1;
			timeDiv.html(time + " seconds");
			var temp = holes[Math.floor((Math.random()*9))];	//Get new hole
			
			worm.hide();
			worm.css({top: (temp.x), left: (temp.y) });			//set new position
			worm.fadeIn(200);									//show worm

			if(debug){
				console.log("x: " + temp.x + " y: " + temp.y);
				console.log("worm top: " + worm.css("top") + " worm left: " + worm.css("left"));
			}
		} else {
			startButton.removeAttr('disabled'); //Enable button
			timeDiv.html("0 seconds");			//clear time
			worm.unbind("click");
			worm.hide();
			clearInterval(clock);				//clear interval
		}
	}
});