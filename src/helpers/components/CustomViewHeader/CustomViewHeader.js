import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import DeviceInfo from '../../DeviceInfo';
import CustomButtonText from '../CustomButtonText/CustomButtonText';

const ICON_BACK = require('../../assets/images/ic_back.png');

const DisplayScale = DeviceInfo.displayScale;

const CustomViewHeader = ({ children, titleText, leftViews, centerViews, rightViews, onBackPress, style, leftStyle, centerStyle, rightStyle, titleStyle, }) => {
  return (
    <View style={[styles.container, style]}>

      {/* ======== LEFT VIEW ======== */}
      <View style={[styles.left, leftStyle]}>
        {onBackPress
          ? (
            <TouchableOpacity onPress={onBackPress}>
              <Image source={ICON_BACK} style={styles.left_button} />
            </TouchableOpacity>)
          : null
        }
        { leftViews }
      </View>

      {/* ======= TITLE ======= */}
      <View style={[styles.center, centerStyle]}>
        <Text style={[styles.title, titleStyle]}>
          {titleText}
        </Text>
        { centerViews }
        { children }
      </View>

      {/* ========== RIGHT VIEW ========= */}
      <View style={[styles.right, rightStyle]}>
        { rightViews }
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 55 * DisplayScale,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10 * DisplayScale,
    paddingRight: 10 * DisplayScale,
    borderWidth: 0 * DisplayScale,
    elevation: 1 * DisplayScale,
    backgroundColor: '#ededed',
  },
  center: {
    
  },

  left: {
    
  },
  right: {
    
  },
  title: {
    fontSize: 20 * DisplayScale,
    color: '#000',
  },
  left_button: {
    width: 30 * DisplayScale,
    height: 30 * DisplayScale,
    marginRight: 20 * DisplayScale,
  },
});

export default CustomViewHeader;
