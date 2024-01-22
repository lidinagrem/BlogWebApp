
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


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
const db = getFirestore(app);

// Form gönderme olayı
document.getElementById('sendMessage').addEventListener('click', function(event) {
    event.preventDefault();

    const UserName = document.getElementById('UserName').value;
    const UserEmail = document.getElementById('UserEmail').value;
    const UserMessage = document.getElementById('UserMessage').value;
    
    addDoc(collection(db, "User Messages"), { UserName, UserEmail, UserMessage })
        .then(docRef => {
            console.log("Document written with ID: ", docRef.id);
            showPopup(); 
        })
        .catch(error => {
            console.error("Error adding document: ", error);
        });
});

function showPopup() {
    document.getElementById('successPopup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('successPopup').style.display = 'none';
}
window.closePopup = closePopup;

const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', function () {
    signOut(auth).then(() => {
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error('Çıkış Yaparken Hata Oluştu', error);
    });
});
