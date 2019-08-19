import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DeviceInfo from '../DeviceInfo';

const SCALE = DeviceInfo.displayScale;

const AppViewInline = ({ style, labelText, infoText, children, leftView, rightView }) => {
  return (
    <View style={[styles.container, style]}>
      { leftView }
      <Text style={styles.textLabel}>
        { `${labelText}: ` }
      </Text>
      <Text style={styles.textInfo}>
        { infoText }
      </Text>
      { children }
      { rightView }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textLabel: {
    fontSize: 16 * SCALE,
    color: '#0000008A',
  },

  textInfo: {
    fontSize: 16 * SCALE,
    color: '#000000DE',
  }
});

export default AppViewInline;
