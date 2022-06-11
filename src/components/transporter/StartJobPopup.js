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
import Link from '@material-ui/core/Link';
import { useHistory } from "react-router-dom";

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

export default function StartJobPopup(props) {
  console.log("props in startjob", props)

  const [open, setOpen] = React.useState(true);
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [jobnumber, setJobnumber] = React.useState("");

  let history = useHistory();

  useEffect(() => {
    setDate(props.time.split(" ")[0]);
    setTime(props.time.split(" ")[1]);
    setJobnumber(props.jobNumber);
  }, []);

  const handleClose = () => {
    setOpen(false);
    props.onClose();

  };

  const gotoStatusPage = () => {
    history.push('./transporterStatus');
  };
  return (
    <div>

      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></DialogTitle>
        <DialogContent>
          <img src="./truck_startjob.svg" style={{ marginTop: "7px", align: "center"}} />
          <h1 style={{ textAlign: "center", color: "#3AD29F", fontWeight:600 }}>Started!</h1>
          <p style={{ textAlign: "center", color: "black" }}>Job has successfully started on</p>
          <p style={{ textAlign: "center", color: "black" }}>{`${date}`} at {`${time}`}</p>
          <p style={{ textAlign: "center", color: "black" }}>Kindly note the number for any future communications</p>
          <p style={{ textAlign: "center", fontWeight: "bold", color: "black" }} >Booking Number#{`${jobnumber}`} </p>
          <br></br>
          <p style={{ textAlign: "center", color: "black" }}>Please view <Link color="secondary" onClick={gotoStatusPage}> Status  </Link>  page to track and update.</p>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
