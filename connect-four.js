/*
 * @goal        : Create a connect-four game - https://en.wikipedia.org/wiki/Connect_Four
 * @author      : jed[dot]lagunday[at]gmail[dot]com
 * @description : A "Connect Four" game in a classic 6 x 7 board or grid, built using JS, HTML table, a little bit of CSS, and a mixture of Luck. :)
 * @specs       : (a) Either player should be able to win by making 4 in a row in a vertical, horizontal or diagonal (either direction) pattern.
 *                (b) The winner should be immediately announced once there is one, and no moves can be taken after.
 *                (c) It should be possible to reach a draw state. A draw state is when there is no possible move left for either player and there is no winner.
 *                (d) It should not falsely and/or prematurely declare a player as a winner or a draw.
 */

"use strict";

(function () {

    var gameGrid = document.getElementById("connect-four-grid");
    //check for click activity in table cells
    if (gameGrid !== null) {
        for (var i = 0; i < gameGrid.rows.length; i++) {
            for (var j = 0; j < gameGrid.rows[i].cells.length; j++) {
                gameGrid.rows[i].cells[j].onclick = function () {
                    if (gameGrid != null) {
                        placeDisc(getDigitFromString(this.id), currentPlayer()); //imaginary disc is place here
                        nextPlayer(currentPlayer()); //pass the turn after placing imaginary disc
                    }
                };
            }
        }
    }

    var Player = function (letter) {
        this.player = letter;
        this.currentPlayer = false;

        this.assignAsCurrent = function () {
            return this.currentPlayer = true;
        };

        this.unassignAsCurrent = function () {
            return this.currentPlayer = false;
        };

        this.getCurrentPlayer = function () {
            return this.currentPlayer;
        }
    };

    var player1 = new Player("X");
    var player2 = new Player("O");

    player1.assignAsCurrent(); //assign player1 as the current from the start


    var currentPlayer = function () {
        if (player1.getCurrentPlayer()) {
            return player1.player;
        } else {
            return player2.player;
        }
    };

    var nextPlayer = function (player) {
        if (player1.getCurrentPlayer()) {
            player1.unassignAsCurrent();
            player2.assignAsCurrent();
        } else {
            player2.unassignAsCurrent();
            player1.assignAsCurrent();
        }
    };

    var getDigitFromString = function (cell) {
        return cell.replace(/[^\d.]/g, '');
    };

    var prevChar = function (letter) {
        return String.fromCharCode(letter.charCodeAt(0) - 1);
    };

    var placeDisc = function (col, player) {
        //check if the selected column has an empty slot
        var start = "f"; //let's start checking from the bottom
        for (var i = 0; i < 6; i++) {
            //if it have an empty slot, put the imaginary disc there
            if (document.getElementById("cell_"+start+col).innerHTML == "" || document.getElementById("cell_"+start+col).innerHTML == "undefined") {
                document.getElementById("cell_"+start+col).innerHTML = player;
                break;
            }
            start = prevChar(start);
        };

        //check if a placement is FTW
        var won = checkWinner(start, col, player);
        //console.log("won => " + won);
        if (won != "no") {
            //disable the grid / board when a winner is declared
            gameGrid = null;
            alert ("Player " + player + " wins!");
        }

        return;
    };

    var checkWinnerDiagonal = function (row, col, player) {
        return "no";
    };

    var checkWinnerVertical = function (col, player) {
        var series = 0;
        var currentRow = "f";
        for (var i = 1; i < 7; i++) {
            if (document.getElementById("cell_" + currentRow + col).innerHTML == player) {
                series += 1;
                if (series >= 4) {
                    return player;
                }
            } else {
                series = 0;
            }
            currentRow = prevChar(currentRow);
        }
        return "no";
    };

    var checkWinnerHorizontal = function (row, player) {
        var series = 0;
        for (var i = 1; i < 8; i++) {
            if (document.getElementById("cell_" + row + i).innerHTML == player) {
                series += 1;
                if (series >= 4) {
                    return player;
                }
            } else {
                series = 0;
            }
        }
        return "no";
    };

    var checkWinner = function (row, col, player) {
        var winner = checkWinnerHorizontal(row, player);
        if (winner != "no") {
            return winner;
        }
        winner = checkWinnerVertical(col, player);
        if (winner != "no") {
            return winner;
        }
        winner = checkWinnerDiagonal(row, col, player);
        if (winner != "no") {
            return winner;
        }

        //console.log("winner => ", winner);

        //check if it is a draw
        var isDraw = checkDraw();
        if (isDraw) {
            gameGrid = null;
            alert("Wow! It's a tie!");
        }
        return "no";
    };

    var checkDraw = function () {
        //returns boolean
        return false;
    };

})();