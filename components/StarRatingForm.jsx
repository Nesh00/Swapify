import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import sendRatingToUser from "../utils/sendRatingToUser";

const StarRatingForm = ({ username }) => {
  const [rating, setRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const starImgFilled =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png";
  const starImgCorner =
    "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png";

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setRating(item)}
            >
              <Image
                style={styles.starImgStyle}
                source={
                  item <= rating
                    ? { uri: starImgFilled }
                    : { uri: starImgCorner }
                }
              ></Image>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textStyle}>Please rate your swap</Text>
      <CustomRatingBar />
      <Text style={styles.textStyle}>{rating + " / " + maxRating.length}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.buttonStyle}
        onPress={() => {
          sendRatingToUser(rating, username);
        }}
      >
        <Text>Submit Your Rating</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 23,
  },
  customRatingBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
  },
  starImgStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    padding: 15,
    backgroundColor: "green",
  },
});

export default StarRatingForm;
