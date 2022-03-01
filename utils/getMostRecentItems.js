import { onSnapshot } from 'firebase/firestore';
import { query, orderBy } from 'firebase/firestore';
import collectionRef from '../firebase';

const getMostRecentItems = () => {
  return new Promise((resolve, reject) => {
    const q = query(collectionRef, orderBy('posted_at', 'desc'));
    onSnapshot(q, (snapshot) => {
      let itemsFromDb = [];
      snapshot.docs.forEach((doc) => {
        itemsFromDb.push({ ...doc.data(), id: doc.id });
      });
      resolve(itemsFromDb);
    });
  }).then((items) => {
    const sixMostRecent = items.slice(0, 6);
    return sixMostRecent;
  });
};

export default getMostRecentItems;
