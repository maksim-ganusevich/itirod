// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {   
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
 } from 'firebase/auth'
import {
  getDatabase,
  onValue,
  ref,
  set,
  get,
  child
} from "firebase/database"
import { ChangeBoard } from "../index"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1tB_Tr5hYhscBMWLBUttnz9YRkuJC1ls",
  authDomain: "checkers-11660.firebaseapp.com",
  projectId: "checkers-11660",
  storageBucket: "checkers-11660.appspot.com",
  messagingSenderId: "50738915496",
  appId: "1:50738915496:web:c6a5fb027d4d5772b5fa9d",
  measurementId: "G-WM0W4QRQTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export function setBoardData(boardId, position, history, lastMove) {
  const db = getDatabase();
  const reference = ref(db, 'boards/'+ boardId);
  set(reference, { 
    position: position,
    history: history,
    lastMove: lastMove
  });
}

export async function getBoardData2(boardId, game) {
  const dbRef = ref(getDatabase());
  await get(child(dbRef, 'boards/'+ boardId)).then((snapshot) => {
    if (snapshot.exists()) {
      game.board = snapshot.val().position;
      game.textarea.value = snapshot.val().history;
      game.red_turn = snapshot.val().lastMove;
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
  console.error(error);
  });
}

export async function getBoardData(boardID) {
  const db = getDatabase();
  const Ref = ref(db, 'boards/' + boardID);
  onValue(Ref, (snapshot) => {
    if(snapshot.exists()){
      const data = snapshot.val();
      console.log(data);
      ChangeBoard(data);
    }
    else {
      console.log("No data available");
    }
  });
}

export const auth = getAuth(app);
//connectAuthEmulator(auth, "http://localhost:9099");

export const signInWithEmail = async (loginEmail, loginPassword, callback) => {
  await signInWithEmailAndPassword(auth, loginEmail, loginPassword).catch(
    (error) => {
      alert(error.message);
    }
  );
};

export const signUpWithEmail = async (loginEmail, loginPassword, callback) => {
  if (!loginEmail.trim()) return;

  await createUserWithEmailAndPassword(auth, loginEmail, loginPassword).catch(
    (error) => {
      alert(error.message);
    }
  );
};

export const signOutFromApp = async () => {
    await signOut(auth);
};

export const monitorAuthState = async (setUserData, callback) =>
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      setUserData({
        id: user.uid,
        isSignedIn: true,
        name: user.email,
      });
      callback();
    } else {
      console.log("no user");
      setUserData({});
    }
});

export async function monitorBoardState(game, callback) {
  if(game){
    console.log("catched");
    const dbRef = ref(getDatabase(), 'boards/' + game.boardId);
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        game.board = snapshot.val().position;
        game.textarea.value = snapshot.val().history;
        game.red_turn = snapshot.val().lastMove;
      } else {
        console.log("No data available");
      }
      callback();
    });
  }
}
