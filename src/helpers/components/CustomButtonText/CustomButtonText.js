import React, { Component } from 'react';
// @flow

import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import PropTypes from 'prop-types';
import DeviceInfo from '../../DeviceInfo';

const TITLE_BG = '#4B74FF';

// //BASE_FONT = 'YOUR_CUSTOM_FONTS_FAMILY';
// AppButton.PropTypes = {
//   // On Press something
//   onPress: PropTypes.func,
// };
type Props = {
  style: StyleSheet.Styles,

  text: string,
  textStyle: StyleSheet.Styles,

  onPress: Function,
}

class CustomButtonText extends Component<Props> {
  render() {
    const { style, onPress, text, textStyle } = this.props;

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <Text style={[styles.title, textStyle]}>
          {text}
        </Text>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    fontSize: 15 * DeviceInfo.displayScale,
    color: 'black',
  },

  title: {
    color: 'white',
    backgroundColor: TITLE_BG,
    paddingVertical: 15 * DeviceInfo.displayScale,
    paddingHorizontal: 20 * DeviceInfo.displayScale,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default CustomButtonText;
