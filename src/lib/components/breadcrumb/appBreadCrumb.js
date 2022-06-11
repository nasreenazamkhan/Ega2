import React from 'react';
import { Paper, Breadcrumbs, Link } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import './breadcrumb.css';

function AppBreadCrumb() {
    const bc = useSelector(state => state.breadcrumb);
    const dispatch = useDispatch();

    return (
        <Paper>
            <Breadcrumbs aria-label="breadcrumb" className="breadCrumb">
                {
                    bc.crumbs.map((crumb, i) => {
                        return <Link color="inherit" key={i}
                            to={crumb.url}
                            className={` ${crumb.active ? "activeCrumb" : ""}`}>
                            {crumb.label}</Link>
                    })
                }
            </Breadcrumbs>
        </Paper>
    )
}

export default React.memo(AppBreadCrumb);



