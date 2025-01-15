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

function Maintenance(props){
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([]);
    const [objData, setObjData] = useState({});

    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState(data);

    useEffect(()=>{
        async function dataName(params){
            const realmUser = await realmapp.logIn(credentials);
            setData(await realmUser.callFunction('getVehicles', {}));
        }
        dataName();
    },[]);

    const columns = [
        {field:"ownerName",     headerAlign: 'center', headerName: "Tên chủ xe",    flex: 2},
        {field:"type",          headerAlign: 'center', headerName: "Loại",          flex: 1,    align: "center"},
        {field:"brand",         headerAlign: 'center', headerName: "Hãng",          flex: 1,    align: "center"},
        {field:"plateNumber",   headerAlign: 'center', headerName: "Biển số",       flex: 1,    align: "center"},
        {field:"assignment",    headerAlign: 'center', headerName: "Phân công",     flex: 2,    align: "center"},
        {field:"status",        headerAlign: 'center', headerName: "Tình trạng",    flex: 2,    align: "center"}
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
            $('#assignmentButton').addClass("Mui-disabled");
            $('#delAssignmentButton').addClass("Mui-disabled");
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
            $('#delAssignmentButton').removeClass("Mui-disabled");
            $('#delAssignmentButton').removeAttr("disabled");
            $('#deleteButton').removeClass("Mui-disabled");
            $('#deleteButton').removeAttr("disabled");
        }
    }

    async function handleAddVehicle(e){
        e.preventDefault();
        var tmp = {};
        for(var i = 0; i < e.target.length-2; i++){
            (typeof(e.target[i].value) === "number")?
            tmp[`${e.target[i].id}`] = e.target[i].value.toString():
            tmp[`${e.target[i].id}`] = e.target[i].value;
        }
        tmp = {...tmp, assignment: "", assignmentType: "", status: ""};
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

    async function handleAssignmentVehicle(e){
        e.preventDefault();
        var tmp1 = {};
        for(var i = 0; i < e.target.length-2; i++){
            (typeof(e.target[i].value) === "number")?
            tmp1[`${e.target[i].id}`] = e.target[i].value.toString():
            tmp1[`${e.target[i].id}`] = e.target[i].value;
        }
        const realmUser = await realmapp.logIn(credentials);
        const tmp = await realmUser.callFunction('updateVehicle', {_id: objData._id}, {$set: {
            assignment: tmp1.assignment, 
            assignmentType: tmp1.assignmentType,
            status: "Đã phân công"
        }});
        console.log(tmp);
        window.location.reload();
    }

    async function handleDelAssignment(e){
        e.preventDefault();
        const realmUser = await realmapp.logIn(credentials);
        const tmp = await realmUser.callFunction('updateVehicle', {_id: objData._id}, {$set: {
            assignment: "", 
            assignmentType: "",
            status: ""
        }});
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
                {/* {(_.isEmpty(data))?
                <div><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>{loading}</div>: */}
                <div className="container p-3 shadow rounded">
                    <h3 className="pt-2 pb-2">Danh sách các xe</h3>
                    <div style={{height: "75vh", width: "100%"}}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
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
                                    value: searchText,
                                    onChange: (event) => requestSearch(event.target.value),
                                    clearSearch: () => requestSearch(''), 
                                    idAddModal: "#addVehicleModal",
                                    idUpdateModal: "#updateVehicleModal",
                                    idDeleteModal: "#deleteVehicleModal",
                                    idAssignmentModal: "#assignmentModal",
                                    idDelAssignmentModal: "#delAssignmentModal"
                                },
                            }}
                        />
                    </div>
                </div>
                {/* } */}
            </div>
            <div className="modal fade" id="addVehicleModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addUserModalLabel">Thêm xe</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleAddVehicle}>
                                <div className="mb-3">
                                    <Divider textAlign="left">Thông tin xe (Bắt buộc)</Divider>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="ownerName" placeholder="Tên chủ xe" required/>
                                            <label for="ownerName">Tên chủ xe</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="engineId" placeholder="Số máy" required/>
                                            <label for="engineId">Số máy</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="address" placeholder="Địa chỉ" required/>
                                            <label for="address">Địa chỉ</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="chassisId" placeholder="Số khung" required/>
                                            <label for="chassisId">Số khung</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" id="brand" aria-label="" required>
                                                <option value="Mercedes-Benz">Mercedes-Benz</option>
                                                <option value="Toyota">Toyota</option>
                                                <option value="Honda">Honda</option>
                                                <option value="Hyundai">Hyundai</option>
                                                <option value="Ford">Ford</option>
                                                <option value="Suzuki">Suzuki</option>
                                                <option value="Isuzu">Isuzu</option>
                                                <option value="Audi">Audi</option>
                                                <option value="BMW">BMW</option>
                                                <option value="Nissan">Nissan</option>
                                            </select>
                                            <label for="brand">Nhãn hiệu</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="modelCode" placeholder="Số loại" required/>
                                            <label for="modelCode">Số loại</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" id="type" aria-label="" required>
                                                <option value="Ô tô con">Ô tô con</option>
                                                <option value="Xe khách">Xe khách</option>
                                                <option value="Xe bán tải">Xe bán tải</option>
                                                <option value="Xe tải">Xe tải</option>
                                                <option value="Xe chuyên dùng">Xe chuyên dùng</option>
                                            </select>
                                            <label for="type">Loại xe</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input type="number" className="form-control" id="cylinderCapacity" placeholder="Dung tích xi lanh" required/>
                                                    <label for="cylinderCapacity">Dung tích xi lanh</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input type="number" className="form-control" id="fuelCapacity" placeholder="Dung tích xăng" required/>
                                                    <label for="fuelCapacity">Dung tích xăng (Diesel)</label>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="color" aria-label="" required>
                                        <option value="Xám">Xám</option>
                                        <option value="Đen">Đen</option>
                                        <option value="Đỏ">Đỏ</option>
                                        <option value="Vàng">Vàng</option>
                                        <option value="Trắng">Trắng</option>
                                    </select>
                                    <label for="color">Màu xe</label>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-3 d-flex align-items-center justify-content-center">
                                                <p>Tải trọng:</p>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-floating mb-3">
                                                    <input type="number" className="form-control" id="cargo" placeholder="Hàng hóa (kg)"/>
                                                    <label for="cargo">Hàng hóa (kg)</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-4 d-flex align-items-center justify-content-center">
                                                <p>Số chỗ ngồi:</p>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-floating mb-3">
                                                    <input type="number" className="form-control" id="sit" placeholder="Đứng"/>
                                                    <label for="sit">Đứng</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-floating mb-3">
                                                    <input type="number" className="form-control" id="lie" placeholder="Nằm"/>
                                                    <label for="lie">Nằm</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="date" className="form-control" id="dateOfExpire" placeholder="Đăng ký xe có giá trị đến ngày"/>
                                            <label for="dateOfExpire">Đăng ký xe có giá trị đến ngày</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="date" className="form-control" id="dateOfFirstRegistration" placeholder="Đăng ký lần đầu ngày" required/>
                                            <label for="dateOfFirstRegistration">Đăng ký lần đầu ngày</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="plateNumber" placeholder="Biển số đăng ký" required/>
                                            <label for="plateNumber">Biển số đăng ký</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="number" className="form-control" id="traveled" placeholder="Đã đi được (km)" required/>
                                            <label for="traveled">Đã đi được (km)</label>
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
            <div className="modal fade" id="updateVehicleModal" tabindex="-1" aria-labelledby="updateUserModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateUserModalLabel">Chỉnh sửa thông tin xe</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form onSubmit={handleUpdateVehicle}>
                                <div className="mb-3">
                                    <Divider textAlign="left">Thông tin xe (Bắt buộc)</Divider>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="ownerName" placeholder="Tên chủ xe" required onChange={(e) => setObjData({...objData, ownerName: e.target.value})} value={objData.ownerName} />
                                            <label for="ownerName">Tên chủ xe</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="engineId" placeholder="Số máy" required onChange={(e) => setObjData({...objData, engineId: e.target.value})} value={objData.engineId} />
                                            <label for="engineId">Số máy</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="address" placeholder="Địa chỉ" required onChange={(e) => setObjData({...objData, address: e.target.value})} value={objData.address} />
                                            <label for="address">Địa chỉ</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="chassisId" placeholder="Số khung" required onChange={(e) => setObjData({...objData, chassisId: e.target.value})} value={objData.chassisId} />
                                            <label for="chassisId">Số khung</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" id="brand" aria-label="" required onChange={(e) => setObjData({...objData, brand: e.target.value})} value={objData.brand}>
                                                <option value="Mercedes-Benz">Mercedes-Benz</option>
                                                <option value="Toyota">Toyota</option>
                                                <option value="Honda">Honda</option>
                                                <option value="Hyundai">Hyundai</option>
                                                <option value="Ford">Ford</option>
                                                <option value="Suzuki">Suzuki</option>
                                                <option value="Isuzu">Isuzu</option>
                                                <option value="Audi">Audi</option>
                                                <option value="BMW">BMW</option>
                                                <option value="Nissan">Nissan</option>
                                            </select>
                                            <label for="brand">Nhãn hiệu</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="modelCode" placeholder="Số loại" required onChange={(e) => setObjData({...objData, modelCode: e.target.value})} value={objData.modelCode}/>
                                            <label for="modelCode">Số loại</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" id="type" aria-label="" required onChange={(e) => setObjData({...objData, type: e.target.value})} value={objData.type}>
                                                <option value="Ô tô con">Ô tô con</option>
                                                <option value="Xe khách">Xe khách</option>
                                                <option value="Xe bán tải">Xe bán tải</option>
                                                <option value="Xe tải">Xe tải</option>
                                                <option value="Xe chuyên dùng">Xe chuyên dùng</option>
                                            </select>
                                            <label for="type">Loại xe</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input type="number" className="form-control" id="cylinderCapacity" placeholder="Dung tích xi lanh" required onChange={(e) => setObjData({...objData, cylinderCapacity: e.target.value})} value={objData.cylinderCapacity}/>
                                                    <label for="cylinderCapacity">Dung tích xi lanh</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input type="number" className="form-control" id="fuelCapacity" placeholder="Dung tích xăng" required onChange={(e) => setObjData({...objData, fuelCapacity: e.target.value})} value={objData.fuelCapacity}/>
                                                    <label for="fuelCapacity">Dung tích xăng (Diesel)</label>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="color" aria-label="" required onChange={(e) => setObjData({...objData, color: e.target.value})} value={objData.color}>
                                        <option value="Xám">Xám</option>
                                        <option value="Đen">Đen</option>
                                        <option value="Đỏ">Đỏ</option>
                                        <option value="Vàng">Vàng</option>
                                        <option value="Trắng">Trắng</option>
                                    </select>
                                    <label for="color">Màu xe</label>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-3 d-flex align-items-center justify-content-center">
                                                <p>Tải trọng:</p>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-floating mb-3">
                                                    <input type="number" className="form-control" id="cargo" placeholder="Hàng hóa (kg)" onChange={(e) => setObjData({...objData, cargo: e.target.value})} value={objData.cargo}/>
                                                    <label for="cargo">Hàng hóa (kg)</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-4 d-flex align-items-center justify-content-center">
                                                <p>Số chỗ ngồi:</p>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-floating mb-3">
                                                    <input type="number" className="form-control" id="sit" placeholder="Đứng" onChange={(e) => setObjData({...objData, sit: e.target.value})} value={objData.sit}/>
                                                    <label for="sit">Đứng</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-floating mb-3">
                                                    <input type="number" className="form-control" id="lie" placeholder="Nằm" onChange={(e) => setObjData({...objData, lie: e.target.value})} value={objData.lie}/>
                                                    <label for="lie">Nằm</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="date" className="form-control" id="dateOfExpire" placeholder="Đăng ký xe có giá trị đến ngày" onChange={(e) => setObjData({...objData, dateOfExpire: e.target.value})} value={objData.dateOfExpire}/>
                                            <label for="dateOfExpire">Đăng ký xe có giá trị đến ngày</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="date" className="form-control" id="dateOfFirstRegistration" placeholder="Đăng ký lần đầu ngày" required onChange={(e) => setObjData({...objData, dateOfFirstRegistration: e.target.value})} value={objData.dateOfFirstRegistration}/>
                                            <label for="dateOfFirstRegistration">Đăng ký lần đầu ngày</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="plateNumber" placeholder="Biển số đăng ký" required onChange={(e) => setObjData({...objData, plateNumber: e.target.value})} value={objData.plateNumber}/>
                                            <label for="plateNumber">Biển số đăng ký</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3">
                                            <input type="number" className="form-control" id="traveled" placeholder="Đã đi được (km)" required onChange={(e) => setObjData({...objData, traveled: e.target.value})} value={objData.traveled}/>
                                            <label for="traveled">Đã đi được (km)</label>
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
            {(objData === undefined)?null:
            <>
            <div className="modal fade" id="assignmentModal" tabindex="-1" aria-labelledby="assignmentModalLable" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="assignmentModalLable">Phân công xe</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleAssignmentVehicle}>
                                <div className="form-floating mb-3">
                                    <input type="search" className="form-control" id="assignment" placeholder="Phân công cho" onChange={(e) => setObjData({...objData, assignment: e.target.value})} value={objData.assignment}/>
                                    <label for="assignment">Phân công cho</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="assignmentType" aria-label="" required onChange={(e) => setObjData({...objData, assignmentType: e.target.value})} value={objData.assignmentType}>
                                        <option value="Chở Ban Điều Hành">Chở Ban Điều Hành</option>
                                        <option value="Công tác">Công tác</option>
                                    </select>
                                    <label for="assignmentType">Loại hình</label>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-secondary me-2 w-100" data-bs-dismiss="modal">Hủy</button>
                                    <button type="submit" className="btn btn-primary w-100">Đồng ý</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="delAssignmentModal" tabindex="-1" aria-labelledby="deleteAssignmentModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteAssignmentModal">Xác nhận</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h2 className="mb-4">Bạn thực sự muốn hủy phân công ?</h2>
                            <div className="d-flex justify-content-center">
                                <button type="button" className="btn btn-secondary me-2 w-100" data-bs-dismiss="modal">Hủy</button>
                                <button type="button" className="btn btn-primary w-100" onClick={handleDelAssignment}>Bỏ phân công</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>}
        </>
    );    
}
export default Maintenance;