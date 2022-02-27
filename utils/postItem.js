import { addDoc } from 'firebase/firestore'; 
import collectionRef from '../firebase';

const postItem = (item) => {

        addDoc(collectionRef, 
            { title: item.title,
              img: item.img,
              description: item.description,
              category: item.category,
              username: item.username,
              posted_at: item.posted_at
            }).then(() => {
                //reset form
            });
}

export default postItem;