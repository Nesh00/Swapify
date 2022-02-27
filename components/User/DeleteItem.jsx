import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View} from 'react-native';
import { Formik } from 'formik'
import deleteItem from '../../utils/deleteItem';





const DeleteItem = () => {
    
        return (
            <View>
              <Formik
                initialValues={{id: ''}}
                onSubmit={(values, actions) => { 
                  actions.resetForm();
                  deleteItem(values);
                }}
              >
              {(props) => (
                 <View>
                  <Text>Enter ID of item to delete</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder='Enter id here'
                    onChangeText={props.handleChange('id')}
                    value={props.values.id}
                  />
                  <Button title='Submit' onPress={props.handleSubmit} />
                </View>
             )}   
              </Formik>
            </View>
        )
}    

const styles = StyleSheet.create({
        input: {
          margin: 15,
          borderColor: 'black',
          borderWidth: 1
        }
      })
    //   {({handleChange, handleSubmit, values})=>(
    //     <Form
    //     onSubmit={handleSubmit}>
    //       <Text>Enter ID of item to delete</Text>
    //       <TextInput 
    //         style={styles.input}
    //         placeholder='Enter id here'
    //         value={values.id}
    //         onChangeText={handleChange('id')}/>
     
    //       <Button onPress={handleSubmit} title="Submit"/><br></br>
        
    //       </Form>
    //     )}  



    // useEffect(() => {
        
    // }, []);
   // return (
    
// change for on click of the item in final version
     
            // <Formik
            //   initialValues={{id: ''}}
            //   onSubmit={(values) => {
            //       console.log('submitting', values);
                  
            //   }}
            // >
            // {({handleChange, handleSubmit, values}) => {
            //   <View>
            //     <Text>ID of item to delete</Text>
            //     <TextInput
            //       placeholder='Please enter the id of the item to delete.'
            //       value={values.id}
            //       onChangeText={handleChange('id')}
            //     />
            //     <Button onPress={handleSubmit} title='Submit'/>
            //   </View>
            // }}
            
            // </Formik>
      
    //)
  

export default DeleteItem;