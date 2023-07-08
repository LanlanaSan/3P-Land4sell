// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
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
const auth = getAuth();

const provider = new FacebookAuthProvider();
console.log(provider);

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
    signInWithPopup(auth, provider)
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