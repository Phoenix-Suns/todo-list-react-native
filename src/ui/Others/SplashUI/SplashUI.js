import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { resetStackNavigator } from '../../../helpers/StackNavigatorHelper';

class SplashUI extends Component {
  // #region NavigationOptions
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  }
  // #endregion

  // #region Component Lifecycle

  constructor(props) {
    super(props);

    resetStackNavigator(this.props.navigation, 'TodoList');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Nghia</Text>
      </View>
    );
  }

  // #endregion
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default SplashUI