import { push } from 'react-router-redux';

export const SIGNUP_REQUESTED = 'signup/SIGNUP_REQUESTED';
export const SIGNUP = 'signup/SIGNUP';

const initialState = {
  status: false,
  request: false,
  id: null
};

const URL = 'http://localhost:8080/';

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUESTED:
      return {
        ...state,
        request: true
      };
    case SIGNUP:
      return {
        ...state,
        request: false,
        status: true
      };
    default:
      return state;
  }
};

export const signup = values => {
  console.log(`Signing up with: ${values}`);
  const request = fetch(`${URL}auth/signup`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: { 'Content-Type': 'application/json' }
  });
  return dispatch => {
    dispatch({ type: SIGNUP_REQUESTED });
    request
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setTimeout(() => {
          dispatch({
            type: SIGNUP
          });
          dispatch(push('/'));
        }, 3000);
      })
      .catch(error => console.error('Error:', error));
  };
};
