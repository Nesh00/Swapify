import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { getMyMessagesItems } from "../utils/messageQueries";
import { getAuth } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("screen");
const imageW = width * 0.2;
const imageH = imageW * 1.1;

const MessageList = ({ navigation, category }) => {
  const auth = getAuth();
  const [messages1, setMessages1] = useState([]);
  const [messages2, setMessages2] = useState([]);
  const [sortBy, setSortBy] = useState("posted_at desc");

  useEffect(() => {
    getMyMessagesItems(auth.currentUser.displayName, "ownerName").then(
      (messages1) => {
        setMessages1(messages1);
      }
    );
  }, [category, sortBy]);

  useEffect(() => {
    getMyMessagesItems(auth.currentUser.displayName, "username").then(
      (messages2) => {
        setMessages2(messages2);
      }
    );
  }, [category, sortBy]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.msgHeader}>Giving away...</Text>
      <FlatList
        data={messages1}
        decelerationRate={0}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemCard}>
              <View>
                <Image source={{ uri: item.item.img }} style={styles.itemImg} />
              </View>
              <View style={styles.itemDetail}>
                <Text style={styles.itemName}>{item.item.title}</Text>
                <Text>Owner: {item.item.username}</Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.itemButton}
                  onPress={() =>
                    navigation.navigate("Conversation", {
                      messageDocId: item.id,
                      item: item,
                    })
                  }
                >
                  <MaterialIcons name="message" size={24} color="#6b6565" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <Text style={styles.msgHeader}>Interested in...</Text>
      <FlatList
        data={messages2}
        decelerationRate={0}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemCard}>
              <View>
                <Image source={{ uri: item.item.img }} style={styles.itemImg} />
              </View>
              <View style={styles.itemDetail}>
                <Text style={styles.itemName}>{item.item.title}</Text>
                <Text>Owner: {item.item.username}</Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.itemButton}
                  onPress={() =>
                    navigation.navigate("Conversation", {
                      messageDocId: item.id,
                      item: item,
                    })
                  }
                >
                  <MaterialIcons name="message" size={24} color="#6b6565" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default MessageList;

const styles = StyleSheet.create({
  msgHeader: {
    fontSize: 20,
    fontWeight: "900",
    margin: "2%",
  },
  itemCard: {
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc9c9",
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "#ddd",
    margin: "2%",
  },
  itemImg: {
    width: imageW,
    height: imageH,
    resizeMode: "cover",
  },
  itemDetail: {
    flex: 1,
    padding: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "700",
  },
  itemButton: {
    padding: 20,
  },
});
