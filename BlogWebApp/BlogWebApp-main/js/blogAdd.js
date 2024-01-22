import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

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
const storage = getStorage(app);

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'login.html';
    } else {
        getDoc(doc(db, "users", user.uid)).then((docSnap) => {
            if (docSnap.exists() && docSnap.data().role === "admin") {
                document.getElementById("blog-form").style.display = "block";
            } else {
                document.getElementById("access-denied-message").style.display = "block";
            }
        });
    }
});

const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', function() {
    signOut(auth).then(() => {
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error('Çıkış Yaparken Hata Oluştu', error);
    });
});

const blogForm = document.getElementById("blog-form");

blogForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const yazarAdSoyad = document.getElementById("yazar-ad-soyad").value;
    const blogKonu = document.getElementById("blog-konu").value;
    const blogYazisi = document.getElementById("blog-yazisi").value;
    const blogImageFile = document.getElementById("blog-image").files[0];

    if (!blogImageFile) {
        console.error("Lütfen bir resim dosyası seçin.");
        return; // Resim seçilmediyse, işlemi durdur.
    }

    const storageRef = ref(storage, 'blogImages/' + blogImageFile.name);


    try {
        await uploadBytes(storageRef, blogImageFile);
        const imageUrl = await getDownloadURL(storageRef);

        await setDoc(doc(collection(db, "blog")), {
            author: yazarAdSoyad,
            title: blogKonu,
            content: blogYazisi,
            imageUrl: imageUrl

        });

        console.log("Blog başarıyla Firestore'a eklendi.");
        blogForm.reset();
    } catch (error) {
        console.error("Blog Firestore'a eklenirken hata oluştu:", error);
    }
});