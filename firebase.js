// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { deleteUser, getAuth, updateProfile } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0NpVvsDu2XJLEfdysFSeewz8foPbUCoY",
  authDomain: "swapping-app.firebaseapp.com",
  projectId: "swapping-app",
  storageBucket: "swapping-app.appspot.com",
  messagingSenderId: "1088664671439",
  appId: "1:1088664671439:web:df6b296c49747fc7d213ba",
  measurementId: "G-Q4LFXVRMV1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const database = getFirestore(app);

const collectionRef = collection(database, "test");
export const messageColRef = collection(database, "messages");

export default collectionRef;

export const storage = getStorage();

//storage

export const upload = async (file, currentUser, setLoading) => {
  const response = await fetch(file);
  const blob = await response.blob();
  const fileRef = ref(storage, `Users/${currentUser.email}/avatar.jpg`);
  setLoading(true);
  const snapshot = await uploadBytes(fileRef, blob);
  const photoURL = await getDownloadURL(fileRef);
  updateProfile(currentUser, { photoURL });
  setLoading(false);
  console.log(`image uploaded to Users/${currentUser.email}/avatar.jpg`);
};
