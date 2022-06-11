import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiTableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import { DialogActions, Typography, Button, Grid } from "@material-ui/core";

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
  },
  label: {
    fontSize: "16px",
    color: "#000000",
    fontFamily: "Dubai Medium",
    whiteSpace: 'nowrap'
  },
  labelData: {
    fontSize: "16px",
    color: "#000000",
    fontFamily: "Dubai Regular",
    whiteSpace: 'nowrap'
  },
  errorTextInput:{
    boxShadow: '#ff0101 0px 0px 8px',
    borderRadius:'4px',
    borderColor: '#ff0101',
  },
  mainTextInput:{
    boxShadow: '0px 0px 5px #00000029',
    border: '1.5px solid #168FE4BC'
  },
});

const CssTextField = withStyles({
  root: {
    '& .MuiInputLabel-root': {
      color: '#383838',
      fontWeight: 600,
      fontFamily: 'Dubai Light',
      top: '-10px',
      fontSize: '14px'
    },
    '& .MuiOutlinedInput-input': {
      padding: '8px 0 8px 0',
      fontSize: '14px',
      fontWeight: 600,
      fontFamily: 'Dubai Light',
    },
    '& .MuiOutlinedInput-multiline':{
      padding: '0px 14px'
    },
    '& label.Mui-focused': {
      color: '#383838',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#168FE4BC',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#168FE4BC',
        boxShadow: '0px 0px 5px #00000029',
        borderWidth: '1.5px'
      },
      '&:hover fieldset': {
        borderColor: '#168FE4BC',
        boxShadow: '0px 0px 5px #00000029',
        borderWidth: '1.5px'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#168FE4BC',
        boxShadow: '0px 0px 5px #00000029',
        borderWidth: '1.5px'
      },
    },
  },
})(TextField);

const TableCell = withStyles({
  root: {
    borderBottom: "none",
    width: 185,
  },
})(MuiTableCell);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <>
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onClose}
      >
        <CloseIcon style={{fill:'#0E1B3D'}}/>
      </IconButton>
    </>
  )
});

const DialogContent = withStyles(() => ({
  root: {
    textAlign: 'center'
  }
}))(MuiDialogContent);

export default function DeleteContainerPopUp(props) {
  console.log("in delete container pop up ::", props);
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [disable, setDisable] = useState(true);
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState('');
  const [lengthMsg, setMaxLengthMsg] = useState('');

  const handleClose = () => {
    props.onClose();
    setOpen(false);
  };

  const handleConfirm = () => {
    if(remarks == '')
      setError('Remarks are Mandatory')
    else {
      if(error == ''){
      props.onConfirm(remarks);
      props.refresh();
    }}
  }

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          style: { boxshadow: '0px 3px 6px #00000029', borderRadius: '3px', padding: '20px', minWidth: '400px', minHeight: '350px' }
        }}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></DialogTitle>
        <DialogContent>
          <img src="./delete_container.svg" width="214px" height="120px" />
          <Typography style={{ fontWeight: 600, fontSize: '1.2rem', paddingTop: '20px', paddingBottom: '20px', width:'400px' }}>
            Are you sure to cancel this {props.message}
          </Typography>
          {!props.admin && <p style={{ textAlign: "left" }}>Cancellation Policy :</p>}
          {error && <Typography style={{textAlign:'left',fontFamily:'Dubai Light', fontWeight:600, fontSize:'0.9rem', color:'#ff0101'}}>{error}</Typography>}
          <CssTextField
            placeholder="Please Type in the reason for Cancellation"
            multiline
            rows={2}
            variant="outlined"
            fullWidth
            inputProps={{
              maxLength: 250,
            }}
            className={error ? classes.errorTextInput : ''}
            onChange={(e) => {
              setRemarks(e.target.value)
              if(e.target.value.length >= 230)
                setMaxLengthMsg(250-e.target.value.length + ' characters left.')
              else
                setMaxLengthMsg('')
              setError('')
                // Value must be less than or equal to 150 character
              // props.containers.cancelRemarks =
              //   e.target.value;
              // if (
              //   props.containers.cancelRemarks &&
              //   props.containers.cancelRemarks
              //     .length !== 0 &&
              //   props.containers.cancelRemarks !== ""
              // )
              //   setDisable(false);
              // else setDisable(true);
            }}
          />
          <Grid container>
          <Grid item xs={6}>
            <Typography
              style={{ textAlign: 'left', fontFamily: 'Dubai Light', fontWeight: 600, fontSize: '0.8rem', color:'#ff0101', paddingLeft: '5px' }}>
              {lengthMsg}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              style={{ fontFamily: 'Dubai Light', fontWeight: 600, fontSize: '0.8rem', color: '#777777', textAlign: 'end', paddingRight: '5px' }}>
              {remarks.length + '/' + 250}</Typography>
          </Grid>
          </Grid>
          <hr style={{ backgroundColor: "#B7B7B7", margin:0}}/>
        </DialogContent>
        <DialogActions style={{ alignSelf: "center" }}>
          <Button style={{
            border: "1px solid #0E1B3D",
            color: "#0E1B3D",
            width: '125px', height: '35px',
            paddingRight: '15px',
            fontSize: '12px', fontFamily: 'Dubai Light', fontWeight: 600,
            borderRadius: '3px'
          }} onClick={() => {
            props.onClose();
          }}>NO, GO BACK</Button>
          <Button style={{
            backgroundColor: "#1360D2",
            color: "#fff",
            width: '125px', height: '35px',
            fontSize: '12px', fontFamily: 'Dubai Light', fontWeight: 600,
            borderRadius: '3px'
          }}
            // disabled={disable}
            onClick={handleConfirm}
          >YES, CANCEL</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
            //   () => {
            //   const remoteUrl = `${endpointContants.cancelContainer}`;
            //   let obj = {
            //     url: remoteUrl,
            //     body: props.containers
            //   };
            //   postHttp(obj, true).then(response => {
            //     props.onClose();
            //     props.refresh();
            //   })
            //     .catch(error => {
            //     })
            // }