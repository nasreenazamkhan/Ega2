import React from 'react';
import { CircularProgress, Backdrop, LinearProgress, makeStyles } from '@material-ui/core';
import { showSpinner, hideSpinner } from '../../redux/spinner/spinActions';
import { connect } from 'react-redux';


const useStyles = makeStyles(theme => ({
    spinner: {
        zIndex: "1000",
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "100%"
    },
    linearSpinner: {
        zIndex: "1500",
    }
}));


function Spinner({ loading }) {
    const classes = useStyles();

    return (
        <> {loading && loading === true &&
            <div className={classes.spinner}>
                <LinearProgress className={classes.linearSpinner} />
                <Backdrop open={true} style={{ zIndex: 1000 }}>
                    {/* <CircularProgress /> */}
                </Backdrop>
            </div>}
        </>
    )
}



const mapStateToProps = state => {
    return {
        loading: state.spinner.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showSpinner: () => dispatch(showSpinner()),
        hideSpinner: () => dispatch(hideSpinner())
    }

}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(React.memo(Spinner));


