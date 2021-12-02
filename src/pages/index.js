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
                <title>{props.title}</title>
                <meta name="description" content="Đội xe Hùng Hậu"/>
            </Helmet>
            <div className="d-flex">
                <SideBar />
                <div className="main">
                    <div className="row m-3 text-center">
                        <div className="col">
                            <div className="btn card">
                                đạgkasdhashdjkakhj
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                đạgkasdhashdjkakhj
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                đạgkasdhashdjkakhj
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                đạgkasdhashdjkakhj
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
export default Index;