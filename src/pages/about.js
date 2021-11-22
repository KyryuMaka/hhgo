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
            <Helmet titleTemplate="%s | Đội xe Hùng Hậu">
                <title>{props.value}</title>
                <meta name="description" content="Shop Rùa Ăn Vặt tọa lạc tại số 449/31/3 (407/42/53) Sư Vạn Hạnh, Phường 12, Quận 10, TP.Hồ Chí Minh. Chuyên kinh doanh bánh kẹo nhập khẩu, đồ ăn vặt thủ công"/>
            </Helmet>
        </div>
    );
}
export default About;