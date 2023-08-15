// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, FacebookAuthProvider, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB84Tkhwk9bUSc3Ot9oKCKPo2x9XTyGesE",
    authDomain: "p-land4sell.firebaseapp.com",
    databaseURL: "https://p-land4sell-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "p-land4sell",
    storageBucket: "p-land4sell.appspot.com",
    messagingSenderId: "104427022063",
    appId: "1:104427022063:web:79389ee10b8b97933c9d1a",
    measurementId: "G-6Y3JGMGBL2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const fb_provider = new FacebookAuthProvider(app);
const google_provider = new GoogleAuthProvider(app);
console.log(fb_provider);
console.log(google_provider);

var email = document.getElementById('email');
var password = document.getElementById('password');

//function for Email login
window.login = function(e) {
    e.preventDefault();
    var obj = {
        email: email.value,
        password: password.value
    }

    signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then(function(success) {
            //console.log(user.uid)
            window.location.replace("../after-login.html")
            alert("ล็อกอินเข้าใช้สำเร็จ!")
        })
        .catch(function(err) {
            //If any error happens in auth process
            var error_code = err.code
            var error_message = err.message

            alert("login error" + error_code + " :" + error_message)
                //alert("error" + err)
        })
    console.log(obj)
}

//function to login with Facebook
document.getElementById("facebook-login").addEventListener("click", function() {
    signInWithPopup(auth, fb_provider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            alert("Welcome " + user.displayName);
            console.log(user);

            window.location.replace("../after-login.html")
        })
        .catch((err) => {
            const errorCode = err.code;
            const errorMessage = err.message;
            console.log(errorMessage);
            // The email of the user's account used.
            const email = err.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(err);
        })
})

//function to login with Google
const googleSignInButton = document.getElementById("google-login");

const googleuserSignIn = async() => {
    signInWithPopup(auth, google_provider).then((result) => {
        const user = result.user;
        console.log(user);
        window.location.replace("../after-login.html")
        alert("ล็อกอินเข้าใช้สำเร็จ!")
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ":" + errorMessage);
    })
}

googleSignInButton.addEventListener('click', googleuserSignIn);

/* document.getElementById("google-login").addEventListener("click", function() {
    signInWithPopup(auth, google_provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)

    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

    })
}) */

//function to signout
/* signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  }); */