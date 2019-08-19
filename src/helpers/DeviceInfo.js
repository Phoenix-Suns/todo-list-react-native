import { Platform, Dimensions, PixelRatio } from 'react-native';

const ScaleRatio = 1;
const iOSDisplayScale = Dimensions.get('window').height / 667
const androidDisplayScale = (Dimensions.get('window').height * PixelRatio.get()) > 1920
  ? 0.9
  : (Dimensions.get('window').height / 667);

export default {
  displayScale: ((Platform.OS === 'ios') ? iOSDisplayScale : androidDisplayScale) * ScaleRatio,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
