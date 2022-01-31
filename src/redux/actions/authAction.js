import * as Realm from "realm-web";

import { ERROR, SET_CURRENT_USER } from "./types"

//Login - Get User Token
export const loginUser = (userData, callback) => dispatch => {
    const realmapp = new Realm.App({id: "ql-doi-xe-hunghau-xxssb"});
    const credentials = Realm.Credentials.anonymous();

    async function dataName(params){
        const realmUser = await realmapp.logIn(credentials);
        return await realmUser.callFunction('getUser', {user: userData.user, pass: userData.pass});
    }
    dataName()
    .then(res => {
        dispatch({
            type: SET_CURRENT_USER,
            payload: res
        })
        callback();
    })
    .catch(err => dispatch({
        type: ERROR,
        payload: err
    }))
    
}