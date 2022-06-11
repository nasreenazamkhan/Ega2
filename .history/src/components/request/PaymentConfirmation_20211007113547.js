import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import CommonService from "../../service/CommonService";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { Dialog,DialogContent,DialogTitle} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";

import { withStyles } from "@material-ui/core/styles";

import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    marginTop: theme.spacing(5),

  }
}));

 function PaymentConfirmation(props) {

  const classes = useStyles();
  const referenceNumber = props.referenceNumber;
  const success =props.success;
  const handleClose = () => {
    props.onClose();
  };


  let history = useHistory();

  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(0.5),
      color: theme.palette.grey[500],
    },
  });
  
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle style={{background:'#FFFFFF'}} >
    <Typography style={{fontFamily:'Dubai Light', color:'#FFFFFF' ,fontWeight:600}}>{children}</Typography>
    <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
        <CloseIcon style={{fill:'#000000'}} />
      </IconButton>
  </MuiDialogTitle>
 
  )
})


 
  return (
    <>
      <Dialog 
        fullWidth={true}
      
        maxWidth={'md'}
     
       
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <DialogTitle 
          id="customized-dialog-title"
          onClose={handleClose}
        ></DialogTitle>
      
          <DialogContent>
      {
       
       success === 'Y' &&

        <div className={classes.root}>

          <img src="./success.svg"></img>
          <h1>Success</h1>
          <p > Your payment has been made</p>
          <Typography variant="body2" component="h4" >An Email Confirmation will be sent to you shortly for the miscellaneous payment done on booking number # {referenceNumber}</Typography>
              <p><Link onClick={() => {
                CommonService.downloadInvoiceReceipt(referenceNumber);
              }}>Download Receipt</Link></p>

          <p><Link onClick={() => {
             history.push("/status")
               
              }}>Go back to Status</Link></p>  
              
         

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
      
         
        </DialogContent>
       
      </Dialog>
 
    </>
  );

}

export default PaymentConfirmation;