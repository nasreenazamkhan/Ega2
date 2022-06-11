import React,{useEffect} from "react";
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

export default function TokenConfirmPopup(props) {
  console.log("props in startjob",props)
 
  const [open, setOpen] = React.useState(true);
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [jobnumber,setJobnumber] =React.useState("");

  let history = useHistory();
  
  useEffect(() => {
    
  }, []);
    
    const handleClose = () => {
      props.onClose();
    setOpen(false);
  };

  const gotoStatusPage = () => {
      history.push('./jobDetails');
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
        <img src="./success.svg" style={{ marginTop: "7px" ,align:"center",marginLeft:"45%"}} />
        <h1 style={{textAlign:"center",color:"green"}}>Confirmed</h1>            
          <p style ={{textAlign:"center"}}> Token Request has been successfully sent to DT Admin        </p>      
          <p style ={{textAlign:"center"}}>You will be notified once it is assigned</p>
         
                
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
