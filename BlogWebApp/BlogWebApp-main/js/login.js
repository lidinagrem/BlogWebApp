import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDfUfWDEkeVLGyMiRUxlPeiLUT1b-EwOBI",
    authDomain: "yeni-2e76c.firebaseapp.com",
    projectId: "yeni-2e76c",
    storageBucket: "yeni-2e76c.appspot.com",
    messagingSenderId: "470310024312",
    appId: "1:470310024312:web:1a6dc5f5256e09d91ce98d",
    measurementId: "G-GGPZVP4944"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const loginForm = document.getElementById('loginForm');
const errorText = document.getElementById('errorText');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return getDoc(doc(db, "users", userCredential.user.uid));
        })
        .then((docSnap) => {
            window.location.href = 'blogShow.html';
        })
        .catch((error) => {
            console.error("Login error:", error);
            // Kullanıcıya hata mesajını göster
            const errorMessageDiv = document.getElementById('loginErrorMessage');
            errorMessageDiv.innerText = "Login failed: \n" + error.message;
            errorMessageDiv.style.display = 'block'; // Hata mesajını görünür yap
        });
});