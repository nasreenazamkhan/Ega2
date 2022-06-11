import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import CommonService from "../../service/CommonService";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import BookingService from "../../service/BookingService";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    marginTop: theme.spacing(5),

  }
}));
export default function Confirmation(props) {


  const classes = useStyles();
  const referenceNumber = props.referenceNumber;
  const success = props.success;


  let history = useHistory();

  useEffect(() => {
    console.log("referenceNumber ::", referenceNumber);
  }, []
  );
  return (
    <>
      {
        success === 'Y' &&

        <div className={classes.root}>

          <img src="./success.svg"></img>
          <h1>Success</h1>
          <p > Your payment has been made</p>
          <Typography variant="body2" component="h4" >{`An Email Confirmation will be sent to shortly with booking details`}</Typography>

          <Typography variant="body3" component="h5" >Booking number#{`${referenceNumber}`}</Typography>
          <p>Check your status by going to <Link textColor="green" onClick={() => {
            history.push("/viewRequest");
          }}> My Booking </Link> page </p>
          <p><Link onClick={() => {
            CommonService.downloadReceipt(referenceNumber);
          }}>Download Receipt</Link></p>
<p><Link onClick={() => {
            CommonService.downloadInvoice(referenceNumber);
          }}>Tax Invoice</Link></p>


        </div>
      }
      {



        success === 'N' &&

        <div className={classes.root}>

          <img src="./failure.svg" ></img>
          <h1 style={{ color: "#EA2428" }}>Sorry,payment failed</h1>

          <Typography variant="body2" component="h4" >{`Unfortunately, we encounter an error while processing your payment for the booking `}</Typography>

          <Typography variant="body2" component="h4" >{`Please check your payment details and try again`}</Typography>
          <br></br>
          <Button color="secondary" variant="contained" onClick={() => {
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
          }}> Try Again</Button>



        </div>


      }
    </>
  );

}