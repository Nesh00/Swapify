import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { Formik } from 'formik'
import { useState, useEffect } from 'react';
import postItem from '../../utils/postItem';
import getCategories from '../../utils/getCategories';

const AddItem = () => {
  const [ categories, setCategories ] = useState([]); 

  useEffect(() => {
    getCategories().then((categoriesFromDb) => {
      setCategories(categoriesFromDb);
    })
  }, []);

  return (
    <SafeAreaView style={styles.addItemContainer}>
      <Formik
        initialValues={{title: '', img: '', description: '', category: '', username: ''}}
        onSubmit={(values, actions) => { 
          actions.resetForm();
          values.posted_at = Date.now();
          postItem(values);
     }}
    >
      {(props)=>(
        <View>
          <Text>Add your listing below</Text>
          <Text>Title</Text>
          <TextInput
            placeholder='Tell us what you are listing...'
            style={styles.input}
            value={props.values.title}
            onChangeText={props.handleChange('title')}
          />
          <Text>Image URL:</Text>
           <TextInput
            placeholder='Paste in your image URL...'
            style={styles.input}
            value={props.values.img}
            onChangeText={props.handleChange('img')}

          />
          <Text>Description:</Text>
           <TextInput
            placeholder={'Tell us a bit about your item...'}
            style={styles.input}
            value={props.values.description}
            onChangeText={props.handleChange('description')}
            
          />
          <Text>Username:</Text>
           <TextInput
            style={styles.input}
            value={props.values.username}
            onChangeText={props.handleChange('username')}
           
          />
          <Text>Please select a category:</Text>
          <Picker
            enabled={true}
            placeholder= 'Select your category'
            selectedValue={props.values.category}
            onValueChange={props.handleChange('category')}
          >

          {categories.map((category) => {
            return (
              <Picker.Item
              label={category}
              value={category}
              key={category}/>
            )
          })}
           </Picker> 
          <Button onPress={props.handleSubmit} title='Submit'/>
        </View>
      )}
    </Formik>
    </SafeAreaView>
  )
};

export default AddItem;

const styles = StyleSheet.create({
  addItemContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    margin: 15,
    borderColor: 'black',
    borderWidth: 1
  }
});
