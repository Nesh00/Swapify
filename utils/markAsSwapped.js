import { database } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const markAsSwapped = async (itemId, messageDocId) => {
  const itemDocRef = doc(database, "items", itemId);
  await updateDoc(itemDocRef, {
    swapped: true,
  });

  const messageDocRef = doc(database, "messages", messageDocId);
  await updateDoc(messageDocRef, {
    swapped: true,
  });
};

export default markAsSwapped;
