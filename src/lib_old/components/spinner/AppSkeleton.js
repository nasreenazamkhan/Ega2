import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Container, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    outer: {
        padding: "40px"
    },
    level1: {
        width: "30%"
    },
    level2: {
        marginTop: "20px", marginBottom: "20px"
    },
    level3: {

    }
}));

function AppSkeleton() {
    const classes = useStyles();

    return (
        <div>
            <Container className={classes.outer}>
                <Skeleton variant="text" width="30%" />
                <Skeleton variant="rect" className={classes.level2} animation="pulse" width="100%" height="100px" />
                <Skeleton variant="rect" animation="wave" width="100%" height="400px" />
            </Container>
        </div>
    )
}

export default React.memo(AppSkeleton);
