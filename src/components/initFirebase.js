// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_Emc7nAMDRuBRmJJaDeT-XMXnV2pf3Ss",
  authDomain: "markethub-70f1a.firebaseapp.com",
  projectId: "markethub-70f1a",
  storageBucket: "markethub-70f1a.appspot.com",
  messagingSenderId: "146001622616",
  appId: "1:146001622616:web:ba5b06b8b4bb6f6e15bc2d",
  measurementId: "G-HV1KXJB8WG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
