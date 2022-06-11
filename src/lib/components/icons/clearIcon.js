import React from 'react'
import { ClearOutlined } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    icon: {
        fontSize: "18px",
        fill:'#0E1B3D' ,
        '&:hover': {
            cursor: 'pointer'
        }
    }

}));

function ClearIcon(props) {
    const classes = useStyles();

    return (
        <>
            <ClearOutlined className={classes.icon} onClick={props.onClick} />
        </>
    )
}

export default React.memo(ClearIcon);
