import React, {useState,useEffect} from 'react'
import * as Realm from "realm-web";
import * as bootstrap from 'bootstrap';
import _ from 'lodash';
import {Helmet} from 'react-helmet';
import $ from "jquery";
import { DataGrid } from '@mui/x-data-grid';
import Chart from "react-apexcharts";

import { loading } from '../constant';
import CustomPagination from '../components/MUI-DGPagination';
import CustomToolbar from '../components/MUI-DGToolbar';
import BSCard from '../components/BS-Card';

const realmapp = new Realm.App({id: "ql-doi-xe-hunghau-dehpw"});
const credentials = Realm.Credentials.anonymous();

// const getData = async (folder,name) =>{
//     return await fetch('data/'+folder+name+'.json')
//     .then(response => response.json())
//     .then(data => {return data});
// }

function Dashboard(props){
    const [data, setData] = useState([]);
    // const [driver, setDriver] = useState(); 
    // const [car, setCar] = useState();
    // const [carNumber, setCarNumber] = useState();
    // const [carry, setCarry] = useState();
    // const [from, setFrom] = useState();
    // const [to, setTo] = useState();
    // const [when, setWhen] = useState();
    // const [status, setStatus] = useState();
    async function dataName(params){
        const realmUser = await realmapp.logIn(credentials);
        setData(await realmUser.callFunction('getTripHistory', {}));
    }

    useEffect(()=>{
        dataName();
    },[]);

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

    function formatDate(date){
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        if(dd<10) {dd='0'+dd}
        if(mm<10) {mm='0'+mm}
        var day = dd+'/'+mm;
        return {
            str: day,
            date: date
        };
    }

    function getLast7Days(){
        var result = [];
        for (var i = 6; i >= 0; i--){
            var d = new Date();
            d.setDate(d.getDate() - i);
            result.push(formatDate(d))
        }
        return result;
    }
    const last7days = getLast7Days();
    console.log(last7days);
    var dateArr = [];
    for(var i = 0; i < last7days.length; i++){
        dateArr = [...dateArr, last7days[i].str];
    } 
    
    var options = {
        chart: {
            id: "test-bar"
        },
        xaxis: {
            categories: dateArr
        }
    };

    var series = [{
        name: 'chuyến',
        data: [10,15,10,15,12,8,11]
    }];
        
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
                    <div className="row m-0 p-3">
                        <BSCard href="/users" color="#4e73df" title="Người dùng" statusText="Quản lý người dùng" icon={<i className="bi bi-person-fill fs-1" style={{color: "#dddfeb"}}></i>}/>
                        <BSCard href=" " color="#1cc88a" title="Xe" statusText="Hiện đang có 0 xe sẵn sàng!" icon={<span className="fs-1" style={{color: "#dddfeb"}}>&#9951;</span>}/>
                        <BSCard href=" " color="#36b9cc" title="Địa điểm" statusText="Quản lý địa điểm" icon={<i className="bi bi-geo-alt-fill fs-1" style={{color: "#dddfeb"}}></i>}/>
                        <BSCard href="/history" color="#f6c23e" title="Lịch sử" statusText="Lịch sử di chuyển" icon={<i className="bi bi-clock-fill fs-1" style={{color: "#dddfeb"}}></i>}/>
                    </div>
                    <div className="row m-0 p-3">
                        <div className="col-xl-6">
                            <div className="p-3 shadow rounded">
                                <h3 className="text-center pt-2 pb-2">BIỂU ĐỒ SỐ CHUYẾN ĐI 7 NGÀY GẦN NHẤT</h3>
                                <div style={{height: "520px"}}>
                                    <Chart options={options} series={series} type="bar"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="p-3 shadow rounded">
                                <h3 className="text-center pt-2 pb-2">BIỂU ĐỒ SỐ CHUYẾN ĐI TRONG TUẦN</h3>
                                <div style={{height: "520px"}}>
                                    <Chart options={options} series={series} type="bar"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-0 p-3">
                        <div className="col-xl-6">
                            <div className="p-3 shadow rounded">
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
                        <div className="col-xl-6">
                            <div className="p-3 shadow rounded">
                            <h3 className="text-center pt-2 pb-2">DANH SÁCH CÁC XE ĐANG ĐƯA ĐÓN</h3>
                                <div style={{height: "520px"}}>
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