import { onSnapshot, query, where } from "firebase/firestore";
import { messageColRef } from "../firebase";

const getMessages = () => {
  const q = query(messageColRef);
  return new Promise((resolve, reject) => {
    onSnapshot(q, (snapshot) => {
      let messagesFromDb = [];
      snapshot.docs.forEach((doc) => {
        messagesFromDb.push({ ...doc.data(), id: doc.id });
      });
      resolve(messagesFromDb);
    });
  }).then((messages) => {
    return messages;
  });
};

export default getMessages;
