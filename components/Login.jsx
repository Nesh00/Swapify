import { useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from './Button';
import Logo from './Home/Logo';

const { width, height } = Dimensions.get('screen');

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const onSubmit = () => {
    // Need to implement User authentication with Firebase?
    // When logged in the menu needs to change to the loggedInMenu
    navigation.navigate('Home');
    setUsername('');
    setPassword('');
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.loginCard}>
        <Logo />
        <TextInput
          style={{ ...styles.loginInput, marginTop: 20 }}
          value={username}
          placeholder='Enter Username'
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.loginInput}
          value={password}
          placeholder='Enter Password'
          onChangeText={setPassword}
        />
        <Button btnText={'Login'} onSubmit={onSubmit} />
      </View>
      <TouchableOpacity>
        <Text style={styles.register}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '30%',
    backgroundColor: '#fff',
  },
  loginHeader: {
    fontSize: 22,
    marginBottom: 20,
  },
  loginCard: {
    alignItems: 'center',
    width: width,
  },
  loginInput: {
    width: '65%',
    marginBottom: 18,
    padding: 9,
    fontSize: 17,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc9c9',
  },
  register: {
    fontSize: 17,
    color: '#0000ff',
  },
});