import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';

import { setModalVisible } from '~/store/modules/modal/actions';

import {
  Container,
  ExpoCamera,
  Bottom,
  Top,
  Button,
  Modal,
  ModalContainer,
  ModalBottom,
  CloseButton,
  ConfirmButton,
  ImagePreview,
  Icon,
  TakePhoto,
} from './styles';

function CustomCamera({ onTakePicture }) {
  const dispatch = useDispatch();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const camRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={{ color: '#fff' }}>No access to camera</Text>;
  }

  function closeCamera() {
    dispatch(setModalVisible({ visible: false, key: 'camera' }));
  }

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        'Permissão requerida!',
        'É necessário conceder acesso a galeria de fotos!'
      );
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      setCapturedPhoto(pickerResult);
      setModalOpen(true);
    }
  };

  function confirmPicture() {
    onTakePicture(capturedPhoto);
    closeCamera();
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync({
        quality: 0.1,
      });
      setCapturedPhoto(data);
      setModalOpen(true);
    }
  }

  return (
    <Container>
      <ExpoCamera type={type} ref={camRef}>
        <Top>
          <Button onPress={closeCamera}>
            <Icon name="times" color="#fff" />
          </Button>
        </Top>
        <Bottom>
          <Button
            style={{}}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Icon name="undo" color="#fff" />
          </Button>
          <Button onPress={takePicture}>
            <TakePhoto />
          </Button>
          <Button onPress={openImagePickerAsync}>
            <Icon name="image" color="#fff" />
          </Button>
        </Bottom>
      </ExpoCamera>

      {capturedPhoto && (
        <Modal animationType="slide" transparent={false} visible={modalOpen}>
          <ModalContainer>
            <ImagePreview
              resizeMode={capturedPhoto.type ? 'contain' : 'cover'}
              source={{ uri: capturedPhoto.uri }}
            />

            <ModalBottom>
              <CloseButton onPress={() => setModalOpen(false)}>
                <Icon name="times" color="#000" />
              </CloseButton>
              <ConfirmButton onPress={confirmPicture}>
                <Icon name="check" color="#fff" />
              </ConfirmButton>
            </ModalBottom>
          </ModalContainer>
        </Modal>
      )}
    </Container>
  );
}

export default CustomCamera;
