import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmrPp_-DtPzXrlO_15B_RWw97_BbMw5Ak",
  authDomain: "blog-68999.firebaseapp.com",
  projectId: "blog-68999",
  storageBucket: "blog-68999.appspot.com",
  messagingSenderId: "281464380429",
  appId: "1:281464380429:web:b16e584ef1b28e3b634944",
  measurementId: "G-YGH7RR8057"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let logout = document.getElementById("logout");

console.log("logout");

logout.addEventListener("click", event => {

  signOut(auth).then(() => {
    
    let regBtn = document.getElementsByClassName("notLogin")[0];
    regBtn.style = "display: flex";

    let username = document.getElementById("loginedUser");
    username.textContent = "";

    let funcBtn = document.getElementsByClassName("buttons")[0];
    funcBtn.style = "display: none";

    localStorage.removeItem("email");

    // let email = username.textContent.slice(3, username.textContent.length);
    // console.log(email);

    //location.reload();
  }).catch((error) => {
    alert(`Problem with logout`);
  });

})