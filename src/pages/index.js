import React, {useState,useEffect} from 'react'
import * as Realm from "realm-web";
import * as bootstrap from 'bootstrap';
import _ from 'lodash';
import {Helmet} from 'react-helmet';
import { useHistory } from 'react-router-dom';

import $ from "jquery";
import { Detail, loading } from '../constant';

import { DataGrid } from '@mui/x-data-grid';
import CustomPagination from '../components/MUI-DGPagination';
import CustomToolbar from '../components/MUI-DGToolbar';

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
            setData(await realmUser.callFunction('getTripHistory', {}));
        }
        dataName();
    },[]);

    const handleClick = (e) => {
        e.preventDefault(); 
        history.push(e.target.pathname);
        $('.sb-li .sb-a').removeClass("active");
        $("a[href='"+e.target.pathname+"']").addClass("active");
    }

    const columns = [
        { field: 'driver',      headerName: 'Tài xế',       headerAlign: 'center', flex: 2},
        { field: 'car',         headerName: 'Xe',           headerAlign: 'center', flex: 1.5},
        { field: 'carNumber',   headerName: 'Biển số',      headerAlign: 'center', flex: 1, align: "center"},
        { field: 'cary',        headerName: 'Chở',          headerAlign: 'center', flex: 2},
        { field: 'from',        headerName: 'Từ',           headerAlign: 'center', flex: 2},
        { field: 'to',          headerName: 'Đến',          headerAlign: 'center', flex: 2},
        // {
        //   field: 'fullName',
        //   headerName: 'Full name',
        //   description: 'This column has a value getter and is not sortable.',
        //   sortable: false,
        //   width: 160,
        //   valueGetter: (params) =>
        //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        // },
    ];
        
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
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>{loading}
                    </div>
                </div>:
                <>
                    <div className="row m-0 pt-3">
                        <div className="col-lg-3">
                            <div className="container p-3">
                                <div className="card border-top-0 border-bottom-0 border-end-0 border-4 shadow h-100 py-2" style={{borderColor: "#4e73df"}}>
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col me-2">
                                                <div className="fw-bold text-uppercase mb-1" style={{color: "#4e73df"}}>Tài xế</div>
                                                <div className="fs-6 mb-0 text-black-50">Hiện đang có 0 tài xế sẵn sàng!</div>
                                                <a href=" " onClick={handleClick}><Detail/></a>
                                            </div>
                                            <div className="col-auto">
                                                <i className="bi bi-person-fill fs-1" style={{color: "#dddfeb"}}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="container p-3">
                                <div className="card border-top-0 border-bottom-0 border-end-0 border-4 shadow h-100 py-2" style={{borderColor: "#1cc88a"}}>
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col me-2">
                                                <div className="fw-bold text-uppercase mb-1" style={{color: "#1cc88a"}}>Xe</div>
                                                <div className="fs-6 mb-0 text-black-50">Hiện đang có 0 xe sẵn sàng!</div>
                                                <a href=" " onClick={handleClick}><Detail/></a>
                                            </div>
                                            <div className="col-auto">
                                                <span className="fs-1" style={{color: "#dddfeb"}}>&#9951;</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="container p-3">
                                <div className="card border-top-0 border-bottom-0 border-end-0 border-4 shadow h-100 py-2" style={{borderColor: "#36b9cc"}}>
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col me-2">
                                                <div className="fw-bold text-uppercase mb-1" style={{color: "#36b9cc"}}>Địa điểm</div>
                                                <div className="fs-6 mb-0 text-black-50">Quản lý địa điểm</div>
                                                <a href=" " onClick={handleClick}><Detail/></a>
                                            </div>
                                            <div className="col-auto">
                                                <i className="bi bi-geo-alt-fill fs-1" style={{color: "#dddfeb"}}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="container p-3">
                                <div className="card border-top-0 border-bottom-0 border-end-0 border-4 shadow h-100 py-2" style={{borderColor: "#f6c23e"}}>
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col me-2">
                                                <div className="fw-bold text-uppercase mb-1" style={{color: "#f6c23e"}}>Lịch sử</div>
                                                <div className="fs-6 mb-0 text-black-50">Lịch sử di chuyển</div>
                                                <a href="/history" onClick={handleClick}><Detail/></a>
                                            </div>
                                            <div className="col-auto">
                                                <i className="bi bi-clock-fill fs-1" style={{color: "#dddfeb"}}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-0 p-3 pt-2">
                        <div className="col-xl-6">
                            <div className="container p-3 shadow rounded">
                                <h3 className="text-center pt-2 pb-2">DANH SÁCH CÁC XE ĐANG ĐƯA ĐÓN</h3>
                                <div style={{height: "520px", width: "100%"}}>
                                    <DataGrid
                                        rows={data}
                                        columns={columns}
                                        pageSize={5}
                                        checkboxSelection
                                        getRowId={(row) => row._id}
                                        density="comfortable"
                                        components={{ 
                                            Toolbar: CustomToolbar,
                                            Pagination: CustomPagination,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="container p-3 shadow rounded">
                                <h3 className="text-center pt-2 pb-2">DANH SÁCH CÁC XE ĐANG TRỐNG</h3>
                                <div style={{height: "520px", width: "100%"}}>
                                    <DataGrid
                                        rows={data}
                                        columns={columns}
                                        pageSize={5}
                                        checkboxSelection
                                        getRowId={(row) => row._id}
                                        density="comfortable"
                                        components={{ 
                                            Toolbar: CustomToolbar,
                                            Pagination: CustomPagination,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
            </div>
        </>
    );
}
export default Dashboard;