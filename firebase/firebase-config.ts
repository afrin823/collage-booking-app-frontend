
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDK-YjRHJZjJiQn6wD4qtK4fhsfIPDQbUU",
  authDomain: "collage-booking-app-frontend.firebaseapp.com",
  projectId: "collage-booking-app-frontend",
  storageBucket: "collage-booking-app-frontend.firebasestorage.app",
  messagingSenderId: "718292713464",
  appId: "1:718292713464:web:5b5c910259387279f5200d",
  measurementId: "G-LW7KH8M72D"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
