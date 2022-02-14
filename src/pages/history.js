import React, {useState,useEffect} from 'react';
import * as Realm from "realm-web";
import * as bootstrap from 'bootstrap';
import _ from 'lodash'
import {Helmet} from 'react-helmet';

import $ from "jquery";
import {DataTable} from 'datatables.net-bs5';
import { loading } from '../constant';

const realmapp = new Realm.App({id: "ql-doi-xe-hunghau-xxssb"});
const credentials = Realm.Credentials.anonymous();

// const getData = async (folder,name) =>{
//     return await fetch('data/'+folder+name+'.json')
//     .then(response => response.json())
//     .then(data => {return data});
// }

function History(props){
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
            setData(await realmUser.callFunction('getDBData', {}));
        }
        dataName();
    },[]);
    
    useEffect(()=>{
        $('#historyTable').DataTable({
            retrieve: true,
            data:data,
            pageLength:10,
            lengthChange: false,
            info: false,
            columns:[
                {data:"driver"},
                {data:"car"},
                {data:"carNumber"},
                {data:"cary"},
                {data:"from"},
                {data:"to"},
                {data:"when"},
                {data:"status"},
            ]
        });
    })

    return(
        <>
            <Helmet titleTemplate="%s · HHGo">
                {(_.isEmpty(data))?<title>{loading}</title>:<title>{props.title}</title>}
                <meta name="description" content="Đội xe Hùng Hậu"/>
            </Helmet>
            <div className="main vh-100">
                {(_.isEmpty(data))?
                <div className="vh-100 d-flex justify-content-center">
                    <div className="align-self-center">
                        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>{loading}
                    </div>
                </div>:
                <div className="container p-3">
                    <h3 className="">LỊCH SỬ DI CHUYỂN</h3>
                    <table className="table table-striped table-hover table-bordered align-middle" id="historyTable">
                        <thead>
                            <tr>
                                <th scope="col">Tài xế</th>
                                <th scope="col">Xe</th>
                                <th scope="col">Biển số xe</th>
                                <th scope="col">Chở</th>
                                <th scope="col">Từ</th>
                                <th scope="col">Đến</th>
                                <th scope="col">Vào lúc</th>
                                <th scope="col">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                }
            </div>
        </>
    );    
}
export default History;