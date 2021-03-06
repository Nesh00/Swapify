import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Button from '../Reusable/Button';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { auth } from '../../firebase';
import { deleteUser } from 'firebase/auth';
import getItems from '../../utils/getItems';
import deleteItem from '../../utils/deleteItem';
import { getLocation } from '../../utils/getLocation';

const { width } = Dimensions.get('screen');
const menuW = width * 0.5;
const menuH = menuW * 1;

const User = () => {
  const navigation = useNavigation();
  const { loggedInUser, isLoggedIn } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');

  const openCamera = () => {
    navigationHandler('Camera');
  };

  const navigationHandler = (screen) => {
    navigation.navigate(screen);
  };

  useEffect(() => {
    getLocation(auth.currentUser.email)
      .then((user) => {
        setLocation(user[0].userLocation);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deletePrompt = () => {
    Alert.alert(
      'Are you sure?',
      'This will delete your account along with any listings you have made',
      [
        {
          text: 'On 2nd thought...',
        },
        {
          text: 'yep, delete',
          onPress: () =>
            getItems('All', 'posted_at desc', auth.currentUser.displayName)
              .then((items) => {
                setLoading(true);
                items.forEach((item) => deleteItem(item.id));
              })
              .then(() => {
                deleteUser(auth.currentUser);
              })
              .then(() => {
                Alert.alert('Success', 'Account deleted successfully');
                navigation.navigate('Home');
              })
              .catch((err) => {
                console.log(err);
              }),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.userContainer}>
      <View style={styles.userCard}>
        {isLoggedIn && !loggedInUser.user.photoURL ? (
          <SvgUri
            style={styles.userAvatar}
            uri={`https://avatars.dicebear.com/api/avataaars/${loggedInUser.createdAt}
            .svg`}
          />
        ) : (
          <Image
            style={styles.userImg}
            source={{ uri: auth.currentUser.photoURL }}
          />
        )}
      </View>
      <Text style={styles.userName}>
        {auth.currentUser && auth.currentUser.displayName}
      </Text>
      <Text style={styles.userLocation}>
        <Ionicons name='md-location-sharp' size={20} color='#6b6565' />
        {location}, UK
      </Text>
      <View style={styles.showBtnsContainer}>
        <Button btnText={'My List'} navigationHandler={navigationHandler} />
        <Button btnText={'Delete account'} onSubmit={deletePrompt} />
      </View>
    </SafeAreaView>
  );
};
export default User;

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f3f3',
  },
  userCard: {
    position: 'relative',
    width: menuW,
    height: menuH,
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 180,
    elevation: 5,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, .4)',
    backgroundColor: '#fff',
  },
  cameraIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
  },
  userAvatar: {
    width: menuW - 45,
    height: menuH - 45,
    borderRadius: 180,
    alignSelf: 'center',
  },
  userImg: {
    width: menuW,
    height: menuH,
    alignSelf: 'center',
    borderRadius: 180,
  },
  userName: {
    fontSize: 22,
  },
  userLocation: {
    marginVertical: 10,
    fontSize: 16,
  },
  showBtnsContainer: {
    marginVertical: 30,
  },
});
