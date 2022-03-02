import {
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { database, messageColRef } from "../firebase";

export const getMyMessagesItems = async (loggedInUser, type) => {
  const q = query(messageColRef, where(type, "==", loggedInUser));
  const querySnapshot = await getDocs(q);
  const messagesFromDb = [];
  querySnapshot.docs.forEach((doc) => {
    messagesFromDb.push({ ...doc.data(), id: doc.id });
  });
  return messagesFromDb;
};

export const getMessage = async (docId) => {
  const docRef = doc(database, "messages", docId);

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

export const getMyItemMessageId = async (item_id, username) => {
  const q = query(
    messageColRef,
    where("item.id", "==", item_id),
    where("username", "==", username)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot?.docs ? querySnapshot.docs[0]?.id : null;
};
