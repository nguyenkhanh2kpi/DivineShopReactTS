import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD1Te9C9oY_hKV1EUXPyKQRjhZXPJaG97o",
    authDomain: "upload2-23381.firebaseapp.com",
    projectId: "upload2-23381",
    storageBucket: "upload2-23381.appspot.com",
    messagingSenderId: "667652099335",
    appId: "1:667652099335:web:87d47db97ec22993a3c9a2",
    measurementId: "G-YXB9K5MJ0M",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
