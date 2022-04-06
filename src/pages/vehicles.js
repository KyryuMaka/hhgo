import React, {useState,useEffect} from 'react';
import * as Realm from "realm-web";
import _ from 'lodash'
import {Helmet} from 'react-helmet';

import $ from "jquery";
import { loading } from '../constant';

import { DataGrid } from '@mui/x-data-grid';
import Divider from '@mui/material/Divider';

import CustomPagination from '../components/MUI-DGPagination';
import {VehicleToolbar} from '../components/MUI-DGToolbar';

const realmapp = new Realm.App({id: "ql-doi-xe-hunghau-dehpw"});
const credentials = Realm.Credentials.anonymous();

function Vehicles(props){
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([]);
    const [objData, setObjData] = useState({});
    const [DonViPB, setDonViPB] = useState();
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
            setData(await realmUser.callFunction('getVehicles', {}));
        }
        dataName();
    },[]);

    const columns = [
        {field:"displayName",   headerAlign: 'center', headerName: "Tên xe",    flex: 2},
        {field:"type",          headerAlign: 'center', headerName: "Loại",      flex: 1,    align: "center"},
        {field:"manufacturer",  headerAlign: 'center', headerName: "Hãng",      flex: 1.5,  align: "center"},
        {field:"carNumber",     headerAlign: 'center', headerName: "Biển số",   flex: 1.5,  align: "center"},
        {field:"assignment",    headerAlign: 'center', headerName: "Phân công", flex: 2}
    ];
    
    const handleChange = (e)=>{
        setSelected(e);
        setObjData(data.find(dt => dt._id === e[0]));
        if(_.isEmpty(e)){
            $('#updateButton').addClass("Mui-disabled");
            $('#deleteButton').addClass("Mui-disabled");
            $('#assignmentButton').addClass("Mui-disabled");
        }else{
            if(e.length === 1){
                $('#updateButton').removeClass("Mui-disabled");
                $('#updateButton').removeAttr("disabled");
                $('#assignmentButton').removeClass("Mui-disabled");
                $('#assignmentButton').removeAttr("disabled");
            }else{
                $('#updateButton').addClass("Mui-disabled");
                $('#assignmentButton').addClass("Mui-disabled");
            }
            $('#deleteButton').removeClass("Mui-disabled");
            $('#deleteButton').removeAttr("disabled");
        }
    }
    if(objData !== undefined)
    if(objData.permission === "Driver"){
        $("[driver=true]").removeAttr("disabled");
    }else{
        $("[driver=true]").attr("disabled", true);
        $("[driver=true]").val("");
    }

    const handleChangePermission = (e)=>{
        setObjData({...objData, permission: e.target.value});
    }

    async function handleAddVehicle(e){
        e.preventDefault();
        var tmp = {};
        for(var i = 0; i < e.target.length-2; i++){
            tmp[`${e.target[i].id}`] = e.target[i].value;
        }
        console.log(tmp);
        const realmUser = await realmapp.logIn(credentials);
        const tmp2 = await realmUser.callFunction('insertVehicle', tmp);
        console.log(tmp2.rs);
        window.location.reload();
    }

    async function handleUpdateVehicle(e){
        e.preventDefault();
        const realmUser = await realmapp.logIn(credentials);
        const tmp = await realmUser.callFunction('updateVehicle', {_id: objData._id}, {$set: objData});
        console.log(tmp);
        window.location.reload();
    }

    async function handleDelVehicle(e){
        e.preventDefault();
        const realmUser = await realmapp.logIn(credentials);
        const tmp = await realmUser.callFunction('deleteVehicle', {_id: {$in: selected}});
        console.log(tmp);
        window.location.reload();
    }

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
                    <h3 className="pt-2 pb-2">Danh sách các xe</h3>
                    <div style={{height: "680px", width: "100%"}}>
                        <DataGrid
                            rows={data}
                            columns={columns}
                            pageSize={10}
                            checkboxSelection
                            getRowId={(row) => row._id}
                            onSelectionModelChange={handleChange}
                            density="comfortable"
                            components={{ 
                                Toolbar: VehicleToolbar,
                                Pagination: CustomPagination,
                            }}
                            componentsProps={{
                                toolbar: { 
                                    idAddModal: "#addVehicleModal",
                                    idUpdateModal: "#updateVehicleModal",
                                    idDeleteModal: "#deleteVehicleModal",
                                    idAssignment: "#assignmentModal",
                                },
                            }}
                        />
                    </div>
                </div>
                }
            </div>
            <div className="modal fade" id="addVehicleModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addUserModalLabel">Thêm người dùng</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleAddVehicle}>
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="permission" aria-label="" onChange={handleChangePermission}>
                                        <option selected value="Admin">Admin</option>
                                        <option value="Manager">Quản trị</option>
                                        <option value="Driver">Tài xế</option>
                                    </select>
                                    <label for="permission">Vai trò</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="fullName" placeholder="Họ và tên" required/>
                                    <label for="fullName">Họ và tên</label>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Hủy</button>
                                    <button type="submit" className="btn btn-primary">Thêm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {(objData === undefined)?null:
            <div className="modal fade" id="updateVehicleModal" tabindex="-1" aria-labelledby="updateUserModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateUserModalLabel">Chỉnh sửa thông tin người dùng</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleUpdateVehicle}>
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="permission" aria-label="" onChange={handleChangePermission} value={objData.permission}>
                                        <option selected value="Admin">Admin</option>
                                        <option value="Manager">Quản trị</option>
                                        <option value="Driver">Tài xế</option>
                                    </select>
                                    <label for="permission">Vai trò</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="fullName" placeholder="Họ và tên" required onChange={(e) => setObjData({...objData, fullName: e.target.value})} value={objData.fullName}/>
                                    <label for="fullName">Họ và tên</label>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Hủy</button>
                                    <button type="submit" className="btn btn-primary">Sửa</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>}
            <div className="modal fade" id="deleteVehicleModal" tabindex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteUserModalLabel">Xác nhận</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h2 className="mb-4">Bạn thực sự muốn xóa ?</h2>
                            <div className="d-flex justify-content-center">
                                <button type="button" className="btn btn-secondary me-2 w-100" data-bs-dismiss="modal">Hủy</button>
                                <button type="button" className="btn btn-primary w-100" onClick={handleDelVehicle}>Xóa</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );    
}
export default Vehicles;