import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'login.html';
    } else {
        updateBlogList();
        document.getElementById('logoutButton').style.display = 'block';
    }
});


async function updateBlogList() {
    const blogListElement = document.getElementById("blog-list");
    const querySnapshot = await getDocs(collection(db, "blog"));
    blogListElement.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const blog = doc.data();
        const blogPostElement = document.createElement('div');
        blogPostElement.classList.add("post-box");
        blogPostElement.innerHTML = `
            <a href="post-detail.html?postID=${doc.id}">
                <img src="${blog.imageUrl}" alt="${blog.title}" class="blog-image"> <!-- Resim ekleniyor -->
                <h4 class="category">${blog.title}</h4>
                <p class="post-description">${blog.content}</p>
                <div class="profile">
                    <span class="profile-name">${blog.author}</span>
                </div>
            </a>
        `;
        blogListElement.appendChild(blogPostElement);
    });
}

document.getElementById('logoutButton').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error('Çıkış Yaparken Hata Oluştu', error);
    });
});