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

  if (email.length <= 10) {
    alert("Email is not valid")
  } else if (password.length <= 7) {
    alert("Password is short");
  } else if (password !== repassword) {
    alert("Password is different")
  } else {

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
            alert(`Some fields is not correct. Please check it again`);
            break;
        }
      });
  }

})

var pass;

// бутони за изтриване на коментар и блог, промяна на блог
document.addEventListener('keydown', event => {

  let idEvent = event.target.validity.valid;
  let emailMessage = document.getElementById("EmailMessage");
  let passwordMessage = document.getElementById("PasswordMessage");
  let repasswordMessage = document.getElementById("RePasswordMessage");
  let idElement = event.target.id;

  if(idElement == "email"){
    if (idEvent == false) {
      if(document.getElementById("email").value != ""){
        emailMessage.style = "display: block;";
      }
    } else {
      emailMessage.style = "display: none;";
      console.log(document.getElementById("email").value)
    }
  }

  if(idElement == "password"){
    let len = event.target.value.length + 1;
  
    if(event.keyCode == 8) {
      len -= 2;
      //console.log(len);
    }
    
    if (len < 15) {
      passwordMessage.style = "display: none;";
      document.getElementById("password").style = "box-shadow: none;";
      pass = event.target.value;
    } else {
      if(event.target.value != "") {
        passwordMessage.style = "display: block;";
        document.getElementById("password").style = "box-shadow: 0 0 5px 1px red;";
      }
    }
  }

  if(idElement == "repassword"){
    let repass = event.target.value;
    if (pass == repass) {
      repasswordMessage.style = "display: none;";
      document.getElementById("password").style = "box-shadow: none;";
    } else {
      repasswordMessage.style = "display: block;";
      document.getElementById("password").style = "box-shadow: 0 0 5px 1px red;";
    }
  }

  if(idElement == "backBtn"){
    window.location.href = "http://127.0.0.1:5500/mainPage.html";
  }

})