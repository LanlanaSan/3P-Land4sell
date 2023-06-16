// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB84Tkhwk9bUSc3Ot9oKCKPo2x9XTyGesE",
    authDomain: "p-land4sell.firebaseapp.com",
    projectId: "p-land4sell",
    storageBucket: "p-land4sell.appspot.com",
    messagingSenderId: "104427022063",
    appId: "1:104427022063:web:79389ee10b8b97933c9d1a",
    measurementId: "G-6Y3JGMGBL2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = firebase.auth()
const database = firebase.database()

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

function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        // Email is correct format
        return true
    } else {
        return false
    }
}

function validate_password(password) {
    if (password < 6) {
        return false
    } else {
        true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }
    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}