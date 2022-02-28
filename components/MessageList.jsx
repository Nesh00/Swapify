import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import getItems from "../utils/getItems";

const { width } = Dimensions.get("screen");
const imageW = width * 0.2;
const imageH = imageW * 1.1;

const MessageList = ({ navigation, category }) => {
  const [items, setItems] = useState([]);
  const [sortBy, setSortBy] = useState('posted_at desc');

  useEffect(() => {
    getItems(category, sortBy).then((itemsFromDb) => {
      setItems(itemsFromDb);
    });
  }, [category]);

  return (
    <FlatList
      data={items}
      pagingEnabled
      style={{ alignSelf: "stretch" }}
      decelerationRate={0}
      snapToInterval={imageH + 20}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <View style={styles.itemCard}>
            <View>
              <Image source={{ uri: item.img }} style={styles.itemImg} />
            </View>
            <View style={styles.itemDetail}>
              <Text style={styles.itemName}>{item.title}</Text>
              <Text>User: {item.username}</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.itemButton}
                onPress={() =>
                  navigation.navigate("Conversation", {
                    messageDocId: "01ovbAjSpLRRZiBD8ujo",
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
    ></FlatList>
  );
};

export default MessageList;

const styles = StyleSheet.create({
  itemCard: {
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc9c9",
    overflow: "hidden",
    alignItems: "center",
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
    fontWeight: "900",
  },
  itemButton: {
    padding: 20,
  },
});
