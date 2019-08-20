import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native'
import { HeaderBackButton } from 'react-navigation';
import { AppStyles } from '../../../config/AppAssets';
import StyleHelper from '../../../helpers/StyleHelper/StyleHelper';
import { updateTodo, deleteTodo } from '../../../network/webservices/TodoWebService';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createLoadingSelector, createErrorSelector } from '../../../helpers/ReduxHelper/Selectors';
import { createTodoRequest, ACTION_CREATE_TODO } from '../../../redux/reducers/todo/reducerCreateTodo';
import UpdateTodoUI from './UpdateTodoUI';

// #region Constants
// #endregion

class UpdateTodo extends Component {

  static navigationOptions = ({ navigation }) => {
    const title = 'Edit Todo';
    const params = navigation.state.params || {};
    return {
      title: title,
      tabBarLabel: title,
      headerTitle: props => <Text {...props} style={AppStyles.headerTitle}>{title}</Text>,
      headerLeft: (<HeaderBackButton tintColor="white" onPress={params.onBackPress} />),
      headerRight: (
        <View style={{flexDirection: "row"}}>
          <Button
            title='Save'
            style={StyleHelper.button.add}
            onPress={params.onSavePress} />
          <Button
            title='Delete'
            style={StyleHelper.button.delete}
            onPress={params.onDeletePress} />
        </View>
      ),
      headerStyle: AppStyles.header,
      headerTintColor: 'white',
    };
  };

  // #region Override
  constructor(props) {
    super(props);
    this.props.navigation.setParams({ onBackPress: this.onBackPress, onSavePress: this.onSavePress, onDeletePress: this.onDeletePress });

    const item = this.props.navigation.getParam('item', undefined);
    if (item == undefined) this.props.navigation.goBack();

    this.state = {
      isLoading: false,
      errorMessage: undefined,
      ...item,
    };
  }
  // #endregion

  // #region ===== EVENT =====
  onSavePress = () => {
    const {isLoading, errorMessage, key, title, content, priority, dueTime } = this.state;
    if (isLoading) return;

    if (!this.refs.updateTodoUI.validateAndSaveInput()) {
      const message = this.refs.updateTodoUI.getErrors();
      Alert.alert(
        'Error',
        message,
        [{text: 'Cancel'},],
        {cancelable: true},
      );
      return;
    }

    this.setState({isLoading: true});
    updateTodo({key, title, content, priority, dueTime})
    .then(()=>{
      this.setState({isLoading: false});
      this.props.navigation.state.params.refreshList();
      this.props.navigation.goBack();
    })
    .catch((error)=>{
      this.setState({isLoading: false});
      Alert.alert(
        'Error',
        error,
        [{text: 'OK'},],
        {cancelable: true},
      );
    })
  }

  onDeletePress = () => {
    Alert.alert(
      'Delete',
      'Sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete', 
          onPress: () => {this.deleteTodo();},
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  }

  deleteTodo() {
    const {isLoading, errorMessage, key, title, content, priority, dueTime } = this.state;
    if (isLoading) return;

    this.setState({isLoading: true});
    deleteTodo({key, title, content, priority, dueTime})
    .then(()=>{
      this.setState({isLoading: false});
      this.props.navigation.state.params.refreshList();
      this.props.navigation.goBack();
    })
    .catch((error)=>{
      this.setState({isLoading: false});
      Alert.alert(
        'Error',
        error,
        [{text: 'OK'},],
        {cancelable: true},
      );
    })
  }

  onBackPress = () => {
    this.props.navigation.goBack();
  }
  // #endregion


  // #region ===== Method =====
  // #endregion


  render() {
    const { isLoading, errorMessage, title, content, priority, dueTime } = this.state;
    
    return (
      <UpdateTodoUI
        ref='updateTodoUI'
        isLoading={isLoading}
        title={title}
        content={content}
        priority={priority}
        dueTime={dueTime}
        onTitleChange={(text) => {this.setState({title: text})}}
        onContentChange={(text) => {this.setState({content: text})}}
        onPriorityChange={(text) => {this.setState({priority: text})}}
        onDueTimeChange={(text) => {this.setState({dueTime: text})}}
      />
    );
  }
}

//#region REDUX
const loadingSelector = createLoadingSelector([ACTION_CREATE_TODO]);
const errorSelector = createErrorSelector([ACTION_CREATE_TODO]);

const mapStateToProps = (state) => {
  const isLoading = loadingSelector(state);
  const errorMessage = errorSelector(state);
  return {
    isLoading,
    errorMessage,
    isSuccess: state.reducerCreateTodo.isSuccess,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    createTodoRequest,
  }, dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(
  UpdateTodo,
);
//#endregion
