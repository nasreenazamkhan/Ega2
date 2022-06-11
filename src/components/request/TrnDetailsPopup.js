import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CommonService from "../../service/CommonService";
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

export default function TrnDetailsPopup(props) {
  console.log("props in TrnDetailsPopup", props);

  const [open, setOpen] = React.useState(true);


  //let history = useHistory();

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
          VAT Profile
        </DialogTitle>
        <DialogContent>
                  <p style={{ textAlign: "center", fontSize: "18px" }}>
                      {" "}
                     VAT Number is not available. Do you want to procced or complete your VAT Profile?
                  </p>
                 
        </DialogContent>
        <DialogActions style={{ alignSelf: "center" }}>
          {" "}
          <Button
            style={{
              background: "#0568AE",
              color: "#fff",
              textTransform: "none",
                      }}
            onClick={() => {
              console.log("create vat info");
                        
              window.open(props.redirectionUrl.vatProfileDto.redirectionUrl);
      }
                        
                    }
          >
            Complete VAT Profile
          </Button>
          <Button
            onClick={handleClose}
            style={{
              background: "#4CAB5B",
              color: "#fff",
              textTransform: "none",
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
