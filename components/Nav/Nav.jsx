import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Fontisto, MaterialIcons } from '@expo/vector-icons';
import Menu from './Menu';

const Nav = () => {
  const [isPressed, setIsPressed] = useState(false);
  const navigation = useNavigation();

  const menuOpenHandler = () => {
    setTimeout(() => {
      setIsPressed((currPress) => !currPress);
    }, 50);
  };

  const navigationHandler = (componentName) => {
    navigation.navigate(componentName);
    setIsPressed(false);
  };

  return (
    <>
      <View style={styles.navContainer}>
        <TouchableOpacity>
          <Ionicons
            name='home'
            size={26}
            color='#6b6565'
            onPress={() => navigationHandler('Home')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigationHandler('Marketplace')}>
          <Fontisto name='shopping-store' size={20} color='#6b6565' />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name='message' size={24} color='#6b6565' />
        </TouchableOpacity>
        <TouchableOpacity onPress={menuOpenHandler}>
          {!isPressed ? (
            <Ionicons name='ios-menu-sharp' size={30} color='#6b6565' />
          ) : (
            <Ionicons name='close-sharp' size={30} color='#6b6565' />
          )}
        </TouchableOpacity>
      </View>
      <Menu navigationHandler={navigationHandler} isPressed={isPressed} />
    </>
  );
};
export default Nav;

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc9c9',
  },
});
