const formattedTimestamp = (timestamp) => {
    let formattedTimestamp = '';
    if (typeof timestamp === 'number') {
      formattedTimestamp = new Date(timestamp);
    } else {
      formattedTimestamp = new Date(timestamp.seconds*1000);
    }
    const formatted = String(formattedTimestamp);
    return formatted;
} 

// const timestampToFirebaseObj = (timestamp) => {
//     console.log(timestamp)
    
//     const seconds = timestamp / 1000
//     console.log(seconds, '<< seconds')
//     const firebaseFormat = { seconds: seconds, nanoseconds: 0 };
//     console.log(firebaseFormat, '<< formatted')
//     const formattedDate = formattedTimestamp(firebaseFormat);
//     console.log(formattedDate)
// }

export default formattedTimestamp;