var buttonNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var gamePattern = "";
var userClickedPattern = "";

var started = false;
var level = 0;
var stage;
$(document).click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    $("#comment").removeClass("hide");
    $("button").removeClass("hide");
    $("#display-title").removeClass("hide");
    nextSequence();
    started = true;
  }
});

$("button").click(function() {

  var userChosenNumber = $("#comment").val();

  userClickedPattern = "" + userChosenNumber;
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length != gamePattern.length) {
      playSound("wrong");
      $("body").addClass("game-over");
      stage=level;
      $("#comment").val('');
      setTimeout(function() {
        $("body").removeClass("game-over");
        $("#comment").addClass("hide");
        $("button").addClass("hide");
        if(stage>=10){
            $("#level-title").text("Excellent, Click to Restart");
        }
        if(stage<=3){
            $("#level-title").text("Start eating almonds, Click to Restart");
        }
        else{  $("#level-title").text("Game Over, Click to Restart");}

        $("#display-title").addClass("hide");
        startOver();
      }, 200);


    }
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 200);
      $("#comment").val('');
    }

  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    stage=level;
    $("#comment").val('');
    setTimeout(function() {
      $("body").removeClass("game-over");
      $("#comment").addClass("hide");
      $("button").addClass("hide");
      $("#display-title").addClass("hide");
      if(stage>=10){
          $("#level-title").text("Excellent, Click to Restart");
      }
      if(stage<=3){
          $("#level-title").text("Start eating almonds, Click to Restart");
      }
      else{  $("#level-title").text("Game Over, Click to Restart");}


      startOver();
    }, 200);


  }
}


function nextSequence() {
  userClickedPattern = "";
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 10);
  var randomChosenNumber = buttonNumbers[randomNumber];
  gamePattern = gamePattern + randomChosenNumber;
   $("#change-title").fadeIn();
  $("#change-title").text(gamePattern);
  animatePress();
}

function animatePress() {
  $("#change-title").removeClass("hide");
  setTimeout(function() {
    $("#change-title").fadeOut();
  }, 1400);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;

}
