import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import MuiTableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, TableHead, Typography } from "@material-ui/core";

import Table from "@material-ui/core/Table";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "red"
  },
});

const useStyles = makeStyles({
  splitScreen: {
    display: "flex",
    flexDirection: "row",
  }, table: {
    width: "600px",
    marginLeft:'22px'
  },

  label: {
    fontSize: "15px",
    color: "#636363",
    fontWeight:600,
    whiteSpace: 'nowrap'
  },

  labelData: {
    fontSize: "15px",
    color: "#000000",
    fontWeight:600,
    whiteSpace: 'nowrap'
  },
});

const TableCell = withStyles({
  root: {
    borderBottom: "none",
    width: 100,
    padding:'6px'
  },
})(MuiTableCell);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <div style={{paddingLeft:'30px', paddingBottom:'10px'}}>
      <Typography style={{fontFamily: "Dubai Regular", fontWeight:600}}>
        Payment Breakups
      </Typography>
      <hr style={{ borderTop: '4px solid #FF3E3E', width: '10%', margin: 0 }} />
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onClose}
      >
        <CloseIcon style={{fill:'#0E1B3D'}}/>
      </IconButton>
    </div>
  )
});

const DialogContent = withStyles(() => ({
  root: {
    textAlign: 'left',
    padding:0,
    paddingLeft:'5px',
    paddingTop:'15px'
  }
}))(MuiDialogContent);



export default function PaymentBreakupPopUp(props) {
  console.log("in payment breakup ::", props);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);



  const handleClose = () => {
    props.onClose();
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          style:{boxshadow: '4px 4px 7px #0000002B', border: '1px solid #E8E8E8', borderRadius:0, padding:'20px', maxWidth: '680px'}
        }} 
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></DialogTitle>
        <DialogContent>
          <Table className={classes.table}>
            <TableHead>
              <TableCell style={{ width: 30 }}>
                <InputLabel className={classes.label}>
                  Containers
                </InputLabel>
              </TableCell>
              <TableCell style={{ width: 30 }}>
                <InputLabel className={classes.label}>Amount</InputLabel>
              </TableCell>
              <TableCell style={{ width: 30 }}>
                <InputLabel className={classes.label}>VAT%</InputLabel>
              </TableCell>
              <TableCell style={{ width: 30 }}>
                <InputLabel className={classes.label}>VAT Amount</InputLabel>
              </TableCell>
              <TableCell style={{ width: 30 }}>
                <InputLabel className={classes.label}>Total</InputLabel>
              </TableCell>
            </TableHead>
            <TableBody>
              {props.paymentDetails.paymentDetails.filter(x => x.paymentType !== 'tokenIn' && x.paymentType !== 'tokenOut').map((paymentInfo, ind) => (
                <TableRow>
                  <TableCell>
                    <InputLabel className={classes.labelData}>
                      {paymentInfo.chargeDescription}
                    </InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel className={classes.labelData}>
                      {paymentInfo.subTotalAmount} AED
                    </InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel className={classes.labelData}>
                      {paymentInfo.vat}%
                    </InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel className={classes.labelData}>
                      {paymentInfo.totalVat} AED
                    </InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel className={classes.labelData}>
                      {paymentInfo.totalAmount} AED
                    </InputLabel>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <hr style={{margin:'6px 30px 6px 30px'}}/>
          <Table className={classes.table} style={{marginBottom:'25px'}}>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5}>
                  <InputLabel style={{
                    fontSize: "16px",
                    color: "#000000",
                    fontWeight:600,
                    whiteSpace: 'nowrap',
                    textAlign:'end',
                    paddingRight:'25px'
                  }}>
                    Net Amount
                  </InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{
                    fontSize: "16px",
                    color: "#000000",
                    whiteSpace: 'nowrap',
                    fontWeight:600,
                    paddingRight:'30px'
                  }}>
                    {props.paymentDetails.totalContainerTariff} AED
                  </InputLabel>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table className={classes.table}>
            <TableHead>
              <TableCell style={{ width: 30 }}>
                <InputLabel className={classes.label}>
                  Token Re-Charges
                </InputLabel>
              </TableCell>
              <TableCell style={{ width: 30 }}>
                <InputLabel className={classes.label}>Amount</InputLabel>
              </TableCell>
              <TableCell style={{ width: 30 }}>
                <InputLabel className={classes.label}>VAT%</InputLabel>
              </TableCell>
              <TableCell style={{ width: 30 }}>
                <InputLabel className={classes.label}>VAT Amount</InputLabel>
              </TableCell>
              <TableCell style={{ width: 30 }}>
                <InputLabel className={classes.label}>Total</InputLabel>
              </TableCell>
            </TableHead>
            {props.paymentDetails.paymentDetails.filter(x => x.paymentType === 'tokenIn' || x.paymentType === 'tokenOut').map((tokenDetails, ind) => (
              <TableBody>
                <TableRow>
                  <TableCell>
                    <InputLabel className={classes.labelData}>
                      {tokenDetails.chargeDescription}
                    </InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel className={classes.labelData}>
                      {tokenDetails.totalAmount} AED
                    </InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel className={classes.labelData}>
                      {tokenDetails.vat}%
                    </InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel className={classes.labelData}>
                      {tokenDetails.totalVat} AED
                    </InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel className={classes.labelData}>
                      {tokenDetails.subTotalAmount} AED
                    </InputLabel>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}

          </Table>
          <hr style={{margin:'6px 30px 6px 30px'}}/>
          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5}>
                  <InputLabel style={{
                    fontSize: "16px",
                    color: "#000000",
                    fontWeight:600,
                    whiteSpace: 'nowrap',
                    textAlign:'end',
                    paddingRight:'25px'
                  }}>
                    Net Amount
                  </InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{
                    fontSize: "16px",
                    color: "#000000",
                    fontWeight:600,
                    whiteSpace: 'nowrap',
                    paddingRight:'30px'
                  }}>
                    {props.paymentDetails.totalTokenTariff} AED
                  </InputLabel>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <hr style={{margin:'6px 30px 6px 30px'}}/>
          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5}>
                  <InputLabel style={{
                    fontSize: "16px",
                    color: "#000000",
                    fontWeight:600,
                    whiteSpace: 'nowrap',
                    textAlign:'end',
                    paddingRight:'22px'
                  }}>
                    Gross Amount
                  </InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{
                    fontSize: "16px",
                    color: "#000000",
                    fontWeight:600,
                    whiteSpace: 'nowrap',
                    paddingRight:'22px'
                  }}>
                    {props.paymentDetails.grossAmount} AED
                  </InputLabel>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
}