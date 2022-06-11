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
    padding: theme.spacing(1),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
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

export default function ReInitiatePopup(props) {
  console.log("props in ReInitiatePopup", props);

  const [open, setOpen] = React.useState(true);


  let history = useHistory();

  useEffect(() => {}, []);

  const handleClose = () => {
    props.onReinitiateClose();
    setOpen(false);
  };

 
  return (
    <div>
      <Dialog
        maxWidth={"md"}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Reinitiate?
        </DialogTitle>
        <DialogContent>
          <p style={{ textAlign: "center", fontSize: "18px" }}>
            {" "}
            Would you like to reInitiate payment for this booking?{" "}
          </p>
        </DialogContent>
        <DialogActions style={{ alignSelf: "center" }}>
          {" "}
          <Button
            style={{
              background: "#4CAB5B",
              color: "#fff",
              textTransform: "none",
                      }}
                      onClick={() => {
                        console.log("failed payment clicked", props.row);
                        var requestDetails = {
                            containerList :{},
                            multiLocAndTime: true,
                            requestTruckType: {},
                            reInitialise:false
                        };
                        requestDetails.containerList = props.row.containerList;
                        requestDetails.multiLocAndTime = (props.row.multiLocFlag==="N"?false:true);
                        requestDetails.requestTruckType = props.row.truckList;
                        requestDetails.reInitialise = true;
                       history.push("./requestMain",{containerData:requestDetails,activeStep:1})
                        
                    }}
          >
            Yes
          </Button>
          <Button
            onClick={handleClose}
            style={{
              background: "#dc4e4e",
              color: "#fff",
              textTransform: "none",
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
