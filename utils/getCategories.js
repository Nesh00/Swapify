import { onSnapshot } from 'firebase/firestore';
import collectionRef from '../firebase';

const getCategories = () => {
  return new Promise((resolve, reject) => {
    onSnapshot(collectionRef, (snapshot) => {
      let categoriesFromDb = [];
      snapshot.docs.forEach((doc) => {
        if (categoriesFromDb.includes(doc.data().category) === false) {
          categoriesFromDb.push(doc.data().category);
        }
      });
      resolve(categoriesFromDb);
    });
  })
    .then((categories) => {
      return categories.sort();
    })
    .catch((err) => {
      console.log("There's an error ", err);
    });
};

export default getCategories;
