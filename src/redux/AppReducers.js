import { combineReducers } from 'redux';
import { loadingReducer, errorReducer } from '../helpers/ReduxHelper';
import { reducerFetchTodoList } from '../redux/reducers/todo/reducerFetchTodoList';
import { reducerCreateTodo } from '../redux/reducers/todo/reducerCreateTodo';

export default combineReducers({
  _LOADING: loadingReducer,
  _ERROR: errorReducer,
  reducerFetchTodoList,
  reducerCreateTodo,
});
