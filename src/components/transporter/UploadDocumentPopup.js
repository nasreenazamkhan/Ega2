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
import DocumentPopup from "./DocumentPopup.css";
import ApplnFileUpload from "../../lib/components/fileupload/ApplnFileUpload";
import UploadDocument from "./UploadDocument";


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function UploadDocumentPopup(props) {

  const [open, setOpen] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [fileName, setFileName] = React.useState();
  const [render, setRender] = React.useState(0);

  const handleClose = () => {
    if (props.popUpParams.uploadType === 'invoice') {
      if (success === true) {
        props.redirectToClaim(fileName);
      }
      else {
        props.onClose();
      }
    }
    else {
      props.onClose();
    }
    setOpen(false);
  };

  const click = (e) => {
    console.log("parent clicked", e);
    props.land(e);
  }

  const handleSuccess = (e) => {
    setSuccess(true);
    setFileName(e);
    if (props.popUpParams.uploadType === 'token') props.onSuccess(e);
    handleClose();
  }

  return (
    <div>
      <Dialog
        fullWidth={true}
        // maxWidth={'md'}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          style: { borderRadius: '0px', minWidth: '600px', minHeight: '400px' }
        }}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></DialogTitle>

        <DialogContent style={{ padding: 0 }}>
          <UploadDocument popUpParams={props.popUpParams} onSuccess={(e) => handleSuccess(e)} land={click}
          onClose={handleClose} />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
