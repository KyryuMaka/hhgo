import { SET_CURRENT_USER } from '../actions/types';
import _ from 'lodash';

const initialState = {
    isAuthenticated: false,
    users: {}
}

function authReducer(state = initialState, action) {
    switch(action.type){
        case SET_CURRENT_USER:
            return{
                ...state,
                isAuthenticated: !_.isEmpty(action.payload),
                users: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;