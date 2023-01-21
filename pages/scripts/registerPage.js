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

    if(email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      alert("Email is not valid")
    } else if(password.length <= 7) {
     alert("Password is short");
    } else if(password !== repassword) {
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