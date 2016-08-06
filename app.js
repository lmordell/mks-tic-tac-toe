$(function() {

    //Reset button
    $('#reset').click(() => {
        gameBoard = originalGameBoard;
        $('.flex-item').empty();
        game.turn = 1;
        game.winner = '';
        console.log('Reset button clicked');
    });

    //Board Pieces
    $('#one').click(() => {
        placePiece($('#one').children());
        determineWinner();
    });

    $('#two').click(() => {

        placePiece($('#two').children());
        determineWinner();
    });

    $('#three').click(() => {

        placePiece($('#three').children());
        determineWinner();
    });

    $('#four').click(() => {

        placePiece($('#four').children());
        determineWinner();
    });

    $('#five').click(() => {

        placePiece($('#five').children());
        determineWinner();
    });

    $('#six').click(() => {
        placePiece($('#six').children());
        determineWinner();

    });

    $('#seven').click(() => {

        placePiece($('#seven').children());
        determineWinner();
    });

    $('#eight').click(() => {

        placePiece($('#eight').children());
        determineWinner();
    });

    $('#nine').click(() => {

        placePiece($('#nine').children());
        determineWinner();
    });


    //Create a game class
    class Game {
        constructor(p1wins, p2wins, draws, turn, winner) {
            this.p1wins = p1wins;
            this.p2wins = p2wins;
            this.draws = draws;
            this.turn = turn;
            this.winner = winner;
        }
    }

    //Instantiate a game
    var game = new Game(0, 0, 0, 1, 'Nobody');
    //Initialize game turn
    $('#turn').text(game.turn);
    //Check if a winner has been found
    let foundWinner = false;
    //Count # of piecesPlaced in case of draw
    let piecesPlaced = 1;


    //Logic for placing a piece on the board
    const placePiece = (piece) => {

        if (game.turn === 1) {
            piece.text('X');
            $('#turnDisplay').addClass('player2');
            game.turn = 1;

        } else {
            piece.text('O');
            $('#turnDisplay').removeClass('player2');
            game.turn = 2;
        }

        piece.toggle();
        //Change game turns
        game.turn === 1 ? game.turn = 2 : game.turn = 1;

        //Reset next player's turn on screen
        $('#turn').text(game.turn);
        //Get value of piece
        let val = piece.attr('id');
        //Place it on vitrual board
        val = val.split('');
        gameBoard[val[0]][val[1]] = piece.text();

        //Make it so that user can't click the element again
        piece.click(() => false);

        //If a winner was found, make board unclickable
        if (foundWinner) {
            $('div').children().click(() => false);
        }

        // /Increment pieces placed
        console.log('piecesPlaced', piecesPlaced);
        piecesPlaced++;

    };


    const determineWinner = () => {

        const player1Winner = () => {
            foundWinner = true;
            game.winner = 'Player 1';
            game.p1wins++;
        };

        const player2Winner = () => {
            foundWinner = true;
            game.winner = 'Player 2';
            game.p2wins++;
        };

        //row check
        //Make row into string for equivalency
        const rowCheck = (board) => {
            _.each(board, (row) => {
                row = row.join('');
                if (row === "XXX") {
                    player1Winner();
                } else if (row === "OOO") {
                    player2Winner();
                }
            });
        }
        rowCheck(gameBoard);

        //collumn check
        //Turn cols into rows, then check rows
        var colBoard = [];
        let indx = 0;
        while (indx < 3) {
            colBoard.push(gameBoard.map(row => row[indx]));
            indx++;
        }
        rowCheck(colBoard);

        //Not the most eloquent Diagonal Check
        //Forwards
        let diag1 = $('#00').text();
        let diag2 = $('#11').text();
        let diag3 = $('#22').text();

        if (diag1 && diag2 && diag3 === 'X') {
            player1Winner();
        }
        if (diag1 && diag2 && diag3 === 'O') {
            player2Winner();
        }

        //Backwards
        let diag4 = $('#02').text();
        let diag5 = $('#20').text();

        if (diag4 && diag2 && diag5 === 'X') {
            player1Winner();
        }

        if (diag4 && diag2 && diag5 === 'O') {
            player2Winner();
        }


        //In case of draw
        if(piecesPlaced == 9 && !foundWinner) {
        	game.draws++;
        	$('#draw').text(game.draws);
        }

        if(foundWinner) {
        	if(game.winner == 'Player 1') {
        		$('#winner').addClass('player1');
        	} else {
        		$('#winner').addClass('player2');
        	}
         	$('#winner').text(game.winner);
        }




        //Make it so that user can't click the element again
        //if a winner is found
        console.log('Was a winner found?', foundWinner);

        //Reset # of wins for each player
        $('#p1wins').text(game.p1wins);
        $('#p2wins').text(game.p2wins);
        return foundWinner;
    };



});
