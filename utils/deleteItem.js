import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../firebase";

const deleteItem = async (id) => {
  // const docRef = doc(database, 'item', id);
  // await deleteDoc(docRef)
  //   .then(() => {})
  //   .catch((err) => {
  //     console.log(err);
  //   });
  const docRef = doc(database, "items", id);

  return await deleteDoc(docRef);
};

export default deleteItem;
