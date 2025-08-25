// firebase.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDK-YjRHJZjJiQn6wD4qtK4fhsfIPDQbUU",
  authDomain: "collage-booking-app-frontend.firebaseapp.com",
  projectId: "collage-booking-app-frontend",
  storageBucket: "collage-booking-app-frontend.appspot.com",
  messagingSenderId: "718292713464",
  appId: "1:718292713464:web:5b5c910259387279f5200d",
  measurementId: "G-LW7KH8M72D",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// SignIn functions
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithGithub = () => signInWithPopup(auth, githubProvider);
export const registerWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);