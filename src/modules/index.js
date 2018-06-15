import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import authenticated from './auth';
import signup from './signup';
import user from './user'

export default combineReducers({
  router: routerReducer,
  form: formReducer,
  authenticated,
  signup,
  user
});
