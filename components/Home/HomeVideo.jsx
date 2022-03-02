import { View, StyleSheet, Dimensions } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { useRef, useState, useEffect } from 'react';

const { width } = Dimensions.get('screen');
const videoW = width * 1;
const videoH = videoW * 0.56;

const HomeVideo = () => {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  useEffect(() => {
    (() => {
      video.current.playAsync();
    })();
  }, []);

  return (
    <View style={styles.videoContainer}>
      <View style={styles.videoOverlay}></View>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        isMuted={true}
        resizeMode='contain'
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
};
export default HomeVideo;

const styles = StyleSheet.create({
  videoContainer: {
    position: 'relative',
    marginVertical: 20,
    height: videoH,
    width: videoW,
  },
  videoOverlay: {
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    height: videoH,
    width: videoW,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  video: {
    position: 'absolute',
    zIndex: 1,
    height: videoH,
    width: videoW,
  },
});
