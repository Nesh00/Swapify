import { getAuth } from "firebase/auth";
import { addDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Text,
  TextInput,
  View,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Modal,
} from "react-native";
import { messageColRef } from "../firebase";
import { getMessage } from "../utils/messageQueries";
import Button from "./Reusable/Button";
import { StyleSheet } from "react-native";
import { useRef } from "react";
import { isoDateFormatter } from "../utils/dateFormatter";
import AverageStarRating from "./AverageStarRating";
import StarRatingForm from "./StarRatingForm";
import markAsSwapped from "../utils/markAsSwapped";
const now = new Date();

const Messages = ({ route }) => {
  const { messageDocId, item } = route.params;
  const auth = getAuth();
  const user = auth.currentUser;
  const [message, setMessage] = useState({});
  const newDoc = {
    ownerName: item.username,
    createdAt: now.toISOString(),
    username: user.displayName,
    messages: [],
    item: item,
  };
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    if (messageDocId) {
      getMessage(messageDocId).then((messageDoc) => {
        messageDoc ? setMessage(messageDoc) : setMessage(newDoc);
      });
    } else {
      setMessage(newDoc);
    }
  }, [messageDocId, item]);
  const scrollRef = useRef(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>
        {message?.item?.username && (
          <TouchableOpacity
            onPress={() => {
              const item = { ...message.item };
              item.swapped = !!message.swapped;
              navigation.navigate("Item", item);
            }}
          >
            <View>
              <View style={styles.itemCard}>
                <View>
                  <Image
                    source={{ uri: message?.item?.img }}
                    style={styles.itemImg}
                  />
                </View>
                <View style={styles.itemDetail}>
                  <Text style={styles.itemName}>{message?.item?.title}</Text>
                  <View>
                    <Text>Owner: {message?.item?.username}</Text>

                    <AverageStarRating user={message?.item?.username} />
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
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
          style={{ alignSelf: "stretch" }}
          decelerationRate={0}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.messageCard}>
                <View style={styles.messageDetail}>
                  <Text>From: {item?.username}</Text>
                  <Text style={styles.messageText}>{item?.message}</Text>
                  <Text>Sent: {isoDateFormatter(item?.createdAt)}</Text>
                </View>
              </View>
            );
          }}
        ></FlatList>

        <View>
          <View style={{ padding: 10 }}>
            <Formik
              initialValues={{ message: "" }}
              onSubmit={(values, actions) => {
                const newMessage = { ...message };

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
                <>
                  <Modal
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <StarRatingForm username={message.username} />
                        <Button
                          btnText={"Complete swap"}
                          onSubmit={() => {
                            markAsSwapped(message.item.id, messageDocId);
                            setModalVisible(!modalVisible);
                          }}
                          navigationHandler={undefined}
                        />
                      </View>
                    </View>
                  </Modal>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TextInput
                      style={{
                        borderWidth: 1,
                        padding: 10,
                        height: 100,
                        width: "95%",
                        flex: 1,
                      }}
                      multiline
                      numberOfLines={4}
                      placeholder="New message"
                      onChangeText={props.handleChange("message")}
                      value={props.values.message}
                      returnKeyType="done"
                      blurOnSubmit={true}
                      onSubmitEditing={() => {
                        Keyboard.dismiss();
                      }}
                    />
                    <View style={{ padding: 10 }}>
                      <Button
                        disabled={!props.values.message}
                        btnText={`Send`}
                        onSubmit={props.handleSubmit}
                        navigationHandler={undefined}
                      />
                    </View>
                  </View>

                  {user.displayName === message.ownerName && (
                    <View style={{ alignItems: "center", paddingTop: 10 }}>
                      {!message.swapped && (
                        <Button
                          btnText={
                            !!message.swapped
                              ? `Swapped with ${message.username}`
                              : `Swap with ${message.username}`
                          }
                          onSubmit={() => setModalVisible(!modalVisible)}
                          navigationHandler={undefined}
                        />
                      )}
                      {!!message.swapped && (
                        <Text style={{ fontSize: 20, fontWeight: "700" }}>
                          Swap completed
                        </Text>
                      )}
                    </View>
                  )}
                </>
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
    flexDirection: "column",
  },
  itemCard: {
    flexDirection: "row",
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc9c9",
    overflow: "hidden",
    alignItems: "center",
  },
  messageCard: {
    flexDirection: "row",
    margin: "2%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc9c9",
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "#ddd",
  },
  itemImg: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  itemDetail: {
    flex: 1,
    padding: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "500",
  },
  messageDetail: {
    flex: 1,
    padding: 10,
  },
  messageText: {
    fontSize: 18,
    fontWeight: "500",
  },
  Form: {
    fontSize: 18,
    fontWeight: "500",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Messages;
