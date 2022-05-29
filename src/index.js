//import { GamePage } from './components/game';
import { Help } from './components/help';
import { LogIn } from './components/login';
import { Menu } from './components/menu';
import { SignUp } from './components/sign_up';
import { Welcome } from './components/welcome';
import { WelcomeHeader } from './components/welcome_header';
import { MenuHeader } from './components/menu_header';
import { GameHeader } from './components/game_header';

import { Accordion } from './scripts/help';

import { Game } from './game_logic';

import {
    signInWithEmail,
    signUpWithEmail,
    signOutFromApp,
    monitorAuthState,
    setBoardData,
    getBoardData,
    monitorBoardState,
  } from "./api/firebase-config";

//import "./styles/board.css";
import "./styles/game.css";
import "./styles/help.css";
import "./styles/login.css";
import "./styles/menu.css";
import "./styles/sign_up.css";
import "./styles/welcome.css";
import "./styles.css";
import { AuthErrorCodes } from '@firebase/auth';


const setUserData = (newData) => {
    userData = JSON.parse(JSON.stringify(newData));
    console.log(newData);
    console.log(JSON.stringify(newData));
    console.log(JSON.parse(JSON.stringify(newData)));
  };

const generateBoardID = () => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < 16; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
   }
   return result;
}

let userData = {
    id: "",
    name: "",
    hasSavedGame: false,
    isSignedIn: false,
  };

let gameStarted = false;

let game;

const mainContainer = document.getElementById("main-container");
const headerContainer = document.getElementById("header-container");

const addOnClick = (id, callback) => {
    document.getElementById(id).addEventListener("click", callback);
  };

const addMoveAction = (i, j, callback) => {
    if(j%2 == i%2){
        document.getElementById(("space" + i + j).toString()).addEventListener("click", () => {
            game.clicked(i,j);
        });
    }
  };

const RenderWelcome = () => {
    headerContainer.innerHTML = WelcomeHeader();
    mainContainer.innerHTML = Welcome();
    addOnClick("get-started", () => {
        RenderSignUp();
    });
    addOnClick("sign-up", () => {
        RenderSignUp();
    });
    addOnClick("log-in", () => {
        RenderLogIn();
    });
}

const RenderSignUp = () => {
    headerContainer.innerHTML = WelcomeHeader();
    mainContainer.innerHTML = SignUp();

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    addOnClick("create-account", () => {
        signUpWithEmail(email.value, password.value);
    });

    addOnClick("sign-up", () => {
        RenderSignUp();
    });
    addOnClick("log-in", () => {
        RenderLogIn();
    });
}

const RenderLogIn = () => {
    headerContainer.innerHTML = WelcomeHeader();
    mainContainer.innerHTML = LogIn();

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    addOnClick("log-in-user", () => {
        signInWithEmail(email.value, password.value);
    });

    addOnClick("sign-up", () => {
        RenderSignUp();
    });
    addOnClick("log-in", () => {
        RenderLogIn();
    });
}

const RenderMenu = () => {
    headerContainer.innerHTML = MenuHeader();
    mainContainer.innerHTML = Menu();

    const userEmail = document.getElementById("user-email");
    userEmail.textContent = userData.name;
    addOnClick("create-board", () => {
        gameStarted = true;
        RenderGame();
    });
    addOnClick("join-to-board", () => {
        gameStarted = true;
        if(document.getElementById("url-to-board-input").value){
            RenderGame(document.getElementById("url-to-board-input").value);
        }
    });
    addOnClick("help", () => {
        RenderHelp();
    });
    addOnClick("log-out", () => {
        setUserData({
          id: "",
          name: "",
          hasSavedGame: false,
          isSignedIn: false,
        });
        signOutFromApp();
        RenderWelcome();
      });
}

export const ChangeBoard = (data) => {
    game.board = data.position;
    game.textarea.value = data.history;
    game.red_turn = data.lastMove;
    mainContainer.innerHTML = game.drawBoard();  
    document.getElementById("message").value = game.textarea.value;
    game.textarea = document.getElementById("message")
    document.getElementById("url-to-board").value = game.boardID;

    for (var j = 0; j < 8; j++) {
        for (var i = 0; i < 8; i++){
            addMoveAction(i, j, () => game.clicked);
        }
    } 
    game.textarea.focus();
    game.textarea.setSelectionRange(element.value.length,element.value.length);  
}

const RenderGame = async (url) => {
    game = new Game();
    headerContainer.innerHTML = GameHeader();
    mainContainer.innerHTML = game.drawBoard();
    game.textarea = document.getElementById("message");

    if(url){
        game.boardID = url;
        getBoardData(url);
    }
    else{
        game.boardID = generateBoardID();
        setBoardData(game.boardID, game.board, game.textarea.value, game.red_turn);
        getBoardData(game.boardID);
    }

    document.getElementById("url-to-board").value = game.boardID;

    for (var j = 0; j < 8; j++) {
        for (var i = 0; i < 8; i++){
            addMoveAction(i, j, () => game.clicked);
        }
    }   
    addOnClick("menu", () => {
        gameStarted = false;
        game = null;
        RenderMenu();
    });
    addOnClick("log-out", () => {
        gameStarted = false;
        game = null;
        setUserData({
          id: "",
          name: "",
          hasSavedGame: false,
          isSignedIn: false,
        });
        signOutFromApp();
        RenderWelcome();
    });    
}

const RenderHelp = () => {
    headerContainer.innerHTML = GameHeader();
    mainContainer.innerHTML = Help();
    addOnClick("menu", () => {
        RenderMenu();
    });
    addOnClick("log-out", () => {
        setUserData({
          id: "",
          name: "",
          hasSavedGame: false,
          isSignedIn: false,
        });
        signOutFromApp();
        RenderWelcome();
      });
    document.querySelectorAll('details').forEach((el) => {
        new Accordion(el);
      });
}

RenderWelcome();
monitorAuthState(setUserData, RenderMenu);

