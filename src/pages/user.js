import React, {useState,useEffect} from 'react';
import * as Realm from "realm-web";
import * as bootstrap from 'bootstrap';
import _ from 'lodash'
import {Helmet} from 'react-helmet';

import $ from "jquery";
import { loading } from '../constant';

import { DataGrid } from '@mui/x-data-grid';

const realmapp = new Realm.App({id: "ql-doi-xe-hunghau-xxssb"});
const credentials = Realm.Credentials.anonymous();

// const getData = async (folder,name) =>{
//     return await fetch('data/'+folder+name+'.json')
//     .then(response => response.json())
//     .then(data => {return data});
// }

function User(props){
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
            setData(await realmUser.callFunction('getUser', {}));
        }
        dataName();
    },[]);

    const columns = [
        {field:"fullName",      headerAlign: 'center', headerName: "Họ và tên",         flex: 2},
        {field:"namSinh",       headerAlign: 'center', headerName: "Năm sinh",          flex: 1,    align: "center"},
        {field:"gender",        headerAlign: 'center', headerName: "Giới tính",         flex: 1,    align: "center"},
        {field:"phone1",        headerAlign: 'center', headerName: "Số điện thoại 1",   flex: 1.5,  align: "center"},
        {field:"phone2",        headerAlign: 'center', headerName: "Số điện thoại 2",   flex: 1.5,  align: "center"},
        {field:"email",         headerAlign: 'center', headerName: "Email",             flex: 2},
        {field:"donVi",         headerAlign: 'center', headerName: "Đơn vị",            flex: 1,    align: "center"},
        {field:"chuyenCho",     headerAlign: 'center', headerName: "Chuyên chở",        flex: 2},
        {field:"permission",    headerAlign: 'center', headerName: "Quyền",             flex: 1,    align: "center"},
    ];

    return(
        <>
            <Helmet titleTemplate="%s · HHGo">
                {(_.isEmpty(data))?<title>{loading}</title>:<title>{props.title}</title>}
                <meta name="description" content="Đội xe Hùng Hậu"/>
            </Helmet>
            <div className="main vh-100 d-flex align-items-center justify-content-center">
                {(_.isEmpty(data))?
                <div><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>{loading}</div>:
                <div className="container p-3 shadow rounded">
                    <h3 className="pt-2 pb-2">Danh sách người dùng</h3>
                    <div style={{height: "650px", width: "100%"}}>
                        <DataGrid
                            rows={data}
                            columns={columns}
                            pageSize={10}
                            checkboxSelection
                            getRowId={(row) => row._id}
                        />
                    </div>
                </div>
                }
            </div>
        </>
    );    
}
export default User;