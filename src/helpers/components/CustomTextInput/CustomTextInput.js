import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import DeviceInfo from '../../DeviceInfo';
import Colors from '../../StyleHelper/ColorHelper';

// MARK: - Constants
const ICON_EYE = require('../../assets/images/ic_eye.png');
const ICON_EYE_DISABLE = require('../../assets/images/ic_eye_disable.png');

const padding = 20 * DeviceInfo.displayScale;
const iconSize = 20 * DeviceInfo.displayScale;

type Props = {
  style: StyleSheet.Styles, 
  inputStyle: StyleSheet.Styles,
  errorStyle: StyleSheet.Styles, 

  value: string, 
  placeholderText: string,
  errorText: string,
  bottomLineColor: string, 
  iconColor: string,

  autoCapitalize: boolean,  
  secureTextEntry: boolean, 
  autoCorrect: boolean, 
  
  returnKeyType: string, 
  keyboardType: string,
  
  onChangeText:() => void, 
  onSubmitEditing: () => void,
};
class CustomTextInput extends Component<Props> {
  //#region Component Lifecycle
  constructor(props) {
    super(props);
    this.state = {
      shouldShowPassword: this.props.secureTextEntry,
    };
  }

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  componentWillUnmount() {
    if (this.props.onRef) {
      this.props.onRef(undefined);
    }
  }
  //#endregion

  //#region Methods
  // Inherit Focus Method
  focus() {
    if (this.textInput) {
      this.textInput.focus();
    }
  }

  blur() {
    if (this.textInput) {
      this.textInput.blur();
    }
  }
  //#endregion

  render() {
    const { 
      style, 
      errorStyle, 
      inputStyle,
      placeholderText,
      errorText,
      bottomLineColor, 
      iconColor, 
      keyboardType, 
      secureTextEntry, 
      autoCorrect, 
      value, 
      returnKeyType, 
      autoCapitalize, 
      onChangeText, 
      onSubmitEditing,
    } = this.props;
    const { shouldShowPassword } = this.state;

    return (
      <View style={[styles.container, style]}>
        <View style={[styles.inputContainer, bottomLineColor ? { borderBottomColor: bottomLineColor } : null, errorText ? { borderBottomColor: 'red' } : null]} >
          <TextInput
            ref={(input) => { this.textInput = input; }}
            placeholder={placeholderText}
            borderColor="transparent"
            style={[styles.input, inputStyle]}
            value={value}
            underlineColorAndroid="transparent"
            blurOnSubmit={false}
            multiline={false}
            editable
            keyboardType={keyboardType}
            secureTextEntry={shouldShowPassword}
            autoCorrect={autoCorrect}
            returnKeyType={returnKeyType}
            autoCapitalize={autoCapitalize}
            onChangeText={text => (onChangeText ? onChangeText(text) : null)}
            onSubmitEditing={event => (onSubmitEditing ? onSubmitEditing() : null)}
            // {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
          />
          { secureTextEntry === true
            ? (
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => this.setState({ shouldShowPassword: !shouldShowPassword })}
              >
                <Image
                  style={[styles.imageViewPassword, { tintColor: iconColor || null }]}
                  source={shouldShowPassword ? ICON_EYE : ICON_EYE_DISABLE}
                  
                />
              </TouchableOpacity>
            )
            : null
          }
        </View>
        { errorText
          ? (
            <Text style={[styles.errorText, errorStyle]}>
              {errorText}
            </Text>
          )
          : null
        }
      </View>
    );
  }
}

// #region Stylesheet
const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomWidth: 1 * DeviceInfo.displayScale,
    // borderBottomColor: Colors.app.dividers,
  },

  input: {
    width: '100%',
  },

  iconContainer: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorText: {
    color: 'red',
    textAlign: 'right',
    fontSize: 14 * DeviceInfo.displayScale,
  },

  imageViewPassword: {
    width: iconSize,
    height: iconSize,
    resizeMode: 'contain',
    margin: 5 * DeviceInfo.displayScale,
  }

});
// #endregion

// #region PropTypes
CustomTextInput.propTypes = {
  style: PropTypes.any,
  textStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  text: PropTypes.string,
  placeholderText: PropTypes.string,
  errorText: PropTypes.string,
  bottomLineColor: PropTypes.string,
  iconColor: PropTypes.string,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  value: PropTypes.string,
  returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search', 'send']),
  autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
};
// #endregion

export default CustomTextInput;
