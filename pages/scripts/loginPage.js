// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';

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

const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", event => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(email);
  console.log(password);

  if (email === "" || !email.toLowerCase().match('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')) {
    alert("Enter Email");
  } else if (password === "") {
    alert("Enter Password");
  } else {
    console.log(email);
    console.log(password);



    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("User is valid");
        localStorage.setItem("email", email);
        location.replace("http://127.0.0.1:5500/mainPage.html");
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/invalid-email':
            alert(`Email or password is invalid.`);
            break;
          case 'auth/weak-password':
            alert('Email or Password is invalid.');
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

let back = document.getElementById("backBtn");

back.addEventListener("click", event => {
  window.location.href = "http://127.0.0.1:5500/mainPage.html";
})
