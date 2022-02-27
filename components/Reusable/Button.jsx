import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const Button = ({ btnText, navigationHandler, onSubmit, disabled }) => {
  const btns = ["My List", "Swaps", "Add Item"];

  const eventsHandler = () => {
    onSubmit && onSubmit();
    navigationHandler && navigationHandler(btnText);
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.btn,
        !btns.includes(btnText) && styles.bigBtns,
        btnText === "Delete account" && styles.red,
      ]}
      onPress={eventsHandler}
    >
      <Text style={styles.btnText}>{btnText}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    width: "90%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#3871f3",
    elevation: 2,
    borderRadius: 5,
    justifyContent: "center",
    alignContent: "center",
  },
  btnText: {
    fontSize: 16,
    paddingVertical: 5,
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    color: "#fff",
  },
  bigBtns: {
    width: "90%",
  },
  red: {
    backgroundColor: "#de0a0a",
  },
});
