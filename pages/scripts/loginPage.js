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

  if (email === "" || !email.toLowerCase().match('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')) {
    alert("Enter Email");
  } else if (password === "") {
    alert("Enter Password");
  } else {

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
            alert(`The user is not registred`);
            break;
        }
      });

  }

})

// проверка на поле за въвеждане на имейл, парола и бутон за връщане
document.addEventListener('keydown', event => {

  let idEvent = event.target.validity;
  let emailMessage = document.getElementById("EmailMessage");
  let passwordMessage = document.getElementById("PasswordMessage");
  let idElement = event.target.id;

  if(idElement === "email"){
    if (idEvent.valid === true) {
      emailMessage.style = "display: none;";
      document.getElementById("email").style = "box-shadow: none;";
    } else {
      if(event.target.value != "") {
        emailMessage.style = "display: block;";
        document.getElementById("email").style = "box-shadow: 0 0 5px 1px red;";
      }
    }
  }

  if(idElement === "password"){
    let len = event.target.value.length + 1;
  
    if(event.keyCode == 8) {
      len -= 2;
      console.log(len);
    }
    
    if (idEvent.valid === true && len < 15) {
      passwordMessage.style = "display: none;";
      document.getElementById("password").style = "box-shadow: none;";
    } else {
      if(event.target.value != "") {
        passwordMessage.style = "display: block;";
        document.getElementById("password").style = "box-shadow: 0 0 5px 1px red;";
      }
    }
  }

  if(idElement == "backBtn"){
    location.replace("http://127.0.0.1:5500/mainPage.html");
  }

})

export { auth };