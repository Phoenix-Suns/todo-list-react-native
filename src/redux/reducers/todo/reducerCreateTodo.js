import { call, put, takeEvery } from 'redux-saga/effects';
import { ERROR_SERVER, ERROR_NETWORK } from '../../../helpers/WebServiceHelper';
import { createTodo } from '../../../network/webservices/TodoWebService';
import { DEBOUNCE_TIME } from '../../../config/WebServiceConfig';


// #region ========= TYPE ===========
export const ACTION_CREATE_TODO = 'ACTION_CREATE_TODO';
export const ACTION_CREATE_TODO_REQUEST = `${ACTION_CREATE_TODO}_REQUEST`;
export const ACTION_CREATE_TODO_SUCCESS = `${ACTION_CREATE_TODO}_SUCCESS`;
export const ACTION_CREATE_TODO_FAILURE = `${ACTION_CREATE_TODO}_FAILURE`;
export const ACTION_CREATE_TODO_CLEAN = `${ACTION_CREATE_TODO}_CLEAN`;
// #endregion


// #region ======== ACTION =========
export const createTodoRequest = payload => ({ type: ACTION_CREATE_TODO_REQUEST, payload });
export const createTodoSuccess = response => ({ type: ACTION_CREATE_TODO_SUCCESS, payload: response });
export const createTodoError = error => ({ type: ACTION_CREATE_TODO_FAILURE, payload: error });
export const createTodoClean = error => ({ type: ACTION_CREATE_TODO_CLEAN, payload: error });
// #endregion


// #region ========= REDUCER =========
const DEFAULT_STATE = {
  isSuccess: false
};

export const reducerCreateTodo = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ACTION_CREATE_TODO_SUCCESS:
      return {...state, isSuccess: true};
    case ACTION_CREATE_TODO_CLEAN:
        return {...state, isSuccess: false};
    default:
      return state;
  }
};
// #endregion


// #region ============ SAGA =============
export function* apiCreateTodoEffect(action) {
  try {
    const response = yield call(createTodo, action.payload);
    //response.key: "-LmZr3wt4mMzPElT6VC6"
    yield put(createTodoSuccess(response.key));
  } catch (e) {
    yield put(createTodoError(ERROR_NETWORK + e.message || ''));
  }
}

// the 'watcher'
export function* sagaCreateTodo() {
  yield takeEvery(ACTION_CREATE_TODO_REQUEST, apiCreateTodoEffect);
}
// #endregion
