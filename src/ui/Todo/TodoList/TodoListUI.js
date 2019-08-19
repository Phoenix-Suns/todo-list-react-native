// @flow

import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, RefreshControl, SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import DeviceInfo from '../../../helpers/DeviceInfo';
import { AppImages } from '../../../config/AppAssets';
import StyleHelper from '../../../helpers/StyleHelper/StyleHelper';
import { AppColors } from '../../../config/AppConfig';
import AppViewInline from '../../../helpers/components/AppViewInline';
import CustomViewHeader from '../../../helpers/components/CustomViewHeader/CustomViewHeader';

// #region Global

// #endregion


type Props = {
  isLoading: boolean,
  errorMessage: string,
  todoList: Array,

  onRefresh: Function,
  onRowPress: Function,
};
class TodoListUI extends PureComponent<Props> {
  // #region Render
  renderEmptyList = () => (
    <View>
      <Text style={{ textAlign: 'center' }}>
        EmptyList
      </Text>
    </View>
  )

  renderRowUser = ({item}) => {
    const {
      content, dueTime, priority, title, key
    } = item;

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={{flexDirection: 'column'}}
          onPress={() => { this.props.onRowPress(item); }}>
          <AppViewInline
            labelText={'title'}
            infoText={title}
          />
          <AppViewInline
            labelText={'Content'}
            infoText={content}
          />
          <AppViewInline
            labelText={'priority'}
            infoText={priority}
          />
          <AppViewInline
            labelText={'dueTime'}
            infoText={dueTime}
          />
        </TouchableOpacity>
      </View>
    );
  }
  // #endregion

  render() {
    const { isLoading, onRefresh, todoList } = this.props;
    
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            style={styles.list}
            refreshControl={(
              <RefreshControl
                refreshing={isLoading}
                onRefresh={onRefresh}
                colors={[AppColors.BRAND]}
              />
            )}
            data={todoList}
            renderItem={this.renderRowUser}
            keyExtractor={(item, index) => `${index}`}
            ListEmptyComponent={this.renderEmptyList()}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  listContainer: {
    flex: 1
  },
  list: {
    flex: 1
  },
  itemContainer: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 16 * DeviceInfo.displayScale
  }
});

export default TodoListUI;
