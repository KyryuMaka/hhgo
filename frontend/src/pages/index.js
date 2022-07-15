import React, {useState,useEffect} from 'react'
import * as Realm from "realm-web";
import _ from 'lodash';
import {Helmet} from 'react-helmet';
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
    async function dataName(params){
        const realmUser = await realmapp.logIn(credentials);
        setData(await realmUser.callFunction('getVehicles', {}));
    }

    useEffect(()=>{
        dataName();
    },[]);
    
    var data1 = data.filter((val) => val.assignment === "");
    var data2 = data.filter((val) => val.assignment !== "");

    const columns = [
        {field:"ownerName",     headerAlign: 'center', headerName: "Tên chủ xe",    flex: 2},
        {field:"type",          headerAlign: 'center', headerName: "Loại",          flex: 1,    align: "center"},
        {field:"brand",         headerAlign: 'center', headerName: "Hãng",          flex: 1.5,  align: "center"},
        {field:"plateNumber",   headerAlign: 'center', headerName: "Biển số",       flex: 1.5,  align: "center"},
        {field:"assignment",    headerAlign: 'center', headerName: "Phân công",     flex: 2,    align: "center"}
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

    var option2 = {
        labels: ["613 Âu Cơ", "740 ĐBP", "624 Âu Cơ", "642 Âu Cơ"],
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toFixed(2) + "%"
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Tổng',
                            fontSize: '22px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
                            color: '#373d3f',
                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0) + " chuyến"
                            }
                        }
                    }
                }
            }
        }
    }

    var series2 = [15, 10, 5, 5];
        
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
                        <BSCard 
                            href="/users"
                            color="#4e73df" 
                            title="Người dùng"  
                            statusText="Quản lý người dùng"             
                            icon={<i className="bi bi-person-fill fs-1" style={{color: "#dddfeb"}}></i>}
                        />
                        <BSCard 
                            href="/vehicles"    
                            color="#1cc88a" 
                            title="Xe"          
                            statusText="Quản lý xe và phân công tài xế" 
                            icon={<span className="fs-1" style={{color: "#dddfeb"}}>&#9951;</span>}
                        />
                        <BSCard 
                            href=" "
                            color="#36b9cc" 
                            title="Địa điểm"    
                            statusText="Quản lý địa điểm"               
                            icon={<i className="bi bi-geo-alt-fill fs-1" style={{color: "#dddfeb"}}></i>}
                        />
                        <BSCard 
                            href="/history"
                            color="#f6c23e" 
                            title="Lịch sử"     
                            statusText="Lịch sử di chuyển"              
                            icon={<i className="bi bi-clock-fill fs-1" style={{color: "#dddfeb"}}></i>}
                        />
                    </div>
                    <div className="row m-0 p-3">
                        <div className="col-xl-6">
                            <div className="p-3 shadow rounded">
                                <h3 className="text-center pt-2 pb-2">BIỂU ĐỒ SỐ CHUYẾN ĐI <br/>7 NGÀY GẦN NHẤT</h3>
                                <div style={{height: "520px"}}>
                                    <Chart options={options} series={series} type="bar"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="p-3 shadow rounded">
                                <h3 className="text-center pt-2 pb-2">BIỂU ĐỒ SỐ CHUYẾN ĐI <br/>TRONG TUẦN</h3>
                                <div style={{height: "520px"}}>
                                    <Chart height="520" options={option2} series={series2} type="donut"/>
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
                                        rows={data1}
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
                                        rows={data2}
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