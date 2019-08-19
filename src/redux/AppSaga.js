import { all } from 'redux-saga/effects';
import { sagaFetchTodoList } from '../redux/reducers/todo/reducerFetchTodoList';
import { sagaCreateTodo } from '../redux/reducers/todo/reducerCreateTodo';

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* AppSaga() {
  yield all([
    sagaFetchTodoList(),
    sagaCreateTodo(),
  ]);
}
