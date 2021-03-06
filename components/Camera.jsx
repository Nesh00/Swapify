import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  AppState,
} from 'react-native';
import { Camera } from 'expo-camera';
import { useState, useEffect } from 'react';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import finger from '../images/finger.png';

const CameraPage = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [aState, setAppState] = useState(AppState.currentState);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [ratio, setRatio] = useState('4:3');
  const [userPhoto, setUserPhoto] = useState(null);
  let camera;

  useEffect(() => {
    let isMounted = true;
    const appStateListener = AppState.addEventListener(
      'change',
      (nextAppState) => {
        isMounted && setAppState(nextAppState);
      }
    );
    return () => {
      appStateListener?.remove();
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const { status2 } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      setUserPhoto(uri);
      MediaLibrary.saveToLibraryAsync(uri);
      // userPhoto && updateProfile(auth.currentUser, { photoURL: userPhoto });
    }
  };

  const closeCamera = () => {
    navigation.navigate('User', { userPhoto });
  };

  const flipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
    setRatio(type === Camera.Constants.Type.back ? '4:3' : '1:1');
  };

  const openFlash = () => {
    setFlash(
      flash === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  };

  return aState === 'background' || hasPermission === false ? (
    <View />
  ) : (
    <View style={styles.cameraContainer}>
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        ratio={ratio}
        ref={(ref) => (camera = ref)}
      >
        <View style={styles.cameraTopBtns}>
          <TouchableOpacity onPress={openFlash}>
            {flash ? (
              <Ionicons
                name='md-flash-sharp'
                size={40}
                color='rgba(255,255,255, 0.65)'
              />
            ) : (
              <Ionicons
                name='md-flash-off-sharp'
                size={40}
                color='rgba(255,255,255, 0.65)'
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.cameraBottomBtns}>
          <TouchableOpacity onPress={closeCamera}>
            <Ionicons
              name='arrow-back-circle-outline'
              size={57}
              style={styles.cameraBtn}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.takePhotoBtn} onPress={takePicture}>
            <FontAwesome
              name='circle'
              size={80}
              color='rgba(255,255,255, 0.65)'
            />
            <Image source={finger} style={styles.fingerBtn} />
          </TouchableOpacity>
          <TouchableOpacity onPress={flipCamera}>
            <MaterialIcons
              name='flip-camera-android'
              size={50}
              style={styles.cameraBtn}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraPage;

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraTopBtns: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '3%',
  },
  cameraBottomBtns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: '20%',
  },
  takePhotoBtn: {
    borderWidth: 3,
    borderColor: 'rgba(255,255,255, 0.6)',
    borderRadius: 180,
    padding: 10,
    backfaceVisibility: 'hidden',
  },
  fingerBtn: {
    width: 50,
    height: 60,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  cameraBtn: {
    backfaceVisibility: 'hidden',
    color: 'rgba(255, 255, 255, 0.65)',
  },
});
