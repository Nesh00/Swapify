import { View, Text, StyleSheet } from 'react-native';
import VerticalList from '../Reusable/VerticalList';

const UserSwaps = () => {
  return (
    <View style={styles.userListContainer}>
      <Text style={styles.userListHeader}>Swaps</Text>
      <VerticalList />
    </View>
  );
};

export default UserSwaps;

const styles = StyleSheet.create({
  userListContainer: {
    flex: 1,
    paddingTop: '5%',
    paddingHorizontal: '3%',
    backgroundColor: '#fff',
  },
  userListHeader: {
    marginBottom: '20%',
    fontSize: 25,
  },
});
