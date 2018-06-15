import { push } from 'react-router-redux';

export const LOGIN_REQUESTED = 'auth/LOGIN_REQUESTED';
export const LOGIN = 'auth/LOGIN';
export const LOGOUT_REQUESTED = 'auth/LOGOUT_REQUESTED';
export const LOGOUT = 'auth/LOGOUT';
export const CHECK_REQUESTED = 'auth/CHECK_REQUESTED';
export const CHECK = 'auth/CHECK';

const initialState = {
  loggedIn: false,
  user: {
    id: null,
    name: null
  },
  request: false
};

const URL = 'http://localhost:8080/';

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
        request: true
      };
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        request: false,
        user: {
          id: action.payload._id,
          name: action.payload.local.username
        }
      };
    case LOGOUT_REQUESTED:
      return {
        ...state,
        request: true
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        request: false,
        user: {
          id: null,
          name: null
        }
      };
    case CHECK_REQUESTED:
      return {
        ...state,
        request: true
      };
    case CHECK:
      return {
        ...state,
        loggedIn: true,
        request: false,
        user: {
          id: action.payload._id,
          name: action.payload.local.username
        }
      };
    default:
      return state;
  }
};

export const login = values => {
  console.log(`Signing in with: ${values}`);
  const request = fetch(`${URL}auth/login`, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(values),
    headers: { 'Content-Type': 'application/json' }
  });
  return dispatch => {
    dispatch({ type: LOGIN_REQUESTED });
    request
      .then(res => res.json())
      .then(data => {
        console.log('login: ' + JSON.stringify(data));
        setTimeout(() => {
          dispatch({
            type: LOGIN,
            payload: data.user
          });
          dispatch(push('/'));
        }, 3000);
      })
      .catch(error => console.error('Error:', error));
  };
};

export const logout = () => {
  const request = fetch(`${URL}auth/logout`, {
    credentials: 'include',
    method: 'POST'
  });
  return dispatch => {
    dispatch({
      type: LOGOUT_REQUESTED
    });
    request.then(res => res.json()).then(data => {
      setTimeout(() => {
        dispatch({
          type: LOGOUT
        });
        dispatch(push('/'));
      }, 1000);
    });
  };
};

export const checkSesh = () => {
  const request = fetch(`${URL}auth/user`, {
    credentials: 'include',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  return dispatch => {
    request
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          dispatch({
            type: CHECK,
            payload: data.user
          });
        }
      })
      .catch(error => console.error('Error:', error));
  };
};
