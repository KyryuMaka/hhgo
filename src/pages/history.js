import React, {useState,useEffect} from 'react';
import * as Realm from "realm-web";
import _ from 'lodash'
import {Helmet} from 'react-helmet';

import $ from "jquery";
import { loading } from '../constant';

import { DataGrid } from '@mui/x-data-grid';
import CustomToolbar from '../components/MUI-DGToolbar';
import CustomPagination from '../components/MUI-DGPagination';

const realmapp = new Realm.App({id: "ql-doi-xe-hunghau-dehpw"});
const credentials = Realm.Credentials.anonymous();

// const getData = async (folder,name) =>{
//     return await fetch('data/'+folder+name+'.json')
//     .then(response => response.json())
//     .then(data => {return data});
// }

function History(props){
    const [data, setData] = useState([]);

    useEffect(()=>{
        async function dataName(params){
            const realmUser = await realmapp.logIn(credentials);
            setData(await realmUser.callFunction('getTripHistory', {}));
        }
        dataName();
    },[]);

    const columns = [
        { field: 'driver',          headerName: 'Tài xế',       headerAlign: 'center', flex: 2},
        { field: 'plateNumber',     headerName: 'Biển số',      headerAlign: 'center', flex: 1, align: "center"},
        { field: 'from',            headerName: 'Từ',           headerAlign: 'center', flex: 2},
        { field: 'to',              headerName: 'Đến',          headerAlign: 'center', flex: 2},
        { field: 'whenGo',          headerName: 'Đi lúc',       headerAlign: 'center', flex: 2, align: "center"},
        { field: 'whenComplete',    headerName: 'Đến lúc',      headerAlign: 'center', flex: 2, align: "center"},
        { field: 'status',          headerName: 'Trạng thái',   headerAlign: 'center', flex: 2},
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
            <div className="main vh-100 d-flex align-items-center justify-content-center">
                {(_.isEmpty(data))?
                <div><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>{loading}</div>:
                <div className="container p-3 shadow rounded">
                    <h3 className="pt-2 pb-2">LỊCH SỬ DI CHUYỂN</h3>
                    <div style={{height: "680px", width: "100%"}}>
                        <DataGrid
                            rows={data}
                            columns={columns}
                            pageSize={10}
                            checkboxSelection
                            getRowId={(row) => row._id}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'whenGo', sort: 'desc' }],
                                },
                            }}
                            components={{
                                Toolbar: CustomToolbar,
                                Pagination: CustomPagination,
                            }}
                        />
                    </div>
                </div>
                }
            </div>
        </>
    );    
}
export default History;