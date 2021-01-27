// business logic
function Game(player, isDone) {
  this.player = player;
  this.isDone = false;
}

/*
What a player needs:
- User's total points
- User's current banked points
- How many times a user has rolled
*/

function Player (name, userTotal, rollCount, currentRollTotal) {
  this.name = name;
  this.userTotal = 0;
  this.rollCount = 0;
  this.currentRollTotal = 0;
}

function rollDice () {
  let randomNumber = (Math.random() * 6) + 1;
  return Math.trunc(randomNumber);
}

function playerRound (continueRolling) {
  let currentPoints = 0;
  let gameOver = false;

  while(gameOver) {
    if(rollDice() === 1) {
      currentPoints = 0;
      gameOver = true;
    } else {
      currentPoints = currentPoints + rollDice();
    }

    if(continueRolling === false) {
      gameOver = true;
    }

  }

  return currentPoints;
}



// User Interface Logic

$(document).ready(function() {
  let turn = 0;

  $("#start-btn").click(function() {
    let newPlayer = new Player("playerOne", 0, 0, 0)
    let newGame = new Game(newPlayer, false)

    $("#start-btn").hide();
    $("#dice-roll").show();
    $(".dice-container").show()

  });

  $("#dice-roll").click(function() {
    let tempNum = rollDice();
    $("#dice-number").fadeOut(100);
    $("#dice-number").fadeIn(500);
    $("#dice-number").text(tempNum);
    turn++;

    if(turn > 0) {
      $(".round").show();
    }

    // $("#score").text(currentPoints);
  });

});


// Notes:
// - 2 or more players
// - 1 die
// - First player to 100 pts
// - avoid 1
// - roll 2 - 6
// - can roll infinite but IF rolled 1, all CURRENT cumunlated points  = 0 during that turn/round
// - IF stopped rolling, then points banked (aka that round)
// - increment by 1 for every roll for +1 point to current