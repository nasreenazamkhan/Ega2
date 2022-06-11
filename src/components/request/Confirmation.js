import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import CommonService from "../../service/CommonService";
import { useHistory } from "react-router-dom";
import BookingService from "../../service/BookingService";
import { Breadcrumbs, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    marginTop: theme.spacing(5),
  },
  separator: {
    color: '#EA2428'
  },
  breadCrumRoot: {
    fontFamily: 'Dubai Light',
    fontWeight: 600,
    fontSize: '17px'
  },
  link: {
    color: '#EA2428',
    textDecoration: 'underline',
    fontFamily: 'Dubai Light',
    fontWeight: 600,
    paddingLeft: '10px',
    fontSize: '18px'
  },
  text: {
    fontFamily: 'Dubai Light',
    fontWeight: 600,
    paddingTop: '20px',
    paddingBottom: '10px'
  }
}));
export default function Confirmation(props) {
  const classes = useStyles();
  const [referenceNumber, setReferenceNumber] = useState(props.referenceNumber);
  const [success, setSuccess] = useState(props.success);
  let history = useHistory();

  useEffect(() => {
    console.log("referenceNumber ::", referenceNumber);
    if (!props.myBooking) {
      const query = new URLSearchParams(props.location.search);
      setSuccess(query.get('success'));
      setReferenceNumber(props.match.params.referenceNumber);
    }
  }, []);

  return (
    <>
      {!props.myBooking && <Grid container>
        <Grid item xs={12} style={{ marginBottom: 0, marginTop: '20px' }}>
          <Breadcrumbs aria-label="breadcrumb" classes={{
            root: classes.breadCrumRoot,
            separator: classes.separator,
          }}>
            <Link href="#" onClick={() => history.push("/status")} style={{ color: '#848484' }}>
              Status
            </Link>
            <span style={{ color: '#0E1B3D' }}>
              {referenceNumber}
            </span>
          </Breadcrumbs>
        </Grid>
      </Grid>}
      {success === 'Y' &&
        <div className={classes.root}>
          <img src={props.myBooking ? "./successful_tick.svg" : "../successful_tick.svg"}></img>
          <h1 style={{ color: "#609E2E" }} className={classes.text}>Your Payment is Successful</h1>
          <Typography style={{ color: '#606060' }} >{`An Email Confirmation will be sent to shortly with booking details`}</Typography>
          <Typography style={{ color: '#606060' }} >Booking number#{`${referenceNumber}`}</Typography>
          <Typography style={{ color: '#606060', paddingTop: '6px' }}>Check your status by going to
            <Link className={classes.link} style={{ color: '#0568AE', padding: '0 5px 0 5px' , fontSize:'16px'}} onClick={() => {
              history.push("/status");
            }}>
              My Booking
            </Link>
            page
          </Typography>
          <Grid container>
          <Grid item xs={12} alignContent="center" justify="center" style={{paddingTop:'30px', display: 'inline-flex', alignItems: 'center', textAlign:'center'}}>
            <img src={props.myBooking ? "./receipt.svg" : "../receipt.svg"} height="32px"/>
            <Link className={classes.link} style={{ color: '#0568AE'}} onClick={() => {
              CommonService.downloadReceipt(referenceNumber);
            }}>
              Download Receipt
            </Link>
          </Grid>
          <Grid item xs={12} alignContent="center" justify="center" style={{paddingTop:'20px', display: 'inline-flex', alignItems: 'center'}}>
            <img src={props.myBooking ? "./receipt.svg" : "../receipt.svg"} height="32px"/>
            <Link className={classes.link} style={{ color: '#0568AE'}} onClick={() => {
              CommonService.downloadInvoice(referenceNumber);
            }}>
              Tax Invoice
            </Link>
          </Grid>
          </Grid>
        </div>
      }
      {success === 'N' &&
        <div className={classes.root}>
          <img src={props.myBooking ? "./failed_payment.svg" : "../failed_payment.svg"} ></img>
          <h2 style={{ color: "#FF4F5A" }} className={classes.text}>OOPS... Payment Failed</h2>
          <Typography style={{ color: '#606060' }}>{`Unfortunately, we encounter an error while processing your payment for the booking.`}</Typography>
          {/* <Typography style={{ color: '#606060' }}>{`Any amount deducted from your account will be refund in 3 to 5 business days`}</Typography> */}
          <Typography style={{ color: '#606060', paddingBottom: '25px' }}>{`Please check your payment details and try again.`}</Typography>
          <br></br>
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <img src={props.myBooking ? "./refreshing.svg" : "../refreshing.svg"} height="20px" />
            <Link className={classes.link} onClick={() => {
              BookingService.reInitialise(referenceNumber)
                .then((res) => {
                  console.log("response");
                  const dataVal = {
                    serviceOwnerID: res.data.dataItems[0].serviceOwnerID,
                    serviceID: res.data.dataItems[0].serviceID,
                    serviceChannel: res.data.dataItems[0].serviceChannel,
                    licenseKey: res.data.dataItems[0].licenseKey,
                    customerReferenceNumber:
                      res.data.dataItems[0].customerReferenceNumber,
                    serviceDescription:
                      res.data.dataItems[0].serviceDescription,
                    responseURL: res.data.dataItems[0].responseURL,
                    serviceCost: res.data.dataItems[0].serviceCost,
                    soTransactionID: res.data.dataItems[0].soTransactionID,
                    documentationCharges:
                      res.data.dataItems[0].documentationCharges,
                    signature: res.data.dataItems[0].signature,
                    popup: res.data.dataItems[0].popup,
                    buEncryptionMode:
                      res.data.dataItems[0].buEncryptionMode,
                  };
                  console.log("dataVal", dataVal);
                  CommonService.postToExternalSite(
                    dataVal,
                    res.data.dataItems[0].gatewayUrl
                  );
                })
                .catch((error) => {
                  console.log("error");
                });
            }}>
              Try Again
            </Link>
          </div>
        </div>
      }
    </>
  );

}