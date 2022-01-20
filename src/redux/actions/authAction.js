import {
    FETCH_POST_REQUEST,
    FETCH_POST_SUCCESS,
    FETCH_POST_ERROR,
} from '../constants/post.js';
import * as Realm from "realm-web";

const realmapp = new Realm.App({id: "ql-doi-xe-hunghau-xxssb"});
const credentials = Realm.Credentials.anonymous();

export const loadUser = () => async dispatch => {
    try {
        dispatch({ type: FETCH_POST_REQUEST });
        const realmUser = await realmapp.logIn(credentials);
        const response = await realmUser.callFunction('getUserbyName', {})
        const responseBody = await response.json();
        dispatch({
            type: FETCH_POST_SUCCESS,
            data: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: FETCH_POST_ERROR,
            message: error
        });
    }
}