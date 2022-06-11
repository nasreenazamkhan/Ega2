import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import CommonService from "../../service/CommonService";
import { useHistory } from "react-router-dom";
import { Dialog, DialogContent, Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    marginTop: theme.spacing(5),
    fontFamily: 'Dubai Light',
    fontWeight: 600
  },
  text: {
    fontFamily: 'Dubai Light',
    fontWeight: 600,
    paddingTop: '20px',
    paddingBottom: '10px'
  },
  link: {
    color: '#0568AE', 
    textDecoration: 'underline',
    fontFamily: 'Dubai Light',
    fontWeight: 600,
    paddingLeft: '10px',
    fontSize: '18px'
  },
}));

function PaymentConfirmation(props) {
  const classes = useStyles();
  const referenceNumber = props.bookingNumber;
  const success = props.success;
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
    const { children, classes, onClose } = props;
    return (
      <MuiDialogTitle style={{ background: '#FFFFFF' }} >
        <Typography style={{ fontFamily: 'Dubai Light', color: '#FFFFFF', fontWeight: 600 }}>{children}</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon style={{ fill: '#000000' }} />
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
        PaperProps={{
          style: { borderRadius: '0px', width: '800px', height: '553px' }
        }}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></DialogTitle>
        <DialogContent>
          {success === 'Y' &&
            <div className={classes.root}>
              <img src="./successful_tick.svg"></img>
              <h1 style={{ color: "#609E2E" }} className={classes.text}>Your Payment is Successful</h1>
              <Typography style={{ color: '#606060' }}>{`An Email Confirmation will be sent to you shortly for the miscellaneous payment done on booking number # ${referenceNumber}`}</Typography>
              <Grid container>
                <Grid item xs={12} alignContent="center" justify="center" style={{ paddingTop: '30px', display: 'inline-flex', alignItems: 'center', textAlign: 'center' }}>
                  <img src="./receipt.svg" height="32px" />
                  <Link className={classes.link} onClick={() => {
                    CommonService.downloadInvoiceReceipt(props.referenceNumber);
                  }}>
                    Download Receipt
                  </Link>
                </Grid>
              </Grid>
              <p><Link className={classes.link} onClick={() => { history.push("/status") }}>Go back to Status</Link></p>
            </div>}
          {success === 'N' &&
            <div className={classes.root}>
              <img src="./failed_payment.svg" ></img>
              <h1 style={{ color: "#FF4F5A" }} className={classes.text}>OOPS... Payment Failed</h1>
              <Typography style={{ color: '#606060' }}>{`Unfortunately, we encounter an error while processing your payment for the booking `}</Typography>
              <Typography style={{ color: '#606060' }} >{`Please check your payment details and try again`}</Typography>
              <br></br>
              <p><Link className={classes.link} onClick={() => { history.push("/status") }}>Go back to Status</Link></p>
            </div>
          }
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PaymentConfirmation;