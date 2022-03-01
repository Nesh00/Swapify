import { Picker } from '@react-native-picker/picker';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import getCategories from '../../utils/getCategories';
import { serverTimestamp } from 'firebase/firestore';
import { auth, uploadItemImg } from '../../firebase';
import * as ImagePicker from 'expo-image-picker';
import Button from '../Reusable/Button';
import postItem from '../../utils/postItem';
import { useNavigation } from '@react-navigation/native';
import Loader from '../Reusable/Loader';

const AddItem = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(1);

  const pickImage = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    }).then((result) => {
      if (!result.cancelled) {
        setImage(result.uri);
      }
    });
  };

  useEffect(() => {
    getCategories().then((categoriesFromDb) => {
      setCategories(categoriesFromDb);
    });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.addItemContainer}>
      <Formik
        initialValues={{ title: '', image, description: '', category: '' }}
        onSubmit={(values, actions) => {
          actions.resetForm();
          values.posted_at = serverTimestamp();
          values.username = auth.currentUser.displayName;

          values.title &&
            values.description &&
            values.category &&
            image &&
            uploadItemImg(
              counter,
              image,
              auth.currentUser,
              setLoading,
              values.title
            )
              .then((photoURL) => {
                postItem(values, photoURL);
                setCounter((currCount) => currCount + 1);
                setLoading(false);
                return photoURL;
              })
              .then((photoURL) =>
                navigation.navigate('Item', { ...values, img: photoURL })
              );
        }}
      >
        {(props) => (
          <View style={styles.form}>
            <Text style={styles.formHeader}>Add your listing below</Text>
            <Text style={styles.label}>Please select a category:</Text>
            <Picker
              enabled={true}
              placeholder='Select your category'
              selectedValue={props.values.category}
              onValueChange={props.handleChange('category')}
            >
              {categories.map((category) => {
                return (
                  <Picker.Item
                    label={category}
                    value={category}
                    key={category}
                  />
                );
              })}
            </Picker>
            <Text style={styles.label}>Title</Text>
            <TextInput
              placeholder='Tell us what you are listing...'
              style={styles.input}
              value={props.values.title}
              onChangeText={props.handleChange('title')}
            />
            <Text style={styles.label}>Description:</Text>
            <TextInput
              placeholder={'Tell us a bit about your item...'}
              style={styles.input}
              value={props.values.description}
              onChangeText={props.handleChange('description')}
            />
            <Button
              btnText={!image ? 'Add photo' : 'Change photo'}
              onSubmit={pickImage}
            />
            {image ? (
              <Image style={styles.displayPic} source={{ uri: image }} />
            ) : null}
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={props.handleSubmit}
            >
              <Text style={styles.submitBtnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  addItemContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: '5%',
  },
  formHeader: {
    marginBottom: 50,
    fontSize: 25,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    marginBottom: 18,
    padding: 9,
    fontSize: 17,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#ccc9c9',
  },
  submitBtn: {
    paddingVertical: 10,
    backgroundColor: '#3871f3',
    elevation: 2,
    borderRadius: 5,
  },
  submitBtnText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  displayPic: {
    alignSelf: 'center',
    height: 130,
    width: 130,
    marginVertical: 10,
    borderColor: '#0000ff',
    borderWidth: 2,
    borderRadius: 5,
  },
});
