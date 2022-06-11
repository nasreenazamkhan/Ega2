import React,{useState} from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
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
    color: "red"
    },
   
});







export default function JobConfirmationPopUp(props) {
 
    const [open, setOpen] = React.useState(true);
    let history = useHistory();
   const[jobList,setJobList]= useState(props.jobList)


   const DialogTitle = withStyles(styles)((props) => {
    const { children, classes ,...other } = props;
  
    const handleClose=()=>
    {
      setOpen(false);
      props.onClose();
    }
    
  
  
  
    return (
      // <MuiDialogTitle disableTypography className={classes.root} {...other}>
      //   <Typography variant="h6">{children}</Typography>
       
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ) 
      // </MuiDialogTitle>
   
  });
  
  const DialogContent = withStyles(() => ({
    root: {
      textAlign:'center'
     
    }
  }))(MuiDialogContent);
    
 

  return (
    <div>
     
      <Dialog 
  
        aria-labelledby="customized-dialog-title"
        open={open}
        
      >
        <DialogTitle
          id="customized-dialog-title"
        
        >Send For Token</DialogTitle>
        <DialogContent>
          {props.children}
        </DialogContent>
       
      </Dialog>
    </div>
  );
}