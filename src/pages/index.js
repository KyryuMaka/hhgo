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
                <title>{props.title}</title>
                <meta name="description" content="Đội xe Hùng Hậu"/>
            </Helmet>
            <main>
                <div class="d-flex flex-column flex-shrink-0 text-white" style={{"width": "4.5rem", "background-color": "rgba(0, 17, 102, 0.8)"}}>
                    <a href="https://hunghau.vn/" class="d-block p-3 link-dark text-decoration-none" title="HungHau" data-bs-toggle="tooltip" data-bs-placement="right">
                        {/* <svg class="bi" width="40" height="32"><use xlink:href="#bootstrap"/></svg> */}
                        <img src="./favicon.ico" class="bi" width="40" />
                    </a>
                    <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
                        <li class="nav-item">
                            <a href="/home" class="nav-link py-3 border-bottom" aria-current="page" title="Home" data-bs-toggle="tooltip" data-bs-placement="right">
                                <i class="bi bi-house-door"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link py-3 border-bottom" title="Dashboard" data-bs-toggle="tooltip" data-bs-placement="right">
                                <i class="bi bi-speedometer2"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link py-3 border-bottom" title="Orders" data-bs-toggle="tooltip" data-bs-placement="right">
                                <i class="bi bi-table"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link py-3 border-bottom" title="Products" data-bs-toggle="tooltip" data-bs-placement="right">
                                <i class="bi bi-grid"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link py-3 border-bottom" title="Customers" data-bs-toggle="tooltip" data-bs-placement="right">
                                <i class="bi bi-person-circle"></i>
                            </a>
                        </li>
                    </ul>
                    <div class="dropdown border-top">
                        <a href="#" class="d-flex align-items-center justify-content-center p-3 text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="mdo" width="24" height="24" class="rounded-circle"/>
                        </a>
                        <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
                            <li><a class="dropdown-item" href="#">New project...</a></li>
                            <li><a class="dropdown-item" href="#">Settings</a></li>
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li><a class="dropdown-item" href="#">Sign out</a></li>
                        </ul>
                    </div>
                </div>
                <div class="b-example-divider"></div>
                <div class="d-flex flex-column flex-shrink-0"></div>
            </main>
            <div>
                
            </div>
        </div>
    );
}
export default Index;