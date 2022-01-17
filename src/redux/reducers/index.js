// reducers/index.jsjs
import { combineReducers } from 'redux';
import postReducer from './postReducer';

const reducers = combineReducers({
	posts: postReducer,
});

export default (state, action) => reducers(state, action);