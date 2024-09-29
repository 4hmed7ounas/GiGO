// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbtot--xK4l38IJSUVzMixAZGPXADzbCs",
  authDomain: "gigo-auth.firebaseapp.com",
  projectId: "gigo-auth",
  storageBucket: "gigo-auth.appspot.com",
  messagingSenderId: "871006892311",
  appId: "1:871006892311:web:a6a349cf1993e03b334752",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };