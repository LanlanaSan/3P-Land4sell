// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
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
const database = getDatabase();

//Getting all the objects from html
var full_name = document.getElementById('full_name')
var email = document.getElementById('email')
var password = document.getElementById('password')

window.register = function(e) {
    e.preventDefault();
    var obj = {
        full_name: full_name.value,
        email: email.value,
        password: password.value,
    }

    createUserWithEmailAndPassword(auth, obj.email, obj.password)
        .then(function(success) {
            alert("สร้างบัญชีผู้ใช้สำเร็จ!")
        })
        .catch(function(err) {
            //If any error happens in auth process
            var error_code = err.code
            var error_message = err.message

            alert(error_code + " :" + error_message)
                //alert("error" + err)
        })
    console.log(obj)
};

//Set up register function
function register() {
    full_name = document.getElementById('full_name').value
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    //Call function to validate the input fields
    if (validate_email(email) == false) {
        alert('กรุณากรอกที่อยู่อีเมล์ที่ถูกต้อง')
        return
    }
    if (validate_field(full_name) == false) {
        alert('กรุณากรอกชื่อและนามสกุล')
        return
    }

    //Authentication with email
    auth.createUserWithEmailAndPassword(email, password).then(function() {
            var user = auth.currentUser

            //Add user to Firebase DB
            var database_ref = database.ref()

            //Create user data
            var user_data = {
                full_name: full_name,
                email: email,
            }

            database_ref.child('users/' + user.uid).set(user_data)

            alert('สร้างบัญชีผู้ใช้สำเร็จ!')
        })
        .catch(function(error) {
            //If any error happens in auth process
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}