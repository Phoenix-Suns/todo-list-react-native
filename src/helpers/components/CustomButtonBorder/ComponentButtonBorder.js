// @flow

import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import DeviceInfo from '../../DeviceInfo';
import Colors from '../../StyleHelper/ColorHelper';

const SCALE = DeviceInfo.displayScale;
const COLOR_DISABLE = Colors.text.light.hint_disabled;

type Props = {
    title: string, 
    color: string, 
    disable: boolean, 
    loading: boolean,
    onPress: PropTypes.func
};
class CustomButtonBorder extends Component<Props> {

  //  MARK: - Component Lifecycle
  render() {
    const { title, color, disable, loading} = this.props;

    // --------- DISABLE -------
    if (disable) {
      return (
        <View style={[styles.container, {borderColor: COLOR_DISABLE }, this.props.style, ]}>
          { title
            ? (
              <Text style={[styles.text, {color: COLOR_DISABLE, fontSize: 15 * SCALE }]}>
                {title}
              </Text>
            )
            : null
          }
          { this.props.children }
        </View>
      );
    }

    // ======== LOADING =======
    if (loading) {
      return (
        <View style={[styles.container, { borderColor: COLOR_DISABLE}, this.props.style, ]} >
          <ActivityIndicator size="small" color={color} />
        </View>
      );
    }

    // Normal
    return (
      <TouchableOpacity
        style={[styles.container, {borderColor: color }, this.props.style]} 
        onPress={() => (this.props.onPress !== undefined ? this.props.onPress() : null)}
      >
        { title
          ? (
            <Text style={[styles.text, {color: COLOR_DISABLE, fontSize: 15 * SCALE }]}>
              {title}
            </Text>
          )
          : null
        }
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

export default CustomButtonBorder;
