import React, {useState,useEffect} from 'react'
import * as Realm from "realm-web";
import * as bootstrap from 'bootstrap';
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

function Index(props){
    useEffect(() => {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        });
    },[]);
    return(
        <div>
            <Helmet titleTemplate="%s | Quản lý Đội xe Hùng Hậu">
                <title>{props.value}</title>
                <meta name="description" content="Đội xe Hùng Hậu"/>
            </Helmet>
            <div className="d-flex flex-column flex-shrink-0" style={{"width": "4.5rem", "height": "100vh", "background-color":"rgba(0, 17, 102, 0.8)"}}>
                <a href="/" className="d-block p-3 link-dark text-decoration-none" title="HungHau Holdings" data-bs-toggle="tooltip" data-bs-placement="right">
                    <img src="./favicon.ico" width="40"/>
                    <span className="visually-hidden">Icon-only</span>
                </a>
                <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                    <li className="nav-item">
                        <a href="#" className="nav-link active py-3 border-bottom text-white" aria-current="page" title="Home" data-bs-toggle="tooltip" data-bs-placement="right">
                            <i className="bi bi-house-door"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link py-3 border-bottom text-white" title="Dashboard" data-bs-toggle="tooltip" data-bs-placement="right">
                            <i className="bi bi-speedometer2"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link py-3 border-bottom text-white" title="Orders" data-bs-toggle="tooltip" data-bs-placement="right">
                            <i className="bi bi-table"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link py-3 border-bottom text-white" title="Products" data-bs-toggle="tooltip" data-bs-placement="right">
                            <i className="bi bi-grid"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link py-3 border-bottom text-white" title="Customers" data-bs-toggle="tooltip" data-bs-placement="right">
                            <i className="bi bi-person-circle"></i>
                        </a>
                    </li>
                </ul>
                <div className="dropdown border-top">
                    <a href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle text-white" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="mdo" width="24" height="24" className="rounded-circle" />
                    </a>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Index;