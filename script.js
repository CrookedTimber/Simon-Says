var btnColor = ["green", "red", "yellow", "blue"];
var level;
var sequence;
var userSequence = [];
var allowkUserClicks = false;
var gameStart = false;

const delay = async (ms = 1000) =>
  new Promise(resolve => setTimeout(resolve, ms));

$("h1").on("click", function() {
  if (gameStart === false){
    level = 0;
    sequence = [];
    gameStart = true;
    nextLevel();

  }



});

$(".btn").click(function(event) {

  if (allowkUserClicks) {

    btnIx = btnColor.indexOf($(event.target).attr("id"));
    pressButton(btnIx);
    userSequence.push(btnIx);

    if (userSequence[userSequence.length - 1] === sequence[userSequence.length - 1]) {
      if (userSequence.length === sequence.length) {

        setTimeout(function() {
          nextLevel();
        }, 1200);
      }
    } else {

      gameStart = false;
      var buttonSound = new Audio('./sounds/wrong.mp3');
      buttonSound.play();

      $("body").addClass("game-over");
      $("#level-title").html("Game Over!");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 500);
      setTimeout(function() {
        $("#level-title").html("🖱️ Click Here to Try Again!");

      }, 1000);

    }

  }

});

async function nextLevel() {
  level++;
  $("h1").text("Level " + level);
  userSequence.length = 0;
  allowkUserClicks = false;

  await delay(200);


  sequence.push(Math.floor(Math.random() * 4));
  showSequence(sequence);

}

async function showSequence(pattern) {
  for (var i = 0; i < pattern.length; i++) {

    pressButton(pattern[i]);

    if (i === pattern.length ) {
      await delay(200)

    }
    else {


    await delay(1000)
    }
  }
    allowkUserClicks = true;

}

function pressButton(btnNumber) {
  var btnId = btnColor[btnNumber];
  $("#" + btnId).addClass("pressed");
  var buttonSound = new Audio('./sounds/' + btnId + '.mp3');
  buttonSound.play();
  setTimeout(function() {
      $("#" + btnId).removeClass("pressed");
    },
    300);
}