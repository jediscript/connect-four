/*
 * @goal        : Create a connect-four game - https://en.wikipedia.org/wiki/Connect_Four
 * @author      : jed[dot]lagunday[at]gmail[dot]com
 * @description : A "Connect Four" game in a classic 6 x 7 board or grid, built using JS.
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
                    placeDisc(getDigitFromString(this.id), currentPlayer()); //disc is place here
                    nextPlayer(currentPlayer()); //pass the turn after placing disc
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
    }

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
                return;
            }
            start = prevChar(start);
        };
    };

    var checkWinner = function () {
    };

})();