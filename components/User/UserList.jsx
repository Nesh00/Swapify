import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../Reusable/Button';
import VerticalList from '../Reusable/VerticalList';
import { auth } from '../../firebase';

const UserList = () => {
  const navigation = useNavigation();

  const navigationHandler = (screen) => {
    console.log(screen)
    navigation.navigate(screen);
  };

  return (
    <View style={styles.userListContainer}>
      <Text style={styles.userListHeader}>My List</Text>
      <Button btnText={'Add Item'} navigationHandler={navigationHandler} />
      <VerticalList
        props={{
          sortBy: 'posted_at desc',
          user: auth.currentUser.displayName,
        }}
      />
    </View>
  );
};

export default UserList;

const styles = StyleSheet.create({
  userListContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingTop: '5%',
    paddingHorizontal: '3%',
    backgroundColor: '#fff',
  },
  userListHeader: {
    alignSelf: 'flex-start',
    marginBottom: '20%',
    fontSize: 25,
  },
});
