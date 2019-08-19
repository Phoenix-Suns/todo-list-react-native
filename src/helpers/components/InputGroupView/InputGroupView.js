import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

type Props = {
  title: string,
  errorText: string,
  horizontal: boolean,
  style: any,
  children: any,
}

/**
 * Group With Label + child + Error Text
 */
class InputGroupView extends Component<Props> {
  render() {
    const { title, errorText, horizontal } = this.props;

    if (horizontal === true) {
      return (
        <View
          style={[styles.containerHorizontal, this.props.style]}
        >

          <Text style={[styles.labelHorizontal]}>
            {title}
          </Text>

          { this.props.children }

          { errorText 
            ? (
              <Text style={styles.errorText}>
                {errorText}
              </Text>
            )
            : null
          }
        </View>
      );
    }

    return (
      <View
        style={[styles.containerVertical, this.props.style]} 
      >

        <Text style={[styles.labelVertical]}>
          {title}
        </Text>

        { this.props.children }

        { errorText 
          ? (
            <Text style={styles.errorText}>
              {errorText}
            </Text>
          )
          : null
        }
      </View>
    );
  }
}

/* ItemInput.prototype = {
  children: PropTypes.any,
  style: PropTypes.any,
  title: PropTypes.string,
  
}; */

const styles = StyleSheet.create({
  containerHorizontal: {
    flexDirection: 'row',
  },
  containerVertical: {

  },
  labelHorizontal: {
    paddingTop: 0,
    alignSelf: 'center',
  },
  labelVertical: {

  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
  },
});

export default InputGroupView;
