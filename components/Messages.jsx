import React, {useState, useEffect} from 'react';
import { TouchableOpacity,Text, TextInput, View, ScrollView, StyleSheet, FlatList} from 'react-native';
import {auth, database} from '../firebase';
import {collection, addDoc, query, serverTimestamp, orderBy} from 'firebase/firestore'
import {Formik} from 'formik'
import { getAuth } from 'firebase/auth';
import Button from './Reusable/Button'
import { messageColRef } from "../firebase";
import getMessages from '../utils/getMessages'

const Messages = () => {
    const auth= getAuth();
    const user = auth.currentUser;
    const [messages, setMessages] = useState([])
    
    useEffect(() => {
        getMessages().then((messagesFromDb) =>{
          setMessages(messagesFromDb);
        })
    }, []);

    
    return (
        
        <View style={{padding: 10}}>
            <Formik
            initialValues={{message: '',
        }}
            onSubmit={(values, actions)=>{
                actions.resetForm();
                addDoc(messageColRef, {item_id: 123,
                    owner_id: 234,
                    user_id: user.uid,
                    createdAt: serverTimestamp(),
                    username: user.displayName,
                messages: [values.message, ...messages]}
            )
            }}>
                {props => (<View><TextInput
            style={{height: 40}}
            placeholder="New message"
            onChangeText={props.handleChange('message')}
            value={props.values.message}/>
            <Button btnText={'Submit'} onSubmit={props.handleSubmit}/></View>)}
            
            </Formik></View>
    )
}

export default Messages;