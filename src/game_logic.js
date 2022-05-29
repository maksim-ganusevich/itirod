import "./gif/black.gif";
import "./gif/gray.gif";
import "./gif/you1.gif";
import "./gif/you2.gif";
import "./gif/you1k.gif";
import "./gif/you2k.gif";
import "./gif/me1.gif";
import "./gif/me2.gif";
import "./gif/me1k.gif";
import "./gif/me2k.gif";
import {
  setBoardData,
  monitorBoardState,
} from "./api/firebase-config";

class Coord {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

export class Game {
  constructor() {
    this.boardID;
    this.textarea;
    this.square_dim = 80;
    this.piece_toggled = false;
    this.red_turn = true;
    this.double_jump = false;
    this.game_is_over = false;
    this.selected;
    this.piece;
    this.board = this.Board([1,0,1,0,1,0,1,0,
    0,1,0,1,0,1,0,1,
    1,0,1,0,1,0,1,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,-1,0,-1,0,-1,0,-1,
    -1,0,-1,0,-1,0,-1,0,
    0,-1,0,-1,0,-1,0,-1]);
  }
  preload() {
    this.length = preload.arguments.length;
    for (var i = 0; i < this.length; i++) {
      this[i] = new Image();
      this[i].src = preload.arguments[i];
    }
  }

  Board(arg) {
    let board = new Array();
    for (var i = 0; i < 8; i++) {
      board[i] = new Array();
      for (var j = 0; j < 8; j++) board[i][j] = arg[8 * j + i];
    }
    board[-2] = new Array(); // prevents errors
    board[-1] = new Array(); // prevents errors
    board[8] = new Array(); // prevents errors
    board[9] = new Array(); // prevents errors
    return board;
  }
  moveable_space(i, j) {
    return ((i % 2) + j) % 2 == 0;
  }

  coord(x, y) {
    var c = new Coord(x, y);
    return c;
  }
  drawBoard() {
    let text = "";
    text += '<div class="board">' +
    "<table border=0 cellspacing=0 cellpadding=0 width=" +
      (this.square_dim * 8 + 8) +
      "<tr><td><img src='gif/black.gif' width=" +
      (this.square_dim * 8 + 8) +
      " height=4><br></td></tr>";
    for (var j = 0; j < 8; j++) {
      text += "<tr><td><img src='gif/black.gif' width=4 height=" + this.square_dim + ">";
      for (var i = 0; i < 8; i++) {
        if (this.moveable_space(i, j))
        text += "<a id='space" + i + j + "'>";
        text += "<img src='" ;
        if (this.board[i][j] == 1) text += "gif/you1.gif";
        else if (this.board[i][j] == -1) text += "gif/me1.gif";
        else if (this.board[i][j] == 1.1) text += "gif/you1k.gif";
        else if (this.board[i][j] == -1.1) text += "gif/me1k.gif";
        else if (this.moveable_space(i, j)) text += "gif/gray.gif";
        else text += "gif/black.gif";
        text += 
          "' width=" +
            this.square_dim +
            " height=" +
            this.square_dim +
            " name='space" +
            i +
            "" +
            j +
            "' border=0>";
        if (this.moveable_space(i, j)) text += "</a>";
      }
      text += "<img src='gif/black.gif' width=4 height=" + this.square_dim + "></td></tr>";
    }  
    text += 
      "<tr><td><img src='gif/black.gif' width=" +
        (this.square_dim * 8 + 8) +
        " height=4><br></td></tr></table><br>" +
        "</div>"+
        "<form class='controllers' name='disp'>" +
        '<div class="moves-history"><p class="history-title">Moves History</p>' +
        "<textarea name='message' id='message' wrap=virtual readonly rows=2 cols=40></textarea></div>" +
        '<div id="copy-url"><input class="url" id="url-to-board" value="#url-to-board" disabled></div>' +
        "</form>";
    return text;
  }
  clicked(i, j) {
    if (this.integ((this.board[i][j]) >= 1 && this.red_turn)|| (this.integ(this.board[i][j]) <= -1 && !this.red_turn)) {
      this.toggle(i, j);
    }
    else if (this.piece_toggled) this.move(this.selected, this.coord(i, j));
  }
  toggle(x, y) {
    if (this.red_turn) {
      if (this.piece_toggled)
        this.draw(
          this.selected.x,
          this.selected.y,
          "gif/you1" + (this.board[this.selected.x][this.selected.y] == 1.1 ? "k" : "") + ".gif"
        );
      if (this.piece_toggled && this.selected.x == x && this.selected.y == y) {
        this.piece_toggled = false;
        if (this.double_jump) {
          this.red_turn = this.double_jump = false;
        }
      } else {
        this.piece_toggled = true;
        this.draw(x, y, "gif/you2" + (this.board[x][y] == 1.1 ? "k" : "") + ".gif");
      }
      this.selected = this.coord(x, y);
    } 
    else {
      if (this.piece_toggled)
        this.draw(
          this.selected.x,
          this.selected.y,
          "gif/me1" + (this.board[this.selected.x][this.selected.y] == -1.1 ? "k" : "") + ".gif"
        );
      if (this.piece_toggled && this.selected.x == x && this.selected.y == y) {
        this.piece_toggled = false;
        if (this.double_jump) {
          this.red_turn = this.double_jump = false;
        }
      } else {
        this.piece_toggled = true;
        this.draw(x, y, "gif/me2" + (this.board[x][y] == -1.1 ? "k" : "") + ".gif");
      }
      this.selected = this.coord(x, y);
    }
  }
  draw(x, y, name) {
    document.images["space" + x + "" + y].src = name;
  }
  integ(num) {
    if (num != null) return Math.round(num);
    else return null;
  }
  abs(num) {
    return Math.abs(num);
  }
  sign(num) {
    if (num < 0) return -1;
    else return 1;
  }
  concatenate(arr1, arr2) {
    // function tacks the second array onto the end of the first and returns result
    for (var i = 0; i < arr2.length; i++) arr1[arr1.length + i] = arr2[i];
    return arr1;
  }
  legal_move(from, to) {
    if (to.x < 0 || to.y < 0 || to.x > 7 || to.y > 7) return false;
    this.piece = this.board[from.x][from.y];
    this.distance = this.coord(to.x - from.x, to.y - from.y);
    if (this.distance.x == 0 || this.distance.y == 0) {
      return false;
    }
    if (this.abs(this.distance.x) != this.abs(this.distance.y)) {
      return false;
    }
    if (this.abs(this.distance.x) > 2) {
      return false;
    }
    if (this.abs(this.distance.x) == 1 && this.double_jump) {
      return false;
    }
    if (this.board[to.x][to.y] != 0 || this.piece == 0) {
      return false;
    }
    if (
      this.abs(this.distance.x) == 2 &&
      this.integ(this.piece) !=
        -this.integ(this.board[from.x + this.sign(this.distance.x)][from.y + this.sign(this.distance.y)])
    ) {
      return false;
    }
    if (this.integ(this.piece) == this.piece && this.sign(this.piece) != this.sign(this.distance.y)) {
      return false;
    }
  
    return true;
  }
  move(from, to) {
    //if (!red_turn) red_turn = true;
    if (this.legal_move(from, to)) {
      this.piece = this.board[from.x][from.y];
      this.distance = this.coord(to.x - from.x, to.y - from.y);
      if (this.abs(this.distance.x) == 1 && this.board[to.x][to.y] == 0) {
        this.swap(from, to);
      } 
      else if (
        this.abs(this.distance.x) == 2 &&
        this.integ(this.piece) !=
        this.integ(this.board[from.x + this.sign(this.distance.x)][from.y + this.sign(this.distance.y)])) {
          this.double_jump = false;
        this.swap(from, to);
        this.remove(from.x + this.sign(this.distance.x), from.y + this.sign(this.distance.y));
        if (
          this.legal_move(to, this.coord(to.x + 2, to.y + 2)) ||
          this.legal_move(to, this.coord(to.x + 2, to.y - 2)) ||
          this.legal_move(to, this.coord(to.x - 2, to.y - 2)) ||
          this.legal_move(to, this.coord(to.x - 2, to.y + 2))
        ) {
          this.double_jump = true;
        }
      }
      if (this.board[to.x][to.y] == 1 && to.y == 7 && this.red_turn) this.king_me(to.x, to.y);
      if (this.board[to.x][to.y] == -1 && to.y == 0 && !this.red_turn) this.king_me(to.x, to.y);
      this.selected = to;
      if(this.red_turn){
        if (this.game_over() && !this.double_jump) {
          this.toggle(to.x,to.y);
          this.red_turn = this.double_jump = false;

          this.textarea.value += 
            "Red:\n" +
            "\tFrom: " + from.x + "," + from.y + "\n" +
            "\tTo: " + to.x + "," + to.y + "\n";
            setBoardData(this.boardID, this.board, this.textarea.value, this.red_turn);
        }
      }
      else {
        if (this.game_over() && !this.double_jump) {
          this.toggle(to.x, to.y);
          this.red_turn = true;this.double_jump = false;
          this.textarea.value += 
            "Black:\n"+
            "\tFrom: " + from.x + "," + from.y + "\n" +
            "\tTo: " + to.x + "," + to.y + "\n";
          setBoardData(this.boardID, this.board, this.textarea.value, this.red_turn);
        }
      }
    }
    return true;
  }
  
