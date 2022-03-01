import { onSnapshot } from 'firebase/firestore';
import { query, where } from 'firebase/firestore';
import { usersColRef } from '../firebase';

const getAverageStars = (username) => { 

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
        let averageStars = 0

        if (userObj.total_stars === 0 || userObj.total_swaps === 0) {
            averageStars = 0;
        } else {
          averageStars = userObj.total_stars / userObj.total_swaps;
        }
        return Math.round(averageStars * 10) / 10;
    });
}

export default getAverageStars;
