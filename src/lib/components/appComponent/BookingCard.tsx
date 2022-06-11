import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, Box, TableCell, Grid, Card, IconButton, Typography, CardHeader, Paper } from "@material-ui/core";
import moment from 'moment';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { ArrowLeftOutlined, ArrowRightOutlined, Edit } from "@material-ui/icons";
import './bookingCard.css';

interface BookingParam {
    consigneeName?: string,
    bookingNumber?: string,
    deliveryOrderValidity?: string,
    containerCount?: string,
    bookedOn?: string,
    onBookingClick?(value:string):string,
}


const useStyles = makeStyles(() => ({

    root: {
        flexGrow: 1,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        padding: 5,
        marginBottom: 5,
    },
}));

const BookingCard: React.FC<BookingParam> = (BookingParam) => {
    const classes = useStyles();
    return (
        <Paper variant="outlined" className={classes.pos} >
            <Grid item xs={12} sm spacing={0} container  >
                <Grid item xs={12} sm={2} md={2} >
                    <Typography variant="body2">{BookingParam?.bookingNumber}</Typography>
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                    <Typography variant="body2">{moment(BookingParam?.bookedOn).format("DD-MM-YYYY hh:mm")}</Typography>
                </Grid>
                <Grid item xs={12} sm={2} md={2} >
                    <Typography variant="body2">{BookingParam?.consigneeName}</Typography>
                </Grid>
                <Grid item xs={12} sm={3} md={3} >
                    <Typography variant="body2">{BookingParam?.deliveryOrderValidity!==null?moment(BookingParam?.deliveryOrderValidity).format("DD-MM-YYYY"):""}</Typography>
                </Grid>
                <Grid item xs={12} sm={1} md={1} >
                    <Typography align="center" variant="body2">{BookingParam?.containerCount}</Typography>
                </Grid>
                <Grid item xs={12} sm={1} md={1} >
                    <Box className="booking-boxOnCard" component="button" onClick={()=>BookingParam.onBookingClick(BookingParam.bookingNumber)} style={{ cursor: 'pointer' }} >
                            <ArrowRightOutlined />
                    </Box>
                </Grid>
            </Grid>
        </Paper>

    )

}

export default BookingCard;