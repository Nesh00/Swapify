import { database } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const markAsSwapped = async (id) => {
  const docRef = doc(database, "items", id);
  console.log(id, "id");
  return await setDoc(
    doc(docRef),
    {
      swapped: true,
    },
    { merge: true }
  );
};

export default markAsSwapped;
