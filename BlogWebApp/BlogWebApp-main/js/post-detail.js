import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
const auth = getAuth(app);

const urlParams = new URLSearchParams(window.location.search);
const postID = urlParams.get('postID');

const postContentElement = document.getElementById("post-content");

getDoc(doc(db, "blog", postID)).then((docSnap) => {
    if (docSnap.exists()) {
        const postData = docSnap.data();
        postContentElement.innerHTML = `
            <div id="post-content">
                <h3>${postData.title}</h3>
                <div class="post-image">
                    <img src="${postData.imageUrl}" alt="${postData.title}">
                </div>
                <p>${postData.content}</p>
                <span class="author">Author: ${postData.author}</span>
            </div>
        `;
    } else {
        postContentElement.innerHTML = "<p>Blog yazısı bulunamadı.</p>";
    }
}).catch((error) => {
    console.error("Blog yazısı yüklenirken hata oluştu:", error);
});

onAuthStateChanged(auth, (user) => {
    if (!user) {
        document.getElementById('logoutButton').style.display = 'none';
    } else {
        document.getElementById('logoutButton').style.display = 'block';
    }
});

document.getElementById('logoutButton').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error('Çıkış Yaparken Hata Oluştu', error);
    });
});
