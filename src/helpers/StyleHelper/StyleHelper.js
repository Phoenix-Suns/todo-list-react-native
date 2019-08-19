import { StyleSheet } from 'react-native';
import Dimens from './DimenHelper';
import Colors from './ColorHelper';
import DeviceInfo from '../DeviceInfo';

const BUTTON_ACTION_SIZE = 30 * DeviceInfo.displayScale;

export default {
  global: StyleSheet.create({
    inline: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    1: { flex: 1 },
    2: { flex: 2 },
    3: { flex: 3 },
    4: { flex: 4 },
    5: { flex: 5 },
    6: { flex: 6 },
    7: { flex: 7 },
    8: { flex: 8 },
    9: { flex: 9 },
    10: { flex: 10 },
  }),

  // ========= TEXT =========
  text: StyleSheet.create({
    h1: { 
      fontSize: Dimens.text.h1,
      fontWeight: 'normal',
    },
    h2: {
      fontSize: Dimens.text.h2,
      fontWeight: 'normal',
    },
    h3: {
      fontSize: Dimens.text.h3,
      fontWeight: 'normal',
    },
    h4: {
      fontSize: Dimens.text.h4,
      fontWeight: 'normal',
    },
    h5: {
      fontSize: Dimens.text.h5,
      fontWeight: 'normal',
    },
    h6: {
      fontSize: Dimens.text.h6,
      fontWeight: 'bold',
      color: Colors.text.light.base
    },
    h7: {
      fontSize: Dimens.text.h7,
      fontWeight: 'bold',
      color: Colors.text.light.base
    },
    subtitle_1: {
      fontSize: Dimens.text.subtitle_1,
      fontWeight: 'normal',
    },
    subtitle_2: {
      fontSize: Dimens.text.subtitle_2,
      fontWeight: 'bold',
    },
    body_1: {
      fontSize: Dimens.text.body_1,
      fontWeight: 'normal',
    },
    body_2: {
      fontSize: Dimens.text.body_2,
      fontWeight: 'normal',
    },
    button: {
      fontSize: Dimens.text.button,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: Dimens.text.caption,
      fontWeight: 'normal',
    },
    overline: {
      fontSize: Dimens.text.overline,
      fontWeight: 'normal',
    },
  }),

  // ========= BUTTON =========
  button: StyleSheet.create({

    add: {
      tintColor: Colors.basic.green,
      width: BUTTON_ACTION_SIZE,
      height: BUTTON_ACTION_SIZE,
    },
    edit: {
      tintColor: Colors.basic.orange,
      width: BUTTON_ACTION_SIZE,
      height: BUTTON_ACTION_SIZE,
    },
    delete: {
      tintColor: Colors.basic.red,
      width: BUTTON_ACTION_SIZE,
      height: BUTTON_ACTION_SIZE,
    },
  }),

  // ========= LIST =========
  listItem: StyleSheet.create({
    container: {
      flexDirection: 'row',
    },

    // ---- left ------
    left: {
      paddingHorizontal: Dimens.spacing.large,
      justifyContent: 'center',
    },

    // ----- Body: contain center-right ----
    body: {
      flex: 1,
      paddingVertical: Dimens.spacing.large,
      borderBottomWidth: 1,
      borderColor: Colors.app.dividers,
    },

    // ---- right ------
    right: {
      flexDirection: 'row',
      paddingHorizontal: Dimens.spacing.large,
      alignItems: 'center',
    },
    right_button: {
      paddingVertical: Dimens.spacing.large,
      paddingHorizontal: Dimens.spacing.small,
    },

    // ---- center ------
    center: {
      flex: 1,
    },
  }),

  // ========= FORM =========
};
