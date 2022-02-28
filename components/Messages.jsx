import { getAuth } from 'firebase/auth';
import { addDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { messageColRef } from '../firebase';
import getMessage from '../utils/getMessage';
import Button from './Reusable/Button';
import { StyleSheet } from 'react-native';
import { useRef } from 'react';
import { dateFormatter } from '../utils/dateFormatter';

const Messages = ({ route }) => {
  const { messageDocId, item } = route.params;
  const auth = getAuth();
  const user = auth.currentUser;
  const [message, setMessage] = useState({});
  const newDoc = {
    item_id: '',
    owner_id: '',
    user_id: user.uid,
    createdAt: serverTimestamp(),
    username: user.displayName,
    messages: [],
  };

  useEffect(() => {
    getMessage(messageDocId).then((messageDoc) => {
      messageDoc ? setMessage(messageDoc) : setMessage(newDoc);
    });
  }, []);
  const scrollRef = useRef(null);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>
        <View>
          <View style={styles.itemCard}>
            <View>
              <Image source={{ uri: item.img }} style={styles.itemImg} />
            </View>
            <View style={styles.itemDetail}>
              <Text style={styles.itemName}>{item.title}</Text>
              <Text>User: {item.username}</Text>
            </View>
          </View>
        </View>
        <FlatList
          ref={scrollRef}
          onContentSizeChange={() =>
            message.messages ? scrollRef.current.scrollToEnd() : null
          }
          onLayout={() =>
            message.messages ? scrollRef.current.scrollToEnd() : null
          }
          data={message.messages}
          pagingEnabled
          style={{ alignSelf: 'stretch' }}
          decelerationRate={0}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.messageCard}>
                <View style={styles.messageDetail}>
                  <Text>From: {item?.username}</Text>
                  <Text style={styles.messageText}>{item?.message}</Text>
                  <Text>Sent: {dateFormatter(item?.createdAt)}</Text>
                </View>
              </View>
            );
          }}
        ></FlatList>

        <View>
          <View style={{ padding: 10 }}>
            <Formik
              initialValues={{ message: '' }}
              onSubmit={(values, actions) => {
                const newMessage = { ...message };
                const now = new Date();
                newMessage.messages = [
                  ...message.messages,
                  {
                    createdAt: now.toISOString(),
                    user_id: user.uid,
                    username: user.displayName,
                    message: values.message,
                    isRead: false,
                  },
                ];
                actions.resetForm();
                if (messageDocId) {
                  setDoc(doc(messageColRef, messageDocId), newMessage);
                } else
                  addDoc(messageColRef, {
                    ...newMessage,
                  });
                setMessage(newMessage);
              }}
            >
              {(props) => (
                <View style={{ alignItems: 'center' }}>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      padding: 10,
                      height: 100,
                      width: '95%',
                    }}
                    multiline
                    numberOfLines={4}
                    placeholder='New message'
                    onChangeText={props.handleChange('message')}
                    value={props.values.message}
                    returnKeyType='done'
                    blurOnSubmit={true}
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                    }}
                  />
                  <Button
                    disabled={!props.values.message}
                    btnText={`Send message to ${item.username}`}
                    onSubmit={props.handleSubmit}
                    navigationHandler={undefined}
                  />
                </View>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  itemCard: {
    flexDirection: 'row',
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc9c9',
    overflow: 'hidden',
    alignItems: 'center',
  },
  messageCard: {
    flexDirection: 'row',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc9c9',
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: '#ddd'
  },
  itemImg: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  itemDetail: {
    flex: 1,
    padding: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '500',
  },
  messageDetail: {
    flex: 1,
    padding: 10,
  },
  messageText: {
    fontSize: 18,
    fontWeight: '500',
  },
  Form: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default Messages;
