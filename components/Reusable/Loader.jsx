import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AnimatedLoader from 'react-native-animated-loader';

const Loader = (loadingText) => {
  return (
    <AnimatedLoader
      visible={true}
      overlayColor='rgba(255,255,255,0.75)'
      animationStyle={styles.lottie}
      speed={1}
    >
      <Text>Account is being registered</Text>
    </AnimatedLoader>
  );
};

export default Loader;

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
