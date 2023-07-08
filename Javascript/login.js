// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
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
const analytics = getAnalytics();
const auth = getAuth();

var email = document.getElementById('email');
var password = document.getElementById('password');

window.login = function(e) {
    e.preventDefault();
    var obj = {
        email: email.value,
        password: password.value
    }

    signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then(function(success) {
            console.log(user.uid)
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