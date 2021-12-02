import React, {useState,useEffect} from 'react'
import * as Realm from "realm-web";
import * as bootstrap from 'bootstrap';
import _ from 'lodash'
import {Helmet} from 'react-helmet';

import SideBar from '../components/sideBar'

const realmapp = new Realm.App({id: "ql-doi-xe-hunghau-xxssb"});
const credentials = Realm.Credentials.anonymous();
var realm_user

let realmUser;

const getData = async (folder,name) =>{
    return await fetch('data/'+folder+name+'.json')
    .then(response => response.json())
    .then(data => {return data});
}

function Index(props){
    return(
        <div>
            <Helmet titleTemplate="%s | Quản lý Đội xe Hùng Hậu">
                <title>{props.value}</title>
                <meta name="description" content="Đội xe Hùng Hậu"/>
            </Helmet>
            <SideBar />
            Hi
        </div>
    );
}
export default Index;