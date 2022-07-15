import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
  
function QuickSearch(props){
    return (
        <Box sx={{p: 0.5, pb: 0}}>
        <TextField
            variant="standard"
            value={props.value}
            onChange={props.onChange}
            placeholder="Tìm..."
            InputProps={{
                startAdornment: <SearchIcon fontSize="small" />,
                endAdornment: (
                    <IconButton
                    title="Clear"
                    aria-label="Clear"
                    size="small"
                    style={{ visibility: props.value ? 'visible' : 'hidden' }}
                    onClick={props.clearSearch}
                    >
                    <ClearIcon fontSize="small" />
                    </IconButton>
                ),
            }}
            sx={{
                width: {
                    xs: 1,
                    sm: 'auto',
                },
                m: (theme) => theme.spacing(1, 0.5, 1.5),
                '& .MuiSvgIcon-root': {
                    mr: 0.5,
                },
                '& .MuiInput-underline:before': {
                    borderBottom: 1,
                    borderColor: 'divider',
                },
            }}
        />
        </Box>
    );
}

QuickSearch.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default QuickSearch;