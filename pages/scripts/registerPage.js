// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';

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

const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", event => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const repassword = document.getElementById("repassword").value;

  if (email.toLowerCase().match('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')) {
    alert("Email is not valid")
  } else if (password.length <= 7) {
    alert("Password is short");
  } else if (password !== repassword) {
    alert("Password is different")
  } else {

    console.log(email);
    console.log(password);
    console.log(repassword);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert("User is created");
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/email-already-in-use':
            alert(`Email address ${this.state.email} already in use.`);
            break;
          case 'auth/invalid-email':
            alert(`Email address ${this.state.email} is invalid.`);
            break;
          case 'auth/operation-not-allowed':
            alert(`Error during sign up.`);
            break;
          case 'auth/weak-password':
            alert('Password is not strong enough. Add additional characters including special characters and numbers.');
            break;
          default:
            const errorMessage = error.message;
            alert(`error code: ${errorCode}, message; ${errorMessage}`);
            break;
        }
      });
  }

})


let inputEmail = document.getElementById('email');
let inputPassword = document.getElementById('password');
let inputRePassword = document.getElementById('repassword');


inputEmail.addEventListener('keydown', event => {

  let idEvent = event.target.validity.valid;
  let emailMessage = document.getElementById("EmailMessage");

  if (idEvent == false) {
    emailMessage.style = "display: block;";
  } else {
    emailMessage.style = "display: none;";
  }

})


inputPassword.addEventListener('keydown', event => {

  let idEvent = event.target.validity.valid;
  let passwordMessage = document.getElementById("PasswordMessage");

  if (idEvent == false) {
    passwordMessage.style = "display: block;";
  } else {
    passwordMessage.style = "display: none;";
  }

})

inputRePassword.addEventListener('keydown', event => {

  let idEvent = event.target.validity.valid;
  let repasswordMessage = document.getElementById("RePasswordMessage");

  if (idEvent == false) {
    repasswordMessage.style = "display: block;";
  } else {
    repasswordMessage.style = "display: none;";
  }

})

let back = document.getElementById("backBtn");

back.addEventListener("click", event => {
  window.location.href = "http://127.0.0.1:5500/mainPage.html";
})