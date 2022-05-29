export const Help = () => {
    return `<details>
    <summary>Checkers rules</summary>
    <div class="content">
        <p>
        A classic 8x8 chessboard, only the dark squares are used.It is positioned so that each player 
        has a light square on the right side corner.24 discs (12 of 2 colors) Typically, they are flat and round. 
        The color of one set is black and the other red or white or beige. Checkers is played by two players.
        Each player begins the game with 12 discs and places them on the 12 dark squares closest to him or her.
        Black opens the game, then players alternate their turns.Randomly determine who gets the black pieces first. 
        When playing a series of games, the players alternate who gets the black pieces. The pieces always move 
        diagonally and single pieces are always limited to forward moves. A piece making a non-capturing move may 
        move only one square. To capture a piece of your opponent, your piece leaps over one of the opponent's pieces 
        and lands in a straight diagonal line on the other side. This landing square must be empty.When a piece is 
        captured, it is removed from the board. Only one piece may be captured in a single jump, but multiple jumps 
        are allowed on a single turn. If a player is able to make the capture, then the jump must be made. If more 
        than one capture is available, then the player decides if he prefers this or not. Single pieces may shift 
        direction diagonally during a multiple capture turn, but must always jump forward (toward the opponent). 
        When a piece reaches the furthest row, it is crowned and becomes a king. One of the pieces which had been 
        captured is placed on top of the king so that it is twice as high as a single piece. Kings are limited 
        to moving diagonally but can move both forward and backward. Kings may combine jumps in several directions 
        (forward and backward) on the same turn.A player wins the game when the opponent cannot make a move. 
        This happens usually because all of the opponent's pieces have been captured, but it could also be because
        all of his pieces are blocked in.
        </p>
    </div>
</details>
<details>
    <summary>Site description</summary>
    <div class="content">
        <p> 
        One of the friends who wants to play creates a board for the game and waits for the second user to join. If the 
        user has a link to the board, he can connect to the board using it. On the right side of the board, the history 
        of moves made by users will be displayed. If the user knows the nickname of his friend, he can send him an 
        invitation to the game. The user who received the invitation will have a pop-up window with buttons: 
        "Accept" and "Reject" the invitation. This page will contain additional information for users: the rules of 
        the game of checkers, a description of the site (something like this readme file), etc.
        </p>
    </div> 
</details>`;
}