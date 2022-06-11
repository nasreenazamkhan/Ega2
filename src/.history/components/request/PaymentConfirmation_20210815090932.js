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
 function PaymentConfirmation(props) {


  const classes = useStyles();
  const referenceNumber = props.referenceNumber;
  const success = props.success;


  let history = useHistory();

 
  return (
    <>
      {
        success === 'Y' &&

        <div className={classes.root}>

          <img src="./success.svg"></img>
          <h1>Success</h1>
          <p > Your payment has been made</p>
          <Typography variant="body2" component="h4" >An Email Confirmation will be sent to you shortly for the miscellaneous payment done on booking number # {referenceNumber}</Typography>
              <p><Link onClick={() => {
                CommonService.downloadReceipt(referenceNumber);
              }}>Download Receipt</Link></p>
              
         

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
        



        </div>


      }
    </>
  );

}

export default PaymentConfirmation;