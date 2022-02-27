import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';
import Logo from './Logo';
import ItemsSlider from './ItemsSlider';
import AddItem from '../User/AddItem';
import DeleteItem from '../User/DeleteItem';
import { useState } from 'react';


const Home = () => {
  return (
    <SafeAreaView style={styles.homeContainer}>
      <ScrollView>
        <StatusBar default />
        <Logo />
        <ItemsSlider category={'All'} />
        <DeleteItem />
        <AddItem />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
