import React from 'react';
import { GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid';

function CustomToolbar() {
    return (
    <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarExport />
    </GridToolbarContainer>
    );
}

export default CustomToolbar;