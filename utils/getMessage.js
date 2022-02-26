// import { onSnapshot, query, where } from "firebase/firestore";
// import { messageColRef } from "../firebase";

// const getMessage = (itemId, ownerId, userId) => {
//   const q = query(
//     messageColRef,
//     where("item_id", "==", itemId),
//     where("owner_id", "==", ownerId),
//     where("user_id", "==", userId)
//   );
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

// export default getMessage;
import { doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { database, messageColRef } from "../firebase";

const getMessage = async (docId) => {
  const docRef = doc(database, "messages", docId);

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log(docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export default getMessage;
