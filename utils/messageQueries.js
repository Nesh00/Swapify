import {
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { database, messageColRef } from "../firebase";

// export const getMyMessagesMyItems = (loggedInUser) => {
//   const q = query(messageColRef, where("ownerName", "==", loggedInUser));
//   return new Promise((resolve, reject) => {
//     onSnapshot(q, (snapshot) => {
//       let messagesFromDb = [];
//       snapshot.docs.forEach((doc) => {
//         messagesFromDb.push({ ...doc.data(), id: doc.id });
//       });
//       resolve(messagesFromDb);
//     });
//   }).then((messages) => {
//     return messages;
//   });
// };

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
    // doc.data() will be undefined in this case
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
