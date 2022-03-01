import { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../Reusable/Button';
import Logo from '../Home/Logo';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { UserContext } from '../../contexts/UserContext';
import { ErrorMsg } from '../Error';
import { formatErrorMsg } from '../../utils/formatErrorMsg';
import Loader from '../Reusable/Loader';

const { width } = Dimensions.get('screen');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [loginDetails, setLoginDetails] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { setLoggedInUser } = useContext(UserContext);
  const navigation = useNavigation();

  const signin = () => {
    setLoginDetails({ email: email, password: password });
  };

  useEffect(() => {
    let isMounted = true;

    loginDetails &&
      signInWithEmailAndPassword(
        auth,
        loginDetails.email,
        loginDetails.password
      )
        .then((userCredentials) => {
          setIsLoaded(true);

          return userCredentials;
        })
        .then((userCredentials) => {
          isMounted && setLoggedInUser(userCredentials);
          navigation.navigate('Home');
          setEmail('');
          setPassword('');
          setErrorMsg(null);
        })
        .catch((err) => {
          setErrorMsg(formatErrorMsg(err.message));
        });

    return () => {
      isMounted = false;
      setIsLoaded(false);
    };
  }, [loginDetails]);

  const register = () => {
    navigation.navigate('Register');
  };

  return isLoaded ? (
    <Loader />
  ) : (
    <KeyboardAvoidingView style={styles.loginContainer} behavior='height'>
      <SafeAreaView>
        <ScrollView
          KeyboardDismissMode='interactive'
          keyboardsHoldPersist='always'
        >
          <Logo />
          <View style={styles.loginCard}>
            {errorMsg && <ErrorMsg errorMsg={errorMsg} />}
            <TextInput
              style={{ ...styles.loginInput }}
              value={email}
              placeholder='Email address'
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.loginInput}
              value={password}
              placeholder='Password'
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            <Button btnText={'Login'} onSubmit={signin} />

            <TouchableOpacity onPress={register}>
              <Text style={styles.register}>
                Don't have an account? Register
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    padding: '5%',
    backgroundColor: '#fff',
  },
  loginCard: {
    alignItems: 'center',
    width: width - 35,
    marginTop: 10,
    position: 'relative',
  },
  loginInput: {
    width: '90%',
    marginBottom: 18,
    padding: 9,
    fontSize: 17,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: '#ccc9c9',
  },
  register: {
    marginTop: 30,
    fontSize: 17,
    color: '#0000ff',
  },
});
