import React, { Component } from 'react';
import { View, Text, Button } from 'react-native'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HeaderBackButton } from 'react-navigation';
import { createLoadingSelector, createErrorSelector } from '../../../helpers/ReduxHelper/Selectors';
import { fetchTodoListRequest, ACTION_FETCH_TODO_LIST } from '../../../redux/reducers/todo/reducerFetchTodoList';
import TodoListUI from './TodoListUI';
import { AppStyles } from '../../../config/AppAssets';
import StyleHelper from '../../../helpers/StyleHelper/StyleHelper';
// #region Constants
// #endregion

class TodoList extends Component {

  static navigationOptions = ({ navigation }) => {
    const title = 'Todo List'
    const params = navigation.state.params || {};
    return {
      title: title,
      tabBarLabel: title,
      headerTitle: props => <Text {...props} style={AppStyles.headerTitle}>{title}</Text>,
      headerRight: (
        <View>
          <Button
            title='Add'
            style={StyleHelper.button.add}
            onPress={() => { params.onAddPress(); }} />
        </View>
      ),
      headerStyle: AppStyles.header,
      headerTintColor: 'white',
    };
  };

  // #region Override
  constructor(props) {
    super(props);
    this.props.navigation.setParams({ onAddPress: this._onAddPress });

    this.state = {
      
    };
  }

  componentDidMount = () => {
    if (this.props.todoList.length <= 0) {
      this.refreshList();
    }
  }
  // #endregion


  // #region =========== EVENT ===========
  _onAddPress = () => {
    this.props.navigation.navigate('AddTodo', { refreshList: this.refreshList.bind(this) });
  }

  _onRowPress = (item) => {
    console.log(item);
    this.props.navigation.navigate('UpdateTodo', { refreshList: this.refreshList.bind(this) });
  }
  // #endregion


  // #region =========== Method ==========
  refreshList = (isCheckLoading = true) => {
    const { isLoading } = this.props;
    if (isCheckLoading && isLoading) return;
    
    this.props.fetchTodoListRequest();
  }
  // #endregion


  render() {
    const { isLoading, errorMessage, todoList } = this.props;

    return (
      <TodoListUI
        errorMessage={errorMessage}
        isLoading={isLoading}
        todoList={todoList}
        onRefresh={this.refreshList}
        onRowPress={(item) => this._onRowPress(item)}
      />
    );
  }
}


// #region ========= REDUX ===============
const loadingSelector = createLoadingSelector([ACTION_FETCH_TODO_LIST]);
const errorSelector = createErrorSelector([ACTION_FETCH_TODO_LIST]);

const mapStateToProps = (state) => {
  const isLoading = loadingSelector(state);
  const errorMessage = errorSelector(state);
  return {
    isLoading,
    errorMessage,
    todoList: state.reducerFetchTodoList.responseTodoList,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchTodoListRequest,
  }, dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(
  TodoList,
);
// #endregion
