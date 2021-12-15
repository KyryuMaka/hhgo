import React, {useState,useEffect} from 'react'
import * as Realm from "realm-web";
import * as bootstrap from 'bootstrap';
import _ from 'lodash'
import {Helmet} from 'react-helmet';

import BootstrapTable from 'react-bootstrap-table-next';

import SideBar from '../components/sideBar'
import axios from 'axios';

const realmapp = new Realm.App({id: "ql-doi-xe-hunghau-xxssb"});
const credentials = Realm.Credentials.anonymous();
var realmUser;

// const getData = async (folder,name) =>{
//     return await fetch('data/'+folder+name+'.json')
//     .then(response => response.json())
//     .then(data => {return data});
// }

function History(props){
    const columns = [{
        dataField: 'id',
        text: 'Mã'
    },{
        dataField: 'driver',
        text: 'Tài xế'
    },{
        dataField: 'car',
        text: 'Xe'
    },{
        dataField: 'carNumber',
        text: 'Biển số xe'
    },{
        dataField: 'cary',
        text: 'Chở'
    },{
        dataField: 'from',
        text: 'Từ'
    },{
        dataField: 'to',
        text: 'Đến'
    },{
        dataField: 'when',
        text: 'Vào lúc'
    },{
        dataField: 'status',
        text: 'Trạng thái'
    }];

    const remote = [{
        filter: true,
        pagination: true,
        sort: true,
        cellEdit: true
    }];

    const [data, setData] = useState([]);
    // const [driver, setDriver] = useState();
    // const [car, setCar] = useState();
    // const [carNumber, setCarNumber] = useState();
    // const [carry, setCarry] = useState();
    // const [from, setFrom] = useState();
    // const [to, setTo] = useState();
    // const [when, setWhen] = useState();
    // const [status, setStatus] = useState();

    useEffect(()=>{
        async function dataName(params){
            const realmUser = await realmapp.logIn(credentials);
            setData(await realmUser.callFunction('getAllData', {}));
        }
        dataName();
    },[]);
        
    return(
        <div>
            <Helmet titleTemplate="%s | Quản lý Đội xe Hùng Hậu">
                <title>{props.title}</title>
                <meta name="description" content="Đội xe Hùng Hậu"/>
            </Helmet>
            <div className="d-flex">
                <SideBar />
                <div className="main">
                    <div className="container">
                        <h3 className="table-caption">LỊCH SỬ</h3>
                        <BootstrapTable keyField='id' data={ data } columns={ columns } remote={ remote } striped hover />
                    </div>
                </div>
            </div>
            
        </div>
    );
}
export default History;