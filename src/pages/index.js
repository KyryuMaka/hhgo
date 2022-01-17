import React, {useState,useEffect} from 'react'
import * as Realm from "realm-web";
import * as bootstrap from 'bootstrap';
import _ from 'lodash'
import {Helmet} from 'react-helmet';

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



function Dashboard(props){
    var stt1 = 0;
    var stt2 = 0;
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
    });
        
    return(
        <div>
            <Helmet titleTemplate="%s | HHGo">
                <title>{props.title}</title>
                <meta name="description" content="Đội xe Hùng Hậu"/>
            </Helmet>
            <div className="d-flex">
                <SideBar />
                <div className="main">
                    <div className="row m-0">
                        <div className="col-xxl-6">
                            <div className="container p-3">
                                <h3 className="table-caption">DANH SÁCH CÁC XE ĐANG ĐƯA ĐÓN</h3>
                                <table className="table table-striped table-hover table-bordered table-sm align-middle">
                                    <thead>
                                        <tr>
                                            <th scope="col">TT</th>
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
                                    <tbody>
                                        {data.map(item => {
                                            stt1++;
                                            return(
                                            <tr>
                                                <th scope="row">{stt1}</th>
                                                <td>{item.driver}</td>
                                                <td>{item.car}</td>
                                                <td>{item.carNumber}</td>
                                                <td>{item.cary}</td>
                                                <td>{item.from}</td>
                                                <td>{item.to}</td>
                                                <td>{item.when}</td>
                                                <td>{item.status}</td>
                                            </tr>
                                        )})}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-xxl-6">
                            <div className="container p-3">
                                <h3 className="table-caption">DANH SÁCH CÁC XE ĐANG TRỐNG</h3>
                                <table className="table table-striped table-hover table-bordered table-sm align-middle">
                                    <thead>
                                        <tr>
                                            <th scope="col">TT</th>
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
                                    <tbody>
                                        {data.map(item => {
                                            stt2++;
                                            return(
                                            <tr>
                                                <th scope="row">{stt2}</th>
                                                <td>{item.driver}</td>
                                                <td>{item.car}</td>
                                                <td>{item.carNumber}</td>
                                                <td>{item.cary}</td>
                                                <td>{item.from}</td>
                                                <td>{item.to}</td>
                                                <td>{item.when}</td>
                                                <td>{item.status}</td>
                                            </tr>
                                        )})}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
export default Dashboard;