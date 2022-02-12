import React, {useState,useEffect} from 'react'
import * as Realm from "realm-web";
import * as bootstrap from 'bootstrap';
import _ from 'lodash';
import {Helmet} from 'react-helmet';
import { useHistory } from 'react-router-dom';

import $ from "jquery";
import {DataTable} from 'datatables.net-bs5';
import { loading, detail } from '../constant';

const realmapp = new Realm.App({id: "ql-doi-xe-hunghau-xxssb"});
const credentials = Realm.Credentials.anonymous();

// const getData = async (folder,name) =>{
//     return await fetch('data/'+folder+name+'.json')
//     .then(response => response.json())
//     .then(data => {return data});
// }

function Dashboard(props){
    const history = useHistory();

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
            setData(await realmUser.callFunction('getDBData', {}));
        }
        dataName();
    },[]);

    useEffect(()=>{
        $('#drivingTable').DataTable({
            retrieve: true,
            data:data,
            pageLength:10,
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
        $('#emptyTable').DataTable({
            retrieve: true,
            data:data,
            pageLength:10,
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
            <Helmet titleTemplate="%s | HHGo">
                {(_.isEmpty(data))?<title>Loading...</title>:<title>{props.title}</title>}
                <meta name="description" content="Đội xe Hùng Hậu"/>
            </Helmet>
            <div className="main">
                {(_.isEmpty(data))?
                <div className="vh-100"><span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading...</div>:
                <>
                    <div className="row m-0 pt-3">
                        <div className="col-lg-3">
                            <div className="container p-3">
                                <div className="card " style={{"backgroundImage":"linear-gradient(to bottom, rgb(13, 110, 253, 0.5), rgba(13, 110, 253, 0.8))"}}>
                                    <div class="card-body">
                                        <h5 className="card-title">Tài xế</h5>
                                        <p className="card-text">Hiện đang có 0 tài xế sẵn sàng!</p>
                                        <a href="#">{detail}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="container p-3">
                                <div className="card" style={{"backgroundImage":"linear-gradient(to bottom, rgba(13, 202, 240, 0.5), rgba(13, 202, 240, 0.8))"}}>
                                    <div class="card-body">
                                        <h5 className="card-title">Xe</h5>
                                        <p className="card-text">Hiện đang có 0 xe sẵn sàng!</p>
                                        <a href="#">{detail}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="container p-3">
                                <div className="card" style={{"backgroundImage":"linear-gradient(to bottom, rgba(32, 201, 151, 0.5), rgba(32, 201, 151, 0.8))"}}>
                                    <div class="card-body">
                                        <h5 className="card-title">Địa điểm</h5>
                                        <p className="card-text">Những địa điểm thường xuyên di chuyển</p>
                                        <a href="#">{detail}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="container p-3">
                                <div className="card" style={{"backgroundImage":"linear-gradient(to bottom, rgba(255, 193, 7, 0.5), rgba(255, 193, 7, 0.8))"}}>
                                    <div class="card-body">
                                        <h5 className="card-title">Lịch sử</h5>
                                        <p className="card-text">Lịch sử di chuyển</p>
                                        <a href="/history" onClick={(e) => {e.preventDefault(); history.push(e.target.pathname)}}>{detail}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-0">
                        <div className="col-xxl-6">
                            <div className="container p-3">
                                <h3 className="table-caption">DANH SÁCH CÁC XE ĐANG ĐƯA ĐÓN</h3>
                                <table className="table table-striped table-hover table-bordered table-sm align-middle" id="drivingTable">
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
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-xxl-6">
                            <div className="container p-3">
                                <h3 className="table-caption">DANH SÁCH CÁC XE ĐANG TRỐNG</h3>
                                <table className="table table-striped table-hover table-bordered table-sm align-middle" id="emptyTable">
                                    <thead>
                                        <tr key={null}>
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
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>}
            </div>
        </>
    );
}
export default Dashboard;