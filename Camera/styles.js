import styled from 'styled-components/native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';

import TakePhotoSvg from '~/assets/images/take-photo.svg';

import { metrics, normalize } from '~/styles';

export const Container = styled.View`
  flex: 1;
`;

export const ExpoCamera = styled(Camera)`
  flex: 1;
  /* height: ${metrics.screenHeight}px; */
  width: ${metrics.screenWidth}px;
  justify-content: space-between;
  padding: ${metrics.basePadding}px;
  margin-bottom: -20px;
`;

export const Bottom = styled.View`
  flex-direction: row;
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  padding: ${metrics.basePadding * 2}px;
`;

export const Top = styled.SafeAreaView`
  flex-direction: row;
  margin-top: ${metrics.baseMargin}px;
`;

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.Modal``;

export const ModalContainer = styled.View`
  flex: 1;
`;

export const ModalBottom = styled.View`
  height: ${normalize(70)}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const CloseButton = styled.TouchableOpacity`
  height: ${normalize(70)}px;
  width: ${normalize(70)}px;
  justify-content: center;
  align-items: center;
`;

export const ConfirmButton = styled.TouchableOpacity`
  height: ${normalize(70)}px;
  width: ${normalize(70)}px;
  background: ${props => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

export const ImagePreview = styled.Image`
  flex: 1;
  width: 100%;
`;

export const Icon = styled(FontAwesome).attrs({
  size: normalize(25),
})``;

export const TakePhoto = styled(TakePhotoSvg)``;
