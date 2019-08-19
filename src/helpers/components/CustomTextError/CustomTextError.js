import React from 'react';
import { View, Text } from 'react-native';
import StyleHelper from '../../StyleHelper/StyleHelper';
import Colors from '../../StyleHelper/Colors';

const CustomTextError = ({ style, text }) => {
  return (
    <Text style={[StyleHelper.text.body_2, {width: '100%', color: Colors.basic.red}, style]}>
      {text}
    </Text>
  );
};

export default CustomTextError;
