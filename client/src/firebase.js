// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBROru0_x4xOU6D02tzngP3liTN_gM-ZQg" ,
  authDomain: "snapscrib.firebaseapp.com",
  projectId: "snapscrib",
  storageBucket: "snapscrib.appspot.com",
  messagingSenderId: "775822564140",
  appId: "1:775822564140:web:9c2dcbb86a147ef6e42a89"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);