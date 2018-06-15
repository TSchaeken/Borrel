export const UPDATE_REQUESTED = 'user/UPDATE_REQUESTED';
export const UPDATE = 'user/UPDATE';
export const SEARCH_REQUESTED = 'user/SEARCH_REQUESTED';
export const SEARCH = 'user/SEARCH';

const initialState = {
  user: {
    firstName: null,
    lastName: null,
    email: null,
    profession: null,
    interests: null,
    seeking: null,
    note: null
  },
  seeking: [],
  request: false
};

const URL = 'http://localhost:8080/';

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_REQUESTED:
      return {
        ...state,
        request: true
      };
    case UPDATE:
      return {
        ...state,
        request: false,
        user: {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.local.email,
          profession: action.payload.local.profession,
          interests: action.payload.local.interests,
          seeking: action.payload.local.seeking,
          note: action.payload.local.note
        }
      };
    case SEARCH_REQUESTED:
      return {
        ...state,
        request: true
      };
    case SEARCH:
      return {
        ...state,
        request: false,
        seeking: action.payload
      };
    default:
      return state;
  }
};

export const updateInfo = values => {
  console.log('updating info!');
  const request = fetch(`${URL}auth/userInfo`, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(values),
    headers: { 'Content-Type': 'application/json' }
  });
  return dispatch => {
    dispatch({ type: UPDATE_REQUESTED });
    request
      .then(res => res.json())
      .then(data => {
        console.log('login: ' + JSON.stringify(data));
        setTimeout(() => {
          dispatch({
            type: UPDATE,
            payload: data
          });
        }, 1500);
      })
      .catch(error => console.error('Error:', error));
  };
};

export const retrieveUsers = values => {
  console.log('retrieving users!');
  const request = fetch(`${URL}auth/retrieve`, {
    credentials: 'include',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  return dispatch => {
    dispatch({ type: SEARCH_REQUESTED });
    request
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          console.log(data)
          dispatch({
            type: SEARCH,
            payload: data
          });
        }, 1500);
      })
      .catch(error => console.error('Error:', error));
  };
};


