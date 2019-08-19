// @flow

import React, { Component } from 'react';
import { View, Text, SafeAreaView, Picker, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import DeviceInfo from '../../../helpers/DeviceInfo';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { validateEmpty } from '../../../helpers/ValidateHelper';
import { AppModalMenu, MenuStyles } from '../../../helpers/components/AppModalMenu';
import { PRIORITIES, DATE_FORMAT } from '../../../config/Constants';
import { AppStyles } from '../../../config/AppAssets';

// #region Global

const INPUT_TAG = {
  ALL: -1,
  TITLE: 0,
  CONTENT: 1,
  PRIORITY: 2,
  DUE_TIME: 3,
}
// #endregion

type Props = {
  isLoading: Boolean,
  title: String,
  content: String,
  priority: String,
  dueTime: String,
  onTitleChange: Function,
  onContentChange: Function,
  onPriorityChange: Function,
  onDueTimeChange: Function,
};
class AddTodoUI extends Component<Props> {

  constructor(props) {
    super(props)

    this.state = {
      errorTexts: [undefined, undefined, undefined, undefined],
    }
  }

  //region Method
  validateAndSaveInput = (inputTag = INPUT_TAG.ALL, value = undefined, isSaveProp = true) => {
    const { title, content, priority, dueTime,
      onTitleChange, onContentChange, onPriorityChange, onDueTimeChange} = this.props;
    const { errorTexts } = this.state;
    let result = false;

    switch (inputTag) {
      case INPUT_TAG.TITLE:
        result = validateEmpty(value);
        errorTexts[INPUT_TAG.TITLE] = result ? undefined : 'Not Empty';
        if (isSaveProp === true) onTitleChange(value);
        break;

      case INPUT_TAG.CONTENT:
        result = validateEmpty(value);
        errorTexts[INPUT_TAG.CONTENT] = result ? undefined : 'Not Empty';
        if (isSaveProp === true) onContentChange(value);
        break;

      case INPUT_TAG.PRIORITY:
        result = validateEmpty(value);
        errorTexts[INPUT_TAG.PRIORITY] = result ? undefined : 'Not Empty';
        if (isSaveProp === true) onPriorityChange(value);
        break;

      case INPUT_TAG.DUE_TIME:
        result = validateEmpty(value);
        errorTexts[INPUT_TAG.DUE_TIME] = result ? undefined : 'Not Empty';
        if (isSaveProp === true) onDueTimeChange(value);
        break;

      default:
        // VALIDATE ALL TAG, NOT SHOWING ON INPUT
        return this.validateAndSaveInput(INPUT_TAG.TITLE, title, false)
          && this.validateAndSaveInput(INPUT_TAG.CONTENT, content, false)
          && this.validateAndSaveInput(INPUT_TAG.PRIORITY, priority, false)
          && this.validateAndSaveInput(INPUT_TAG.DUE_TIME, dueTime, false)
    }

    this.setState({ errorTexts });
    return result;
  }
  //endregion

  //#region Render
  _renderPriorityRow = ({item, index}) => {
    const { onPriorityChange } = this.props;

    return (
      <TouchableOpacity
        onPress={()=>{
          onPriorityChange(item);
          this.refs.priorityModal.hide();
        }}
      >
        <Text style={MenuStyles.child_row}>{item}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const {isLoading, title, content, priority, dueTime } = this.props;
    const {errorTexts} = this.state;
    const priorities = PRIORITIES;

    return (
      <SafeAreaView style={styles.container}>
        <Text>Title</Text>
        <TextInput
          placeholder='TITLE'
          onChangeText={(text)=>{this.validateAndSaveInput(INPUT_TAG.TITLE, text);}}
          value={title}
        />
        <Text>
          {errorTexts[INPUT_TAG.TITLE]}
        </Text>
        <Text>Content</Text>
        <TextInput
          placeholder='CONTENT'
          onChangeText={(text)=>{this.validateAndSaveInput(INPUT_TAG.CONTENT, text);}}
          value={content}
        />
        <Text>
          {errorTexts[INPUT_TAG.CONTENT]}
        </Text>
        <Text style={AppStyles.inputTitle}>
          Priority
        </Text>
        <TouchableOpacity
          onPress={()=>{this.refs.priorityModal.show();}}>
            <Text style={AppStyles.input}>
              {priority}
            </Text>
        </TouchableOpacity>
        <Text>
          {errorTexts[INPUT_TAG.PRIORITY]}
        </Text>
        <Text>DueTime</Text>
        <DatePicker
          style={{ width: '100%' }}
          date={dueTime}
          onDateChange={(text)=>{this.validateAndSaveInput(INPUT_TAG.DUE_TIME, text);}}
          mode="date"
          placeholder="select date"
          format={DATE_FORMAT}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{ 
            dateIcon: {
              display: 'none',
            },
            dateInput: {
              marginLeft: 0,
            }}
        }/>
        <Text>
          {errorTexts[INPUT_TAG.DUE_TIME]}
        </Text>

        { isLoading ?
          <View style={AppStyles.loadingView} >
            <ActivityIndicator
              size='large'
              color={'white'}
              animating={isLoading}
            />
          </View>
          : null
        }

        {/* Dialog */}
        <AppModalMenu
          ref='priorityModal'
          title='Priority'
        >
          <FlatList
            data={priorities}
            renderItem={this._renderPriorityRow}
          />
        </AppModalMenu>
      </SafeAreaView>
    );
  }
  //#endregion
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16 * DeviceInfo.displayScale,
    flexDirection: 'column',
  },

  listContainer: {
    flex: 1
  },
  list: {
    flex: 1
  },
});

export default AddTodoUI;
