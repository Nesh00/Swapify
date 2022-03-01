import { addDoc } from 'firebase/firestore';
import collectionRef from '../firebase';

const postItem = (item, imageURL) => {
  addDoc(collectionRef, {
    title: item.title,
    img: imageURL,
    description: item.description,
    category: item.category,
    username: item.username,
    posted_at: item.posted_at,
  });
};

export default postItem;
