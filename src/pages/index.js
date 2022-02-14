import React, {useState,useEffect} from 'react'
import * as Realm from "realm-web";
import * as bootstrap from 'bootstrap';
import _ from 'lodash';
import {Helmet} from 'react-helmet';
import { useHistory } from 'react-router-dom';

import $ from "jquery";
import {DataTable} from 'datatables.net-bs5';
import { detail, loading } from '../constant';

const realmapp = new Realm.App({id: "ql-doi-xe-hunghau-xxssb"});
const credentials = Realm.Credentials.anonymous();

// const getData = async (folder,name) =>{
//     return await fetch('data/'+folder+name+'.json')
//     .then(response => response.json())
//     .then(data => {return data});
// }

function Dashboard(props){
    const history = useHistory();
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

    const columns = [
        {data:"driver"},
        {data:"car"},
        {data:"carNumber"},
        {data:"cary"},
        {data:"from"},
        {data:"to"},
        {data:"when"},
        {data:"status"},
    ];
    useEffect(()=>{
        $('#drivingTable').DataTable({
            retrieve: true,
            data:data,
            pageLength:10,
            lengthChange: false,
            info: false,
            columns: columns
        });
        $('#emptyTable').DataTable({
            retrieve: true,
            data:data,
            pageLength:10,
            lengthChange: false,
            info: false,
            columns: columns
        });
    })
        
    return(
        <>
            <Helmet titleTemplate="%s · HHGo">
                {(_.isEmpty(data))?<title>{loading}</title>:<title>{props.title}</title>}
                <meta name="description" content="Đội xe Hùng Hậu"/>
            </Helmet>
            <div className="main">
                {(_.isEmpty(data))?
                <div className="vh-100 d-flex justify-content-center">
                    <div className="align-self-center">
                        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>{loading}
                    </div>
                </div>:
                <>
                    <div className="row m-0 pt-3">
                        <div className="col-lg-3">
                            <div className="container p-3">
                                <div className="card border-top-0 border-bottom-0 border-end-0 border-4 shadow h-100 py-2" style={{borderColor: "#4e73df"}}>
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col me-2">
                                                <div class="fw-bold text-uppercase mb-1" style={{color: "#4e73df"}}>Tài xế</div>
                                                <div class="fs-6 mb-0 text-black-50">Hiện đang có 0 tài xế sẵn sàng!</div>
                                            </div>
                                            <div class="col-auto">
                                                {/* icon here */}
                                            </div>
                                        </div>
                                        <a href=" ">{detail}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                        <div className="container p-3">
                                <div className="card border-top-0 border-bottom-0 border-end-0 border-4 shadow h-100 py-2" style={{borderColor: "#1cc88a"}}>
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col me-2">
                                                <div class="fw-bold text-uppercase mb-1" style={{color: "#1cc88a"}}>Xe</div>
                                                <div class="fs-6 mb-0 text-black-50">Hiện đang có 0 xe sẵn sàng!</div>
                                            </div>
                                            <div class="col-auto">
                                                {/* icon here */}
                                            </div>
                                        </div>
                                        <a href=" ">{detail}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="container p-3">
                                <div className="card border-top-0 border-bottom-0 border-end-0 border-4 shadow h-100 py-2" style={{borderColor: "#36b9cc"}}>
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col me-2">
                                                <div class="fw-bold text-uppercase mb-1" style={{color: "#36b9cc"}}>Địa điểm</div>
                                                <div class="fs-6 mb-0 text-black-50">Những địa điểm thường xuyên di chuyển</div>
                                            </div>
                                            <div class="col-auto">
                                                {/* icon here */}
                                            </div>
                                        </div>
                                        <a href=" ">{detail}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="container p-3">
                                <div className="card border-top-0 border-bottom-0 border-end-0 border-4 shadow h-100 py-2" style={{borderColor: "#f6c23e"}}>
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col me-2">
                                                <div class="fw-bold text-uppercase mb-1" style={{color: "#f6c23e"}}>Lịch sử</div>
                                                <div class="fs-6 mb-0 text-black-50">Lịch sử di chuyển</div>
                                            </div>
                                            <div class="col-auto">
                                                {/* icon here */}
                                            </div>
                                        </div>
                                        <a href="/history" onClick={(e) => {e.preventDefault(); history.push(e.target.pathname)}}>{detail}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-0">
                        <div className="col-xl-6">
                            <div className="container p-3">
                                <h3 className="table-caption">DANH SÁCH CÁC XE ĐANG ĐƯA ĐÓN</h3>
                                <table className="table table-striped table-hover table-bordered table-sm align-middle" id="drivingTable">
                                    <thead>
                                        <tr>
                                            <th scope="col">Tài xế</th>
                                            <th scope="col">Xe</th>
                                            <th scope="col">Biển số</th>
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
                        </div>
                        <div className="col-xl-6">
                            <div className="container p-3">
                                <h3 className="table-caption">DANH SÁCH CÁC XE ĐANG TRỐNG</h3>
                                <table className="table table-striped table-hover table-bordered table-sm align-middle" id="emptyTable">
                                    <thead>
                                        <tr key={null}>
                                            <th scope="col">Tài xế</th>
                                            <th scope="col">Xe</th>
                                            <th scope="col">Biển số</th>
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
                        </div>
                    </div>
                </>}
            </div>
        </>
    );
}
export default Dashboard;