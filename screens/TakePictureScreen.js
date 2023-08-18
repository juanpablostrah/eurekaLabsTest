import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

import PhotoButton from '../components/PhotoButton';

const TakePictureScreen = ({route, navigation}) => {
  const {setUris, uris} = route.params;
  const camera = useRef(null);
  const devices = useCameraDevices('wide-angle-camera');
  const [cameraPermission, setCameraPermission] = useState(false);
  const [resolvingCameraPermission, setResolvingCameraPermission] =
    useState(true);

  const mockupImage =
    'https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80';

  const device = devices.back;

  useEffect(() => {
    let cancel = false;
    async function requestCameraPermission() {
      const cameraPermissionStatus = await Camera.getCameraPermissionStatus();
      if (cancel) {
        return;
      }
      if (cameraPermissionStatus === 'authorized') {
        setCameraPermission(true);
      } else if (cameraPermissionStatus === 'not-determined') {
        const newCameraPermission = await Camera.requestCameraPermission();
        if (cancel) {
          return;
        }
        if (newCameraPermission === 'authorized') {
          setCameraPermission(true);
        }
      }
      setResolvingCameraPermission(false);
    }

    requestCameraPermission();
    return () => {
      cancel = true;
    };
  }, []);

  const handlePhoto = async () => {
    let newUri = '';
    if (camera.current !== null) {
      const options = {base64: true};
      const photo = await camera.current?.takePhoto(options);
      newUri = photo?.path;
    } else {
      newUri = mockupImage;
    }
    if (newUri) {
      setUris([...uris, newUri]);
    }
    return navigation.navigate('Picture', {newUri});
  };

  return resolvingCameraPermission ? (
    <View>{/* resolving permission */}</View>
  ) : cameraPermission ? (
    <View style={styles.container}>
      {!device ? (
        <Image
          style={{width: 400, height: 400, margin: 10, objectFit: 'contain'}}
          source={{uri: mockupImage}}
        />
      ) : (
        <Camera
          ref={camera}
          style={styles.cameraPreview}
          device={device}
          isActive={true}
          photo={true}
        />
      )}
      <View>
        <PhotoButton handlePhoto={handlePhoto}></PhotoButton>
      </View>
    </View>
  ) : (
    <View>
      <Text>cammera permission denied</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  shareButton: {
    width: '50%',
    borderRadius: 10,
    marginTop: 40,
    backgroundColor: 'blue',
    padding: 10,
    display: 'flex',
    alignSelf: 'center',
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
  },
  cameraPreview: {
    flex: 1,
  },
});

export default TakePictureScreen;
