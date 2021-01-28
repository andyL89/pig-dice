// business logic
function Game(player, isDone) {
  this.player = player;
  this.isDone = false;
}


function Player(name, userTotal, rollCount, currentRollTotal) {
  this.name = name;
  this.userTotal = userTotal;
  this.rollCount = rollCount;
  this.currentRollTotal = currentRollTotal;
}


function rollDice() {
  let randomNumber = (Math.random() * 6) + 1;
  return Math.trunc(randomNumber);
}

Player.prototype.playerRound = function(continueRolling) {
  let currentPoints = 0;
  let gameOver = false;

  while (gameOver) {
    if (rollDice() === 1) {
      currentPoints = 0;
      gameOver = true;
    } else {
      currentPoints = currentPoints + rollDice();
    }

    if (continueRolling === false) {
      gameOver = true;
    }

  }

  console.log(currentPoints)
  return currentPoints;
}

// User Interface Logic

$(document).ready(function () {
  let roundNumber = 1
  let turn = 0;
  let continueRound = true;
  let bankablePoints = 0;

  $("#start-btn").click(function () {
    let newPlayer = new Player("playerOne", 0, 0, 0)
    let newGame = new Game(newPlayer, false)

    $("#start-btn").hide();
    $("#dice-roll").show();
    $(".dice-container").show();

    function winnerMessage(num) {
      if(num >= 100) {
        $("#output").hide();
        $("#winner").show();
        $(".user-name").text(newPlayer.name);
      }
    }

    $("#stop-rolling").click(function() {
      continueRound = false;
      $("#stop-rolling").hide();
      $("#output").hide();
      $("#next-round").show();
    });

    $("#next-round").click(function() {
      $("#next-round").hide();
      $("#output").show();
      $("#roll-1").hide();
    });
  
    $("#dice-roll").click(function () {
      $("#roll-1").hide();
      $("button#next-round").hide();

      let diceNumber = rollDice();
      $("#dice-number").fadeOut(100);
      $("#dice-number").fadeIn(500);
      $("#dice-number").text(diceNumber);

      turn++;
  
      if (turn > 0) {
        $(".round").show();
      }

      if(diceNumber === 1) {
        continueRound = false;
        bankablePoints = 0;
        turn = 0;
        
        $("#output").hide();
        $("#next-round").show();
        $("#roll-1").show();
        
      } else {
        console.log(bankablePoints + " + " + diceNumber + " + 1 = " + (bankablePoints + diceNumber + 1))
        console.log("Bankable Points: " + bankablePoints);
        console.log("Dice Number Rolled: " + diceNumber);
        console.log("------------------------------------")

        bankablePoints += diceNumber; // currentPoints = currentPoints + diceNumber
        bankablePoints++;
      }

      if(continueRound === false) {
        roundNumber++;
        turn = 0;
        newPlayer.userTotal += bankablePoints;
        bankablePoints = 0;
        continueRound = true;
        winnerMessage(newPlayer.userTotal);
      }      

      $("#round-number").text(roundNumber);
      $("#times-rolled").text(turn)
      $("#score").text(bankablePoints);
      $(".total").text(newPlayer.userTotal);
    });



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
/*
What a player needs:
- User's total points
- User's current banked points
- How many times a user has rolled
*/