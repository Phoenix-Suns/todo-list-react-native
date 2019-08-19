import {
  Platform,
  Dimensions,
  PixelRatio,
  StyleSheet,
  StatusBar
} from "react-native";
import DeviceInfo from "../helpers/DeviceInfo";

export const AppImages = {
  LOGO: require("../assets/images/logo.png")
};

export const AppFonts = {};

export const DefaultProps = {
  navigationBarDefaultHeight: 44 * DeviceInfo.displayScale,
  logoDefaultWidth: 150 * DeviceInfo.displayScale,
  buttonDefaultWidth: 196 * DeviceInfo.displayScale,
  tabNavigatorDefaultHeight: 60 * DeviceInfo.displayScale,
  toastDefaultCloseDelay: 200,
  loadingIconSize: 50 * DeviceInfo.displayScale,
  avatarSize: 120 * DeviceInfo.displayScale,
  iconHeaderUserProfileWidth: 32 * DeviceInfo.displayScale,
  iconHeaderNotificationWidth: 32 * DeviceInfo.displayScale,
  iconHeaderStarWidth: 25 * DeviceInfo.displayScale
};

export const Colors = {
  main: "#005083",
  background: "#F6F6F6",
  blackBlur: "#00000088",
  grayBlur: "#969696"
};

export const AppStyles = StyleSheet.create({
  // #region Header
  statusBar: {
    height: Platform.OS === "ios" ? 20 : StatusBar.currentHeight
  },

  header: {
    height: DefaultProps.navigationBarDefaultHeight,
    backgroundColor: Colors.main,
    paddingHorizontal: 16 * DeviceInfo.displayScale
  },

  headerEmpty: {
    height: DefaultProps.navigationBarDefaultHeight,
    backgroundColor: Colors.main,
    borderBottomWidth: 0,
    elevation: 0
  },

  headerTitle: {
    flex: 1,
    // alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontSize: 17 * DeviceInfo.displayScale,
    fontWeight: "bold"
  },
  // #endregion

  // #region Button
  buttonAction: {
    width: 32 * DeviceInfo.displayScale,
    height: 32 * DeviceInfo.displayScale
  },
  // #endregion

  // #region ERROR
  errorContain: {
    borderColor: "transparent"
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start"
  },
  // #endregion

  //#region FORM
  inputTitle: {
    width: '100%',
    height: 32 * DeviceInfo.displayScale
  },
  input: {
    height: 40 * DeviceInfo.displayScale, 
    width: '100%', 
    textAlignVertical: 'center'
  },
  //#endregion

  loadingView: {
    flex: 1,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    backgroundColor: Colors.blackBlur
  },

  toastContainer: {
    marginHorizontal: 50 * DeviceInfo.displayScale,
    borderRadius: 3 * DeviceInfo.displayScale,
    backgroundColor: "black"
  },

  toastText: {
    paddingVertical: 5 * DeviceInfo.displayScale,
    paddingHorizontal: 10 * DeviceInfo.displayScale,
    textAlign: "center",
    color: "white",
    fontSize: 14 * DeviceInfo.displayScale,
    fontWeight: "bold"
  },

  contentContainer: {
    backgroundColor: Colors.background,
    flex: 1
  }
});
