import { delay } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ERROR_SERVER, ERROR_NETWORK } from '../../../helpers/WebServiceHelper';
import { fetchTodoList } from '../../../network/webservices/TodoWebService';
import FirebaseHelper from '../../../helpers/FirebaseHelper';

// #region ========= TYPE ===========
export const ACTION_FETCH_TODO_LIST = 'ACTION_FETCH_TODO_LIST';
export const ACTION_FETCH_TODO_LIST_REQUEST = `${ACTION_FETCH_TODO_LIST}_REQUEST`;
export const ACTION_FETCH_TODO_LIST_SUCCESS = `${ACTION_FETCH_TODO_LIST}_SUCCESS`;
export const ACTION_FETCH_TODO_LIST_FAILURE = `${ACTION_FETCH_TODO_LIST}_FAILURE`;
// #endregion


// #region ======== ACTION =========
export const fetchTodoListRequest = payload => ({ type: ACTION_FETCH_TODO_LIST_REQUEST, payload });
export const fetchTodoListSuccess = response => ({ type: ACTION_FETCH_TODO_LIST_SUCCESS, payload: response });
export const fetchTodoListError = error => ({ type: ACTION_FETCH_TODO_LIST_FAILURE, payload: error });
// #endregion


// #region ========= REDUCER =========
const DEFAULT_STATE = {
  responseTodoList: [],
};

export const reducerFetchTodoList = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ACTION_FETCH_TODO_LIST_SUCCESS:
      return { ...state, responseTodoList: action.payload };
    default:
      return state;
  }
};
// #endregion


// #region ============ SAGA =============
export function* apiFetchTodoListEffect(action) {
  try {
    const response = yield call(fetchTodoList, action.payload);
    const list = FirebaseHelper.snapshotToList(response);
    yield put(fetchTodoListSuccess(list));
  } catch (e) {
    yield put(fetchTodoListError(ERROR_NETWORK + e.message || ''));
  }
}

// the 'watcher'
export function* sagaFetchTodoList() {
  yield takeEvery(ACTION_FETCH_TODO_LIST_REQUEST, apiFetchTodoListEffect);
}
// #endregion
