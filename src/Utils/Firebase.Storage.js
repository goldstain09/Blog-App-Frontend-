
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDDOUhyTb9DdM2lPe86JlWyAfTOF8MOn9Y",
  authDomain: "blog-app-2d912.firebaseapp.com",
  projectId: "blog-app-2d912",
  storageBucket: "blog-app-2d912.appspot.com",
  messagingSenderId: "511481982451",
  appId: "1:511481982451:web:c69d5d67b72c1d62e43686",
  measurementId: "G-YR3LVCHTY6"
};


const app = initializeApp(firebaseConfig);
const storage =  getStorage(app);

export default storage;
