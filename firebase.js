import { initializeApp } from 'firebase/app';
import { getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA0NpVvsDu2XJLEfdysFSeewz8foPbUCoY',
  authDomain: 'swapping-app.firebaseapp.com',
  projectId: 'swapping-app',
  storageBucket: 'swapping-app.appspot.com',
  messagingSenderId: '1088664671439',
  appId: '1:1088664671439:web:df6b296c49747fc7d213ba',
  measurementId: 'G-Q4LFXVRMV1',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const database = getFirestore(app);

export const messageColRef = collection(database, 'messages');

const collectionRef = collection(database, 'items');
export default collectionRef;

export const storage = getStorage();

export const upload = async (file, currentUser, setLoading) => {
  const response = await fetch(file);
  const blob = await response.blob();
  const fileRef = ref(storage, `Users/${currentUser.email}/avatar.jpg`);
  setLoading(true);
  const snapshot = await uploadBytes(fileRef, blob);
  const photoURL = await getDownloadURL(fileRef);
  updateProfile(currentUser, { photoURL });
  setLoading(false);
};

export const uploadItemImg = async (
  counter,
  file,
  currentUser,
  setLoading,
  title
) => {
  const response = await fetch(file);
  const blob = await response.blob();
  const fileRef = ref(
    storage,
    `Users/${currentUser.email}/listing_images/${title}/item_${counter}.jpg`
  );
  setLoading(true);
  const snapshot = await uploadBytes(fileRef, blob);
  const photoURL = await getDownloadURL(fileRef);

  return photoURL;
};
