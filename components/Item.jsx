import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Button from "./Reusable/Button";
import { auth } from "../firebase";
import formattedTimestamp from "../utils/formatTimestamp";
import { useNavigation } from "@react-navigation/native";
import deleteItem from "../utils/deleteItem";
import { MaterialIcons } from "@expo/vector-icons";
import { getMyItemMessageId } from "../utils/messageQueries";

const Item = ({ route }) => {
  const navigation = useNavigation();
  const item = route.params;
  const [id, setId] = useState(item.id);
  const [messageDocId, setMessageDocId] = useState(null);

  const deleteItemHandler = async () => {
    deleteItem(id);
    // navigation.navigate('My List');
  };

  useEffect(() => {
    getMyItemMessageId(id, auth.currentUser.displayName).then((docId) => {
      setMessageDocId(docId);
    });
  }, []);

  return (
    <SafeAreaView style={styles.itemContainer}>
      <Image style={styles.itemImage} source={{ uri: item.img }} />
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemCategory}>{item.category}</Text>
      <View style={styles.swapContainer}>
        <Text style={styles.itemUsername}>{item.username}</Text>
        <Text>{formattedTimestamp(item.posted_at)}</Text>
      </View>
      {auth.currentUser.displayName === item.username ? (
        <Button btnText={"Delete Item"} onSubmit={deleteItemHandler} />
      ) : (
        // <Button btnText={'Offer Swap'} onSubmit={()=>{navigation.navigate('Conversation', {
        //   item: item,
        // })}}/>
        <TouchableOpacity
          style={styles.itemButton}
          onPress={() =>
            navigation.navigate("Conversation", {
              messageDocId: messageDocId,
              item: item,
            })
          }
        >
          <MaterialIcons name="message" size={24} color="#6b6565" />
        </TouchableOpacity>
      )}
      <Text style={styles.itemDescription}>{item.description}</Text>
    </SafeAreaView>
  );
};

export default Item;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: "5%",
    backgroundColor: "#fff",
  },
  itemImage: {
    width: "100%",
    height: "30%",
    borderRadius: 5,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: "#ccc9c9",
  },
  itemTitle: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    fontSize: 28,
  },
  itemCategory: {
    marginBottom: 60,
    fontSize: 18,
    textAlign: "center",
    fontStyle: "italic",
  },
  swapContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  itemUsername: {
    fontSize: 20,
  },
  itemDescription: {
    marginTop: 20,
    padding: 20,
    fontSize: 16,
    textAlign: "center",
    borderRadius: 5,
    backgroundColor: "#f7f7f7",
  },
});
