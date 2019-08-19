import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const CustomViewLoading = ({ style, indicatorStyle, isLoading }) => {
  if (isLoading) {
    return (
      <View style={[styles.container, style]}>
        <ActivityIndicator
          style={indicatorStyle}
          size={100}
          color="white"
          animating
        />
      </View>
    );
  }
  return <View />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    backgroundColor: '#00000088',
  }
});

export default CustomViewLoading;
