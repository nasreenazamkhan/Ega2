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
import {
  DialogActions,
  InputLabel,
  TableHead,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import * as endpointContants from "../../utils/ptmsEndpoints";
import { postHttp } from "../../lib/common/HttpService";
import Table from "@material-ui/core/Table";
import MapComponent from "../googlemap/Map";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import RequestBoeService from "../../service/RequestBoeService";
import { useSelector } from "react-redux";


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },

  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "red",
  },
});

const useStyles = makeStyles({
  splitScreen: {
    display: "flex",
    flexDirection: "row",
  },
  table: {
    width: "200px",
  },

  label: {
    fontSize: "16px",
    color: "#000000",
    fontFamily: "Dubai Medium",
    whiteSpace: "nowrap",
  },

  labelData: {
    fontSize: "16px",
    color: "#000000",
    fontFamily: "Dubai Regular",
    whiteSpace: "nowrap",
  },
  hrStyle: {
    width: "52px",
    marginLeft: "5px",
    background: "#FF5667",
    height: "2px",
    border: "0px",

    background: "#FF5667 0% 0% no-repeat padding-box",
  },
  textFieldstyle: {
    paddingBottom: "0px",
    paddingTop: "0px",
  },
});

const TableCell = withStyles({
  root: {
    borderBottom: "none",

    padding: "6.5px",
  },
})(MuiTableCell);



const DialogContent = withStyles(() => ({
  root: {
    textAlign: "center",
  },
}))(MuiDialogContent);

export default function RequestDetailsPopUp(props) {
  console.log("request ppop up props",props);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);  
  const userData= useSelector(state => state.loginUser);
  const userType=userData.user.user_type;
  console.log(userData.user.user_type);

  const handleClose = () => {
    props.onClose();
   
  };


  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      // <MuiDialogTitle disableTypography className={classes.root} {...other}>
      //   <Typography variant="h6">{children}</Typography>
      <>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </>
    );
    // </MuiDialogTitle>
  });

  const onSupportingFileDownload = (referenceNumber) => {
    RequestBoeService.fetchSupportingFiles(referenceNumber)
        .then((response) => {
            if (response.isAxiosError) throw new Error(response.status);
            else {

                const linkSource = `data:${response.data.dataItems[0].filetype};base64,${response.data.dataItems[0].fileContent}`;
                const downloadLink = document.createElement("a");

                downloadLink.href = linkSource;
                downloadLink.download = response.data.dataItems[0].fileName;
                downloadLink.target = "_blank";
                // alert(downloadLink);
                downloadLink.click();
            }
        })

        .catch(() => {
            console.log("error");
        });
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        style={{
          backgroundColor: "#FFF",
          color: "black",
          textAlign: "left",
        }}
      >
        <IconButton
          className="icon-button"
          aria-label="close"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
       

            <Table size="small">
              <TableBody>
              <TableRow>
                  <TableCell>
                    <InputLabel
                      style={{
                        color: "#0E1B3D",
                        fontSize: "24px",
                        fontFamily:"Dubai Medium"
                      }}
                    >
                      Booking Details
                    </InputLabel>
                    <hr className={classes.hrStyle} />
                  </TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>
                    <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#777777" }}
                    >
                     Requester Name
                    </InputLabel>
                    <InputLabel  style={{  whiteSpace: "nowrap", color: "#303030" }}>{props.request.requesterName}</InputLabel>
                  </TableCell>
                  <TableCell>
                  <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#777777" }}
                    >
                      Requester Number
                    </InputLabel>
                    <InputLabel  style={{  whiteSpace: "nowrap", color: "#303030" }}>{props.request.requesterContact}</InputLabel>
                  </TableCell>
                  <TableCell>
                  <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#777777" }}
                    >
                    Booked On
                    </InputLabel>
                    <InputLabel  style={{  whiteSpace: "nowrap", color: "#303030" }}>{props.request.creationDate}</InputLabel>
                  </TableCell>
                </TableRow>
                {((userType ==='ADMIN')  || (userType ==='TRANSPORTER' && props.request.refStatus.code !=='SUCC')) &&
                <TableRow>
              
                    <TableCell>
                    <InputLabel
                        style={{ whiteSpace: "nowrap", color: "#777777" }}
                      >
                      Company Name
                      </InputLabel>
                      <InputLabel  style={{  whiteSpace: "nowrap", color: "#303030" }}>{props.request.companyName}</InputLabel>
                    </TableCell>  
                </TableRow>
                   }
                <TableRow>
                <TableCell>
                  <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#777777" }}
                    >
                     Importer Comments
                    </InputLabel>
                    <InputLabel  style={{  whiteSpace: "nowrap", color: "#303030" }}>{props.request.importerComments}</InputLabel>
                  </TableCell>
                  {((userType==='ADMIN') || (userType==='IMPORTER') || (userType==='TRANSPORTER' && props.request.refStatus.code !=='SUCC')) &&
                  <TableCell colSpan={2}>
                        <InputLabel
                            style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                          >
                            {'\u00A0'}
                          </InputLabel>
                          <InputLabel>
                          <img src="./download_doc.svg" onClick={() => onSupportingFileDownload(props.request.referenceNumber)}/>{'\u00A0'}
                          <Link onClick={() => onSupportingFileDownload(props.request.referenceNumber)}>
                            Supporting Files</Link>
                          </InputLabel>
                        </TableCell>
                  }
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2}>
                <InputLabel
                      style={{
                        color: "#0E1B3D",
                        fontSize: "24px",
                        fontFamily:"Dubai Medium"
                      }}
                    >
                      Payment Breakups
                    </InputLabel>
                    <hr className={classes.hrStyle} />
                    </TableCell>
                    {((userType==='ADMIN') || (userType==='IMPORTER') ) &&
                        <TableCell>
                        {props.request.totalAmt}
                        </TableCell>
                    }
                     {( userType==='TRANSPORTER' ) &&
                        <TableCell>
                        {props.request.transporterAmount}
                        </TableCell>
                    }

                </TableRow>

            
                </TableBody>
                </Table>
               
               

               
      </DialogContent>
      {/* <DialogActions >
        <Button>No</Button>
        <Button
          style={{ backgroundColor: "#0E1B3D" }}
          onClick={() => {
            const remoteUrl = `${endpointContants.cancelContainer}`;

            let obj = {
              url: remoteUrl,
              body: props.containers,
            };
            postHttp(obj, true)
              .then((response) => {
                props.onClose();
                props.refresh();
              })
              .catch((error) => {});
          }}
        >
          Yes
        </Button>
      </DialogActions> */}
    </Dialog>
  );
}
