import { StyleSheet, Text, View } from 'react-native';

export const ErrorMsg = ({ errorMsg }) => {
  return (
    <View style={styles.errorMsgContainer}>
      <Text style={styles.errorMsg}>{errorMsg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMsg: {
    marginBottom: 5,
    fontSize: 15,
    color: '#ff0000',
  },
});
