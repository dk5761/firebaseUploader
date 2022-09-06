import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDWtlJbTeKvS50jgizCadUzUH8-AEOt02M",
    authDomain: "movies-app-b39ff.firebaseapp.com",
    projectId: "movies-app-b39ff",
    storageBucket: "movies-app-b39ff.appspot.com",
    messagingSenderId: "246609540372",
    appId: "1:246609540372:web:f2d28af43a575fd5b33e01",
    measurementId: "G-ERTTY6J1PX"
  };

const app = initializeApp(firebaseConfig)

const storage = getStorage(app);

const fireStore = getFirestore(app);


export {app, fireStore, storage}