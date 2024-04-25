import axios from 'axios';
import React, {useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CameraOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {ToastAndroid} from 'react-native';

export const errorToastify = async (messgae: string) => {
  ToastAndroid.show(messgae, 200000);
};

const Camera = () => {
  let options: CameraOptions = {
    saveToPhotos: true,
    mediaType: 'photo',
  };
  const [cameraPhoto, setCameraPhoto] = useState<string | undefined>();
  const [galleryPhoto, setGalleryPhoto] = useState<string | undefined>();

  const opencamera = async () => {
    const result = await launchCamera(options);
    setCameraPhoto(result?.assets?.[0].uri);
  };

  const openGallety = async () => {
    const result = await launchImageLibrary(options);
    setGalleryPhoto(result?.assets?.[0].uri);
  };

  const uploadCameraPhoto = async () => {
    const formData = new FormData();
    formData.append('image', cameraPhoto);
    await axios
      .post(
        'http://192.168.0.119:3000/api/user/reactnative/fileupload',
        formData,
        {
          headers: {
            'Content-Type':
              'multipart/form-data; boundary=<calculated when request is sent>',
          },
        },
      )
      .catch(e => {
        if (e) {
          errorToastify('file failed due to catch' + e);
        }
      });
  };

  const uploadGalleryPhoto = async () => {
    const formData = new FormData();
    formData.append('image', galleryPhoto);
    await axios
      .post(
        'http://192.168.0.119:3000/api/user/reactnative/fileupload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
          },
        },
      )
      .catch(e => {
        if (e) {
          errorToastify('file failed due to catch' + e);
        }
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          resizeMode="contain"
          style={styles.img}
          source={{
            uri: cameraPhoto,
          }}
        />
        <TouchableOpacity style={styles.btmCam} onPress={() => opencamera()}>
          <Text style={styles.txtbtn}>Open Camera</Text>
        </TouchableOpacity>
        <Button
          title="Upload camera photo"
          onPress={() => uploadCameraPhoto()}
        />

        <Image
          resizeMode="contain"
          style={styles.img}
          source={{
            uri: galleryPhoto,
          }}
        />

        <TouchableOpacity style={styles.btmCam} onPress={() => openGallety()}>
          <Text style={styles.txtbtn}>Open Gallery</Text>
        </TouchableOpacity>
        <Button
          title="Upload camera photo"
          onPress={() => uploadGalleryPhoto()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: '100%',
    height: 300,
    alignSelf: 'center',
  },
  btmCam: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    borderRadius: 6,
    backgroundColor: 'green',
  },
  txtbtn: {
    color: '#fff',
  },
});

export default Camera;
