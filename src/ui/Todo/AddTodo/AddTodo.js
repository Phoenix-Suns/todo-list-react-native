import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native'
import { HeaderBackButton } from 'react-navigation';
import AddTodoUI from './AddTodoUI';
import { AppStyles } from '../../../config/AppAssets';
import StyleHelper from '../../../helpers/StyleHelper/StyleHelper';
import { PRIORITIES, DATE_FORMAT } from '../../../config/Constants';
import moment from 'moment';
import { createTodo } from '../../../network/webservices/TodoWebService';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createLoadingSelector, createErrorSelector } from '../../../helpers/ReduxHelper/Selectors';
import { createTodoRequest, ACTION_CREATE_TODO } from '../../../redux/reducers/todo/reducerCreateTodo';

// #region Constants
// #endregion

class AddTodo extends Component {

  static navigationOptions = ({ navigation }) => {
    const title = 'Add Todo';
    const params = navigation.state.params || {};
    return {
      title: title,
      tabBarLabel: title,
      headerTitle: props => <Text {...props} style={AppStyles.headerTitle}>{title}</Text>,
      headerLeft: (<HeaderBackButton tintColor="white" onPress={params.onBackPress} />),
      headerRight: (
        <View>
          <Button
            title='Save'
            style={StyleHelper.button.add}
            onPress={params.onSavePress} />
        </View>
      ),
      headerStyle: AppStyles.header,
      headerTintColor: 'white',
    };
  };

  // #region Override
  constructor(props) {
    super(props);
    this.props.navigation.setParams({ onBackPress: this.onBackPress, onSavePress: this.onSavePress });

    this.state = {
      isLoading: false,
      errorMessage: undefined,
      title: '',
      content: '',
      priority: PRIORITIES[0],
      dueTime: moment(Date()).format(DATE_FORMAT),
    };
  }
  // #endregion


  // #region ===== EVENT =====
  onSavePress = () => {
    const {isLoading, errorMessage, title, content, priority, dueTime } = this.state;
    if (isLoading) return;

    if (this.refs.addTodoUI.validateAndSaveInput()) {
      this.setState({isLoading: true});
      createTodo({title, content, priority, dueTime})
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
      <AddTodoUI
        ref='addTodoUI'
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
  AddTodo,
);
//#endregion
