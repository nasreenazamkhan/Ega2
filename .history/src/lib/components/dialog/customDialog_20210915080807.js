import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import { useHistory } from "react-router-dom";

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
    <MuiDialogTitle style={{background:'#0E1B3D'}} >
      <Typography style={{fontFamily:'Dubai Light', color:'#FFFFFF' ,fontWeight:600}}>{children}</Typography>
      <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon style={{fill:'#ffffff'}}/>
        </IconButton>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomDialog(props) {

  useEffect(() => { }, []);

  const handleClose = () => {
  //  props.onClose();
  };


  return (
    <div>
      <Dialog
        maxWidth={"md"}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle id="customized-dialog-title" >
          {props.title}
        </DialogTitle>
        <DialogContent>
          {props.children}
       
        {!props.isHaulierAdd &&
        <>
         <Grid container>
          <Grid item>
           
          <Button
            style={{
              background: "#1360D2",
              color: "#0E1B3D",
              textTransform: "none",
              borderRadius:'0px',
              float:'left'
            }}
            onClick={() => {
              props.onConfirm("NOW");

            }}
          >
            Request Now
          </Button>
 
          </Grid>



        </Grid>
           <Grid item>
         
          <Button
            onClick={() => {
              props.onConfirm("LATER");

            }}
            style={{
              background: "#FFFFFF",
              color: "#0E1B3D",
              textTransform: "none",
              borderRadius:'0px'
            }}
          >
            Request Later
          </Button>
          </Grid>
          </Grid>
          </>
          
          }
          </DialogContent>
        {props.isHaulierAdd && <DialogActions style={{ alignSelf: "center" }}>
          <Button
            style={{
              background: "#4CAB5B",
              color: "#fff",
              textTransform: "none",
              borderRadius:'4px',
              paddingLeft:'30px',
              paddingRight:'30px'
            }}
            onClick={() => {
              props.onConfirm();

            }}
          >
            Continue
          </Button>
        </DialogActions>}
      </Dialog>
    </div>
  );
}
