import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

  const firebaseConfig = {
    apiKey: "AIzaSyBx1QR2Cb0GXoi8gBTTK3c5aewttDsPYTo",
    authDomain: "job-portal-eda4a.firebaseapp.com",
    projectId: "job-portal-eda4a",
    storageBucket: "job-portal-eda4a.firebasestorage.app",
    messagingSenderId: "1061651605455",
    appId: "1:1061651605455:web:d67e93666f9e1e0126d4ba",
    measurementId: "G-4K5QM2CDRZ"
  };


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
