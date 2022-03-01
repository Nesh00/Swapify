import { addDoc } from 'firebase/firestore';
import { usersColRef } from '../firebase';

const createUserObj = (username) => {
    addDoc(usersColRef, {
        username: username, 
        total_stars: 0,
        total_swaps: 0
    });
}

export default createUserObj;