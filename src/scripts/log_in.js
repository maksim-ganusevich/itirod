// Will be used in next work!
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import {auth} from '../api/firebase-config.js'

var button = document.getElementById("log-in");
// var email = document.getElementById("email");
// var password = document.getElementById("password");

// email.onchange() = (event) => {
//     setLoginEmail(event.target.value);
// }

// password.onchange() = (event) => {
//     setLoginPassword(event.target.value);
// }

// const [loginEmail, setLoginEmail] = useState("");
// const [loginPassword, setLoginPassword] = useState("");

const login = async () => {
    try {        
        // const user = await createUserWithEmailAndPassword(
        //     auth,
        //     loginEmail,
        //     loginPassword
        // );
        // console.log(user);
        location.href = "menu_page.html?";
    }
    catch(error){
        console.log(error.message);
    }
}

button.onclick = login