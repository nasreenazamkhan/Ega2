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
import moment from 'moment';


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


const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    // <MuiDialogTitle disableTypography className={classes.root} {...other}>
    //   <Typography variant="h6">{children}</Typography>
     
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
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


 function JobConfirmationAdmin(props) {
    
 

     let history=useHistory();
     const date=moment(new Date()).format('DD/MM/YYYY');
     const time=moment().format('hh:mm A');
    
    const handleClose = () => {
      props.onClose();
    
  };

  return (
      <>
    <div>
     
      <Dialog 
  
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></DialogTitle>
        <DialogContent>
        <img src="./truck_admin.svg"  />
       <p style={{color:"#63BB7A",fontSize:"25px"}}>Job Assigned</p>
    
      
  <div style={{color:"black",fontWeight:"bold"}} >Job has successfully assigned on {date} at {time}</div>
  <br></br>
    <div style={{color:"grey"}}> Kindly note the job will be moved to transporter active jobs pool,</div>
       <div  style={{color:"grey"}}> kindly ensure they start job to proceed</div>
           <br/>

           <div style={{color:"black",fontWeight:"bold"}}>Click here to go back to <Link color="secondary" onClick={
         ()=>history.push("/adminDashBoard")}>dashboard </Link> page
       
       </div>
    
     {/* <p style={{color:"grey"}}>Check the approval status in  <Link color="secondary" onClick={
         ()=>history.push("/myJobs",{tabSelected:2})
     }> Active Jobs </Link>  page  and start job </p> */}
        </DialogContent>
       
      </Dialog>
    </div>
    </>
  );
}
export default React.memo(JobConfirmationAdmin);