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

    var player1 = "X";
    var player2 = "O";
    var currentCol;
    var gameGrid = document.getElementById("connect-four-grid");    

    //check for click activity in table cells
    if (gameGrid !== null) {
        for (var i = 0; i < gameGrid.rows.length; i++) {
            for (var j = 0; j < gameGrid.rows[i].cells.length; j++) {
                gameGrid.rows[i].cells[j].onclick = function () {
                    console.log(getDigitFromString(this.id));
                };
            }
        }
    }

    var getDigitFromString = function (cell) {
        return cell.replace(/[^\d.]/g, '');
    };

    var checkWinner = function () {

    };

    var placeDisc = function (col, player) {
    };

})();