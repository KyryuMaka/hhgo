import React, {useState,useEffect} from 'react'
import * as Realm from "realm-web";
import _ from 'lodash'
import {Helmet} from 'react-helmet';

const realmapp = new Realm.App({id: "ql-doi-xe-hunghau-xxssb"});
const credentials = Realm.Credentials.anonymous();
var realm_user

let realmUser;

const getData = async (folder,name) =>{
    return await fetch('data/'+folder+name+'.json')
    .then(response => response.json())
    .then(data => {return data});
}

function About(props){
    return(
        <div>
            <Helmet titleTemplate="%s | Quản lý Đội xe Hùng Hậu">
                <title>{props.title}</title>
                <meta name="description" content="Đội xe Hùng Hậu"/>
            </Helmet>
        </div>
    );
}
export default About;