import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import AppReducers from './AppReducers';
import AppSaga from './AppSaga';

const sagaMiddleware = createSagaMiddleware();

function AppStore() {
  const store = createStore(
    AppReducers,
    applyMiddleware(sagaMiddleware),
  );

  sagaMiddleware.run(AppSaga);

  return store;
}

export default AppStore();