  king_me(x, y) {
    if (this.board[x][y] == 1) {
      this.board[x][y] = 1.1; // king you
      this.draw(x, y, "gif/you2k.gif");
    } else if (this.board[x][y] == -1) {
      this.board[x][y] = -1.1; // king me
      this.draw(x, y, "gif/me2k.gif");
    }
    if(this.red_turn) this.textarea.value += "\nRed "
    else this.textarea.value += "\nBalck "
    this.textarea.value += 
    "checker("+ x +"," + y +")is king now\n";
  }
  
  swap(from, to) {
    this.dummy_src = document.images["space" + to.x + "" + to.y].src;
    document.images["space" + to.x + "" + to.y].src =
      document.images["space" + from.x + "" + from.y].src;
    document.images["space" + from.x + "" + from.y].src = this.dummy_src;
  
    this.dummy_num = this.board[from.x][from.y];
    this.board[from.x][from.y] = this.board[to.x][to.y];
    this.board[to.x][to.y] = this.dummy_num;
  }
  
  remove(x, y) {
    this.draw(x, y, "gif/gray.gif");
    this.board[x][y] = 0;
    if(this.red_turn) this.textarea.value += "\nBlack "
    else this.textarea.value += "\nRed "
    this.textarea.value += 
    "checker("+ x +"," + y +") eaten\n";
  }
  
  game_over() {
    // make sure game is not over (return false if game is over)
    this.comp = this.you = false;
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if (this.integ(this.board[i][j]) == -1) this.comp = true;
        if (this.integ(this.board[i][j]) == 1) this.you = true;
      }
    }
    if (!this.comp) this.textarea.value += 
      "You beat me!";
    if (!this.you) this.textarea.value += 
      "Gotcha! Game over.";
      this.game_is_over = !this.comp || !this.you;
    return !this.game_is_over;
  }
} 


//const textarea = document.getElementById('message');

 

