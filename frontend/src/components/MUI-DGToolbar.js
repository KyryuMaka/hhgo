import React from 'react';
import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import QuickSearch from './MUI-QuickSearch'

function QuickSearchToolbar(props){
    return(
        <div className="d-flex align-items-center">
            <div className="ps-2 me-auto">
                <QuickSearch value={props.value} onChange={props.onChange} clearSearch={props.clearSearch}/>
            </div>
            <div className="pe-2">
                <GridToolbarExport />
                <Button data-bs-toggle="modal" data-bs-target={props.idAddModal} id="addButton">Thêm</Button>
                <Button data-bs-toggle="modal" data-bs-target={props.idUpdateModal} id="updateButton" disabled>Sửa</Button>
                <Button data-bs-toggle="modal" data-bs-target={props.idDeleteModal} id="deleteButton" disabled>Xóa</Button>
            </div>
        </div>
    );
}

function VehicleToolbar(props){
    return(
        <div className="d-flex align-items-center">
            <div className="ps-2 me-auto">
                <QuickSearch value={props.value} onChange={props.onChange} clearSearch={props.clearSearch}/>
            </div>
            <div className="pe-2">
                <GridToolbarExport />
                <Button data-bs-toggle="modal" data-bs-target={props.idAddModal} id="addButton">Thêm</Button>
                <Button data-bs-toggle="modal" data-bs-target={props.idUpdateModal} id="updateButton" disabled>Sửa</Button>
                <Button data-bs-toggle="modal" data-bs-target={props.idDeleteModal} id="deleteButton" disabled>Xóa</Button>
                <Button data-bs-toggle="modal" data-bs-target={props.idAssignmentModal} id="assignmentButton" disabled>Phân công</Button>
                <Button data-bs-toggle="modal" data-bs-target={props.idDelAssignmentModal} id="delAssignmentButton" disabled>Hủy phân công</Button>
            </div>
        </div>
    );
}

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

export default CustomToolbar;
export {QuickSearchToolbar, VehicleToolbar};