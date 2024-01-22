import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                role: role
            });

            // Kullanıcıyı giriş sayfasına yönlendirin
            window.location.href = 'login.html';
        })
        .catch(error => {
            console.error("Signup error:", error);

            const errorMessageElement = document.getElementById('error-message');
            if (errorMessageElement) {
                errorMessageElement.innerText = "Signup failed: \n" + error.message;
                errorMessageElement.style.display = 'block';
            }

        });
});