import React, {useState,useEffect} from 'react';
import * as Realm from "realm-web";
import _ from 'lodash'
import {Helmet} from 'react-helmet';

import $ from "jquery";
import { loading } from '../constant';

import { DataGrid } from '@mui/x-data-grid';
import Divider from '@mui/material/Divider';

import CustomPagination from '../components/MUI-DGPagination';
import {QuickSearchToolbar} from '../components/MUI-DGToolbar';

const realmapp = new Realm.App({id: "ql-doi-xe-hunghau-dehpw"});
const credentials = Realm.Credentials.anonymous();

const getData = async (folder,name) =>{
    return await fetch('data/'+folder+name+'.json')
    .then(response => response.json())
    .then(data => {return data});
}

function User(props){
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([]);
    const [objData, setObjData] = useState({});
    const [DonViPB, setDonViPB] = useState();

    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState(data);

    useEffect(()=>{
        async function dataName(params){
            const realmUser = await realmapp.logIn(credentials);
            setData(await realmUser.callFunction('getUser', {}));
            setDonViPB(await getData("","donVi"));
        }
        dataName();
    },[]);

    const columns = [
        {field:"fullName",      headerAlign: 'center', headerName: "Họ và tên",         flex: 2},
        {field:"gender",        headerAlign: 'center', headerName: "Giới tính",         flex: 1,    align: "center"},
        {field:"phone1",        headerAlign: 'center', headerName: "Số điện thoại 1",   flex: 1.5,  align: "center"},
        {field:"phone2",        headerAlign: 'center', headerName: "Số điện thoại 2",   flex: 1.5,  align: "center"},
        {field:"donVi",         headerAlign: 'center', headerName: "Đơn vị",            flex: 1,    align: "center"},
        {field:"permission",    headerAlign: 'center', headerName: "Quyền",             flex: 1,    align: "center"},
    ];

    function escapeRegExp(value) {
        return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = data.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    useEffect(() => {
        setRows(data);
    },[data]);
    
    const handleChange = (e)=>{
        setSelected(e);
        setObjData(data.find(dt => dt._id === e[0]));
        if(_.isEmpty(e)){
            $('#updateButton').addClass("Mui-disabled");
            $('#deleteButton').addClass("Mui-disabled");
        }else{
            if(e.length === 1){
                $('#updateButton').removeClass("Mui-disabled");
                $('#updateButton').removeAttr("disabled");
            }else{
                $('#updateButton').addClass("Mui-disabled");
            }
            $('#deleteButton').removeClass("Mui-disabled");
            $('#deleteButton').removeAttr("disabled");
        }
    }
    if(objData !== undefined)
    if(objData.permission === "Driver"){
        $("[driver=true]").removeAttr("disabled");
        $("[driver=false]").attr("disabled", true);
    }else{
        $("[driver=false]").removeAttr("disabled");
        $("[driver=true]").attr("disabled", true);
        $("[driver=true]").val("");
    }

    const handleChangePermission = (e)=>{
        setObjData({...objData, permission: e.target.value});
    }

    async function handleAddUser(e){
        e.preventDefault();
        var tmp = {};
        for(var i = 0; i < e.target.length-2; i++){
            tmp[`${e.target[i].id}`] = e.target[i].value;
        }
        console.log(tmp);
        const realmUser = await realmapp.logIn(credentials);
        const tmp2 = await realmUser.callFunction('insertUser', tmp);
        console.log(tmp2.rs);
        window.location.reload();
    }

    async function handleUpdateUser(e){
        e.preventDefault();
        const realmUser = await realmapp.logIn(credentials);
        const tmp = await realmUser.callFunction('updateUser', {_id: objData._id}, {$set: objData});
        console.log(tmp);
        window.location.reload();
    }

    async function handleDelUser(e){
        e.preventDefault();
        const realmUser = await realmapp.logIn(credentials);
        const tmp = await realmUser.callFunction('deleteUser', {_id: {$in: selected}});
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
                    <h3 className="pt-2 pb-2">Danh sách người dùng</h3>
                    <div style={{height: "680px", width: "100%"}}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            checkboxSelection
                            getRowId={(row) => row._id}
                            onSelectionModelChange={handleChange}
                            density="comfortable"
                            components={{ 
                                Toolbar: QuickSearchToolbar,
                                Pagination: CustomPagination,
                            }}
                            componentsProps={{
                                toolbar: {
                                    value: searchText,
                                    onChange: (event) => requestSearch(event.target.value),
                                    clearSearch: () => requestSearch(''),
                                    idAddModal: "#addUserModal",
                                    idUpdateModal: "#updateUserModal",
                                    idDeleteModal: "#deleteUserModal"
                                },
                            }}
                        />
                    </div>
                </div>
                }
            </div>
            <div className="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addUserModalLabel">Thêm người dùng</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleAddUser}>
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="permission" aria-label="" onChange={handleChangePermission}>
                                        <option selected value="Admin">Admin</option>
                                        <option value="Manager">Quản trị</option>
                                        <option value="Driver">Tài xế</option>
                                    </select>
                                    <label for="permission">Vai trò</label>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <Divider textAlign="left">Thông tin cơ bản (Bắt buộc)</Divider>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="fullName" placeholder="Họ và tên" required/>
                                            <label for="fullName">Họ và tên</label>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input type="number" className="form-control" id="namSinh" placeholder="Năm sinh" required/>
                                                    <label for="namSinh">Năm sinh</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <select className="form-select" id="gender" aria-label="" required>
                                                        <option selected value="Nam">Nam</option>
                                                        <option value="Nữ">Nữ</option>
                                                    </select>
                                                    <label for="gender">Giới tính</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="address" placeholder="Địa chỉ" required/>
                                            <label for="address">Địa chỉ</label>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input type="email" className="form-control" id="email" placeholder="Email" driver="false" required/>
                                                    <label for="email">Email</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <select className="form-select" id="donVi" aria-label="" required>
                                                        <option selected hidden>Vui lòng chọn đơn vị</option>
                                                        {_.isEmpty(DonViPB)?null:Object.keys(DonViPB).map(dv => (
                                                            <option value={dv}>{dv}</option>
                                                        ))}
                                                    </select>
                                                    <label for="donVi">Đơn vị</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input type="text" className="form-control" id="idNumber" placeholder="CMND/CCCD" required/>
                                                    <label for="idNumber">CMND/CCCD</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input type="date" className="form-control" id="idDate" placeholder="Ngày cấp CMND/CCCD" required/>
                                                    <label for="idDate">Ngày cấp CMND/CCCD</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input type="text" className="form-control" id="phone1" placeholder="Số điện thoại 1" required/>
                                                    <label for="phone1">Số điện thoại 1</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input type="text" className="form-control" id="phone2" placeholder="Số điện thoại 2" />
                                                    <label for="phone2">Số điện thoại 2</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <Divider textAlign="left">Thông tin tài xế</Divider>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input type="text" className="form-control" id="soGPLX" placeholder="Số GPLX" driver="true" disabled/>
                                                    <label for="soGPLX">Số GPLX</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <select className="form-select" id="hangGPLX" aria-label="" driver="true" disabled>
                                                        <option value="B1">B1</option>
                                                        <option value="B2">B2</option>
                                                        <option value="C">C</option>
                                                        <option value="D">D</option>
                                                        <option value="E">E</option>
                                                        <option value="F">F</option>
                                                    </select>
                                                    <label for="hangGPLX">Hạng GPLX</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input type="date" className="form-control" id="ngayCapGPLX" placeholder="Ngày cấp GPLX" driver="true" disabled/>
                                                    <label for="ngayCapGPLX">Ngày cấp GPLX</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input type="date" className="form-control" id="giaTriGPLX" placeholder="Giá trị GPLX" driver="true" disabled/>
                                                    <label for="giaTriGPLX">Giá trị GPLX</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
            <div className="modal fade" id="updateUserModal" tabindex="-1" aria-labelledby="updateUserModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateUserModalLabel">Chỉnh sửa thông tin người dùng</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleUpdateUser}>
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="permission" aria-label="" onChange={handleChangePermission} value={objData.permission}>
                                        <option selected value="Admin">Admin</option>
                                        <option value="Manager">Quản trị</option>
                                        <option value="Driver">Tài xế</option>
                                    </select>
                                    <label for="permission">Vai trò</label>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <Divider textAlign="left">Thông tin cơ bản (Bắt buộc)</Divider>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="fullName" placeholder="Họ và tên" required onChange={(e) => setObjData({...objData, fullName: e.target.value})} value={objData.fullName}/>
                                            <label for="fullName">Họ và tên</label>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input type="number" className="form-control" id="namSinh" placeholder="Năm sinh" required onChange={(e) => setObjData({...objData, namSinh: e.target.value})} value={objData.namSinh}/>
                                                    <label for="namSinh">Năm sinh</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <select className="form-select" id="gender" aria-label="" required onChange={(e) => setObjData({...objData, gender: e.target.value})} value={objData.gender}>
                                                        <option selected value="Nam">Nam</option>
                                                        <option value="Nữ">Nữ</option>
                                                    </select>
                                                    <label for="gender">Giới tính</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="address" placeholder="Địa chỉ" required onChange={(e) => setObjData({...objData, address: e.target.value})} value={objData.address}/>
                                            <label for="address">Địa chỉ</label>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input type="email" className="form-control" id="email" placeholder="Email" required onChange={(e) => setObjData({...objData, email: e.target.value})} value={objData.email}/>
                                                    <label for="email">Email</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <select className="form-select" id="donVi" aria-label="" required onChange={(e) => setObjData({...objData, donVi: e.target.value})} value={objData.donVi}>
                                                        <option selected hidden>Vui lòng chọn đơn vị</option>
                                                        {_.isEmpty(DonViPB)?null:Object.keys(DonViPB).map(dv => (
                                                            <option value={dv}>{dv}</option>
                                                        ))}
                                                    </select>
                                                    <label for="donVi">Đơn vị</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input type="text" className="form-control" id="idNumber" placeholder="CMND/CCCD" required onChange={(e) => setObjData({...objData, idNumber: e.target.value})} value={objData.idNumber}/>
                                                    <label for="idNumber">CMND/CCCD</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input type="date" className="form-control" id="idDate" placeholder="Ngày cấp CMND/CCCD" required onChange={(e) => setObjData({...objData, idDate: e.target.value})} value={objData.idDate}/>
                                                    <label for="idDate">Ngày cấp CMND/CCCD</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input type="text" className="form-control" id="phone1" placeholder="Số điện thoại 1" required onChange={(e) => setObjData({...objData, phone1: e.target.value})} value={objData.phone1}/>
                                                    <label for="phone1">Số điện thoại 1</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input type="text" className="form-control" id="phone2" placeholder="Số điện thoại 2" onChange={(e) => setObjData({...objData, phone2: e.target.value})} value={objData.phone2}/>
                                                    <label for="phone2">Số điện thoại 2</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <Divider textAlign="left">Thông tin tài xế</Divider>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input type="text" className="form-control" id="soGPLX" placeholder="Số GPLX" driver="true" disabled onChange={(e) => setObjData({...objData, soGPLX: e.target.value})} value={objData.soGPLX}/>
                                                    <label for="soGPLX">Số GPLX</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <select className="form-select" id="hangGPLX" aria-label="" driver="true" disabled onChange={(e) => setObjData({...objData, hangGPLX: e.target.value})} value={objData.hangGPLX}>
                                                        <option value="B1">B1</option>
                                                        <option value="B2">B2</option>
                                                        <option value="C">C</option>
                                                        <option value="D">D</option>
                                                        <option value="E">E</option>
                                                        <option value="F">F</option>
                                                    </select>
                                                    <label for="hangGPLX">Hạng GPLX</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input type="date" className="form-control" id="ngayCapGPLX" placeholder="Ngày cấp GPLX" driver="true" disabled onChange={(e) => setObjData({...objData, ngayCapGPLX: e.target.value})} value={objData.ngayCapGPLX}/>
                                                    <label for="ngayCapGPLX">Ngày cấp GPLX</label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-floating">
                                                    <input type="date" className="form-control" id="giaTriGPLX" placeholder="Giá trị GPLX" driver="true" disabled onChange={(e) => setObjData({...objData, giaTriGPLX: e.target.value})} value={objData.giaTriGPLX}/>
                                                    <label for="giaTriGPLX">Giá trị GPLX</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
            <div className="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
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
                                <button type="button" className="btn btn-primary w-100" onClick={handleDelUser}>Xóa</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );    
}
export default User;