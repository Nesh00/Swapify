import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';
import Logo from './Logo';
import ItemsSlider from './ItemsSlider';
import HomeVideo from './HomeVideo';

const Home = () => {
  return (
    <SafeAreaView style={styles.homeContainer}>
      <ScrollView>
        <StatusBar default />
        <Logo />
        <HomeVideo />
        <ItemsSlider />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    paddingVertical: '5%',
    backgroundColor: '#fff',
  },
});
