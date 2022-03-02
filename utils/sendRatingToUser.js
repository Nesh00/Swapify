import { onSnapshot } from 'firebase/firestore';
import { query, where, updateDoc, doc } from 'firebase/firestore';
import { usersColRef, database } from '../firebase';

const sendRatingToUser = (rating, username) => {
    let q = query(usersColRef, where('username', '==', username));

    return new Promise((resolve, reject) => {
      onSnapshot(q, (snapshot) => {
        let userFromDb = [];
        snapshot.docs.forEach((doc) => {
          userFromDb.push({ ...doc.data(), id: doc.id });
        });
        resolve(userFromDb[0]);
      });
    }).then((userObj) => {
        const currentStars = userObj.total_stars;
        const currentSwaps = userObj.total_swaps;
        const docRef = doc(database, 'users', userObj.id);
        updateDoc(docRef, {
            total_stars: currentStars + rating,
            total_swaps: currentSwaps + 1
        })
        .then(() => {
        })
    });
}

export default sendRatingToUser;