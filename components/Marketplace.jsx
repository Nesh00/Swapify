import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { Fontisto } from "@expo/vector-icons";
import VerticalList from "./Reusable/VerticalList";
import getCategories from "../utils/getCategories";

const Marketplace = () => {
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    getCategories().then((categoriesFromDb) => {
      setCategories(categoriesFromDb);
    });
  }, []);

  return (
    <SafeAreaView style={styles.marketplaceContainer}>
      <View style={styles.marketplaceHeaderCard}>
        <Fontisto name="shopping-store" size={24} color="#6b6565" />
        <Text style={styles.marketplaceHeader}>
          {!selectedCategory ? "Marketplace" : selectedCategory}
        </Text>
      </View>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.marketplaceCategory}
      >
        <Picker.Item label="All" value="All" key="All" />
        {categories.map((category) => {
          return (
            <Picker.Item label={category} value={category} key={category} />
          );
        })}
      </Picker>
      <VerticalList category={selectedCategory} />
    </SafeAreaView>
  );
};

export default Marketplace;

const styles = StyleSheet.create({
  marketplaceContainer: {
    flex: 1,
    paddingHorizontal: "3%",
    paddingTop: "5%",
    backgroundColor: "#fff",
  },
  marketplaceHeaderCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  marketplaceHeader: {
    marginLeft: 10,
    fontSize: 25,
  },
  marketplaceCategory: {
    alignSelf: "flex-end",
    width: "50%",
  },
});
