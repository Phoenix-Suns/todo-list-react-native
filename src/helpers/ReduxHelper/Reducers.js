const CLEAN_ERROR = 'CLEAN_ERROR';
const CLEAN_LOADING = 'CLEAN_LOADING';
export const cleanError = actionName => ({ type: CLEAN_ERROR, payload: actionName });
export const cleanLoading = actionName => ({ type: CLEAN_LOADING, payload: actionName });


export const errorReducer = (state = {}, action) => {
  // #region ===== RESET ERROR =====
  switch (action.type) {
    case CLEAN_ERROR:
      return { ...state, [action.payload]: '' };
    default:
      break;
  }
  // #endregion


  // #region ===== AUTO SET ERROR ========
  const { type, payload } = action;
  const matches = /(.*)_(REQUEST|FAILURE|ERROR)/.exec(type);
  
  // not a *_REQUEST / *_FAILURE actions, so we ignore them
  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    // Store errorMessage
    // e.g. stores errorMessage when receiving GET_TODOS_FAILURE
    //      else clear errorMessage when receiving GET_TODOS_REQUEST
    [requestName]: (requestState === 'FAILURE' || requestState === 'ERROR') ? payload : '',
  };
  // #endregion
};

export const loadingReducer = (state = {}, action) => {
  // #region ===== RESET LOADING =====
  switch (action.type) {
    case CLEAN_LOADING:
      return { ...state, [action.payload]: '' };
    default:
      break;
  }
  // #endregion


  // #region ====== AUTO CREATE LOADING ======
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) return state;  
  
  const [, requestName, requestState] = matches;
  return {
    ...state,
    // Store whether a request is happening at the moment or not
    // e.g. will be true when receiving GET_TODOS_REQUEST
    //      and false when receiving GET_TODOS_SUCCESS / GET_TODOS_FAILURE
    [requestName]: requestState === 'REQUEST',
  };
  // #endregion
};
