import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { IconButton, Icon, TablePagination, Tooltip, CircularProgress, InputLabel, Divider } from '@material-ui/core';

import { TableProps, } from './tableProps';
import { NO_DIALOG } from '../../common/Constants';
import { CONFIRM_DIALOG } from '../../common/Constants';
import AlertDialog from '../dialog/alertDialog';
import { getHttp } from '../../common/HttpService';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import NativeSelect from "@material-ui/core/NativeSelect";
import ConfirmDialog from '../dialog/confirmDialog';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { postHttp } from '../../common/HttpService';
import ContactDetails from '../../../components/request/ContactDetails';
import { useHistory } from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import Track from '../../../components/stepper/Track';
import UploadDocumentPopup from "../../../components/transporter/UploadDocumentPopup";
import { Paper ,Typography} from "@material-ui/core";
import { propTypes } from 'react-bootstrap/esm/Image';
import CommonService from "../../../service/CommonService";
import RequestContainerService from "../../../service/RequestContainerService";
import FormControl from "@material-ui/core/FormControl";
import AssignTruckAndDriverService from "../../../service/AssignTruckAndDriverService";
import InputBase from "@material-ui/core/InputBase";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button ,TextField} from "@material-ui/core";
import TokenConfirmPopup from '../../../components/transporter/TokenConfirmPopup';
import CloseIcon from "@material-ui/icons/Close";
import ApplnDatePicker from "../../components/datepicker/ApplnDatePicker";
import ApplnAutoCompleteAsync from "../../components/autocomplete/ApplnAutoCompleteAsync";
import { FormProvider, useForm } from "react-hook-form";
import Autocomplete from '@material-ui/lab/Autocomplete';
import "../../../assets/styles.css"; 
import * as endpointContants from '../../../utils/ptmsEndpoints';
import SuccessToast from "../toast/SuccessToast";
import MuiTableContainer from "@material-ui/core/TableContainer";
const SpacedTable = withStyles((theme: Theme) =>
    createStyles({
        root: {
            borderCollapse: 'separate',
            borderSpacing: '0 9px',
            paddingInline: '5px'
        }
    }

    )
)(Table);
const InnerTable = withStyles((theme: Theme) =>
createStyles({
    root: {
       padding:'0px'
    }
}
)
)(TableCell);
const InnerCell = withStyles((theme: Theme) =>
createStyles({
    root: {
        fontSize: "13px", 
        color: "grey"
    }
}
)
)(TableCell);
const StyledCollapse = withStyles((theme: Theme) =>
    createStyles({
        container: {
            border: '1px solid #E8E8E8',
            borderTop: '0px',
            borderBottom: '0px'
        }
    }

    )
)(Collapse);

const HeaderTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            // border: '1px solid #E8E8E8',
            
            backgroundColor: '#F9F9F9',
            boxShadow: '0px 0px 6px 0px #00000045'
        }
    }

    )
)(TableRow);

const InnerTableRow = withStyles((theme: Theme) =>
    createStyles({
    }

    )
)(TableRow);


const CollapseTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            paddingTop: 3,
            paddingBottom: 3,
            "&:$last-child": { paddingRight: '25px' },
            "&:$first-child": { paddingLeft: '25px' },
            color: '#848484',
            fontWeight: 'bold',
            fontSize: '14px',
            textAlign: 'left',
            whiteSpace: 'nowrap',
            borderBottom:'1px solid #929292'
        },
        body: {
            paddingTop: 3,
            paddingBottom: 3,
            "&:$last-child": { paddingRight: '25px' },
            "&:$first-child": { paddingLeft: '25px' },
            whiteSpace: 'nowrap',
            fontSize: '14px',
            color: '#848484',
            textAlign: "left",
            borderBottom: '1px solid #CECECE'

        },



    }),
)(TableCell);
const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        root: {
            height: "81px",
            paddingTop: "0px !important",
            paddingBottom:"0px !important"
        },
        head: {
            color: '#808080',
            fontSize:"16px !important"
        },
        body: {
            whiteSpace: 'nowrap',
	        fontSize:"16px !important",
            color: '#808080',
            
        },



    }),
)(TableCell);

const StyledTableCell1 = withStyles((theme: Theme) =>
    createStyles({

        head: {
            color: '#808080',
        },
        body: {
           // whiteSpace: 'nowrap',
            fontSize: '16px !important',
            color: '#808080'
        },



    }),
)(TableCell);

const useStyles1 = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    form: {
        padding: '35px'
    }
});

const StyledTableContainer = withStyles((theme: Theme) =>
    createStyles({
        root: {
            flexWrap: "nowrap",
            overflowY: "scroll",
            
            "&::-webkit-scrollbar": {
                width: "10px",
               
               
            },
            "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 2px rgba(0,0,0,0.00)",
                webkitBoxShadow: "inset 0 0 2px rgba(0,0,0,0.00)",
            
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#787878",
                borderRadius: 2,
            },
        },
    }))(MuiTableContainer);






function GetTableRow({ dk, row, index, page, tabSelected,onSubmit}: any) {
    const [drawer, setDrawer] = useState(false);
    const [trackPopup, setTrackPopup] = useState(false);
    const [truckTypeDrawer, setTruckTypeDrawer] = useState(false);
    const [steps, setSteps] = useState([]);
    const classes = useStyles1();
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    const popUpParams={uploadType:"invoice",referenceNumber:row.referenceNumber,status:row.invoice};
    console.log("data table row::::", row);
    let rd = 'row.' + dk.key;
    let datastr = '';
    if (dk.key !== "truckList")
        datastr = eval(rd);
    console.log("dk.key", dk.key);
    console.log("datastr", datastr);

    let history = useHistory();

    const openPopup = () => {
        setShowUploadPopup(true);
        
    };

    const list = (anchor: any, requestContainerList: any) => (
        <div>
            <br></br>
            <InputLabel
                style={{ fontSize: "14px", color: "#848484", marginLeft: "15px" }}
            >
                {" "}
        Container Details
      </InputLabel>
            <br></br>
            <Divider></Divider>
            <br></br>
            <Table size="small" style={{ width: "320px", marginLeft: "12px" }}>
                <TableHead>
                    <Paper elevation={0} >{/**style={{ marginTop: "5px" }} */}
                        <TableRow>
                            <TableCell >{/**style={{ fontSize: "13px", color: "grey" }} */}
                                Container Number
              </TableCell>
                            <TableCell >{/**style={{ fontSize: "13px", color: "grey" }} */}
                                ISO Code
              </TableCell>
                            <TableCell >{/**style={{ fontSize: "13px", color: "grey" }} */}
                                Pickup
              </TableCell>
                        </TableRow>
                    </Paper>
                </TableHead>
                <TableBody>
                    {requestContainerList.map((container: any, ind: any) => (
                        <TableRow>
                            <Paper variant="outlined"  >
                                <TableCell >{/**style={{ fontSize: "13px", color: "grey" }} */}
                                    {container.container_number}
                                </TableCell>
                                <TableCell >{/**style={{ fontSize: "13px", color: "black" }} */}
                                    {container.iso_code}
                                </TableCell>
                                <TableCell >{/**style={{ fontSize: "13px", color: "grey" }} */}
                                    {container.pickupLocation}
                                </TableCell>
                            </Paper>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

    const list1 = (anchor: any, row: any) => (
        
        <div
      style={{width:"579px"}}

        ><InputLabel
        style={{ fontSize: "24px", color: "#434343", marginLeft: "27px",marginTop:"20px" }}
    >
        {" "}
Tracking Details for {row.referenceNumber}
</InputLabel>
    <hr></hr>
             <div >
                    <CloseIcon fontSize="large" className="rightAlign" onClick={() => {
                         setTrackPopup(false);
                    }}/>
            </div>
            <Track tab={tabSelected} steps={steps} />


        </div>
    );

    const listTruckType = (anchor: any, truckList: any) => (
        console.log("list truck type:::", truckList),
        <div>
            <br></br>
            <InputLabel
                style={{  color: "grey", marginLeft: "15px" }}
            >
                {" "}
          Truck Details
        </InputLabel>
            <br></br>
            <Divider></Divider>
            <br></br>
            <Table size="small" style={{ width: "320px", marginLeft: "12px" }}>
                <TableHead>
                    <Paper elevation={0} style={{ marginTop: "5px" }}>
                        <TableRow>
                            <TableCell style={{  color: "grey" }}>
                                Truck Name
                </TableCell>
                            <TableCell style={{  color: "grey" }}>
                                Date and time
                </TableCell>

                        </TableRow>
                    </Paper>
                </TableHead>
                <TableBody>
                    {truckList.map((truck: any, ind: any) => (
                        <TableRow>
                            <Paper variant="outlined" style={{ marginTop: "5px" }}>
                                <TableCell style={{  color: "grey" }}>
                                    {truck.vehicleName}
                                </TableCell>
                                <TableCell style={{  color: "black" }}>
                                    {truck.dateAndTime}
                                </TableCell>

                            </Paper>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

    if (dk.key === 'downloadReciept') {
        return (
            <>
                <StyledTableCell key={index} align="center"><Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                        CommonService.downloadReceipt(row.bookingNumber);
                    }}

                >DOWNLOAD RECEIPT</Link></StyledTableCell>
            </>
        )
    }
    else if (dk.key === 'truckList') {
        if (row.multiLocFlag === "N") {
            return (
                <>
                    <StyledTableCell key={index} align="center"><Link
                        component="button"
                        style={{textDecoration:"underline",fontSize:"16px"}}
                        onClick={() => {
                            setTruckTypeDrawer(true);
                        }}
                    >Truck Type</Link></StyledTableCell>
                    {truckTypeDrawer && <SwipeableDrawer
                        anchor="right"
                        open={truckTypeDrawer}
                        onClose={() => {
                            setTruckTypeDrawer(false);
                        }}
                        onOpen={() => {
                            setTruckTypeDrawer(true);
                        }}
                    >
                        {listTruckType('right', row.truckList)}
                    </SwipeableDrawer>}
                </>
            )
        }
        else {
            return (
                <StyledTableCell key={index} align="center">
                </StyledTableCell>
            )
        }
    } else if (dk.key === 'track') {
        return (
            <>
                <StyledTableCell key={index} align="center">
                    <IconButton
                        onClick={() => {
                            console.log("heyyyy", row);
                            console.log("row.jobTrackList", row.jobTrackList);
                            setTrackPopup(true);
                            let step = [];
                            if (tabSelected === 'Pending') {
                                console.log("calling");
                                step.push("Booked on " + row.createdDate);
                                setSteps(step);
                            }
                            if (tabSelected === "Confirmed") {
                                let truckAssigned = "";
                                row.jobTrackList.map((track: any) => {
                                    if (track.status === 'PTOK')
                                    truckAssigned = track.actionDateAndTime;
                                })
                                step.push("Booked on " + row.createdDate.split(" ")[0]+ " at "+row.createdDate.split(" ")[1]);
                                step.push("truck assigned" + truckAssigned.split(" ")[0]+" at "+truckAssigned.split(" ")[1]);
                                setSteps(step);
                            }
                            if (tabSelected === "In Progress") {
                                let truckAssigned = "";
                                let jobStartedDate = "";
                                let jobStartedAt = "";
                                {
                                    row.jobTrackList.map((track: any) => {
                                        if (track.status === 'PTOK')
                                            truckAssigned = track.actionDateAndTime;
                                        if (track.status === 'INPRO') {
                                            jobStartedDate = track.actionDateAndTime.split(" ")[0];
                                            jobStartedAt = track.actionDateAndTime.split(" ")[1];
                                        }
                                    })
                                }
                                console.log("rowwww", row);
                                step.push("Booked on " + row.createdDate.split(" ")[0]+ " at "+row.createdDate.split(" ")[1]);
                                step.push("truck assigned on " + truckAssigned.split(" ")[0]+ " at "+truckAssigned.split(" ")[1]);
                                step.push("Job started on " + jobStartedDate+ " at "+jobStartedAt);
                                setSteps(step);
                            }
                            if (tabSelected === "Delivered") {
                                let truckAssigned = "";
                            let jobStarteddate = "";
                            let podSubmitted = "";
                            let delivered = "";
                                let jobStatedAt = "";
                                let del = "";
                            {
                                row.jobTrackList.map((track: any) => {
                                    if (track.status === 'PTOK')
                                        truckAssigned = track.actionDateAndTime;
                                    if (track.status === 'INPRO') {
                                        jobStarteddate = track.actionDateAndTime.split(" ")[0];
                                        jobStatedAt = track.actionDateAndTime.split(" ")[1];
                                    }
                                    if (track.status === "PODUPL")
                                        podSubmitted = track.actionDateAndTime;
                                    if (track.status === "FCL_DEL")
                                    delivered = track.actionDateAndTime;
                                })
                            }
                            console.log("rowwww", row);
                            step.push("Booked on " + row.createdDate.split(" ")[0]+ " at "+row.createdDate.split(" ")[1]);
                            step.push("truck assigned on " + truckAssigned.split(" ")[0]+ " at "+truckAssigned.split(" ")[1]);
                            step.push("Job started on " + jobStarteddate +" at "+jobStatedAt);
                                row.requestContainerList.map((container: any) => {
                                    container.containerTrackList.map((conTrack: any) => {
                                        if (conTrack.status === 'FCL_DEL' || conTrack.status === 'PMTTOK')
                                            del = del + " container number " + container.container_number+" delivered on "+conTrack.actionDateAndTime
                                   })
                                    
                            })
                           step.push(del);
                            setSteps(step);
                            }
                            if (tabSelected === "Completed") {
                                let truckAssigned = "";
                            let jobStarteddate = "";
                            let podSubmitted = "";
                            let delivered = "";
                                let jobStatedAt = "";
                                let del = "";
                                let com = "";
                            {
                                row.jobTrackList.map((track: any) => {
                                    if (track.status === 'PTOK')
                                        truckAssigned = track.actionDateAndTime;
                                    if (track.status === 'INPRO') {
                                        jobStarteddate = track.actionDateAndTime.split(" ")[0];
                                        jobStatedAt = track.actionDateAndTime.split(" ")[1];
                                    }
                                    if (track.status === "PODUPL")
                                        podSubmitted = track.actionDateAndTime;
                                    if (track.status === "FCL_DEL")
                                    delivered = track.actionDateAndTime;
                                })
                            }
                            console.log("rowwww", row);
                            step.push("Booked on " + row.createdDate.split(" ")[0]+ " at "+row.createdDate.split(" ")[1]);
                            step.push("truck assigned on " + truckAssigned.split(" ")[0]+ " at "+truckAssigned.split(" ")[1]);
                            step.push("Job started on " + jobStarteddate +"at "+jobStatedAt);
                            row.requestContainerList.map((container: any) => {
                                container.containerTrackList.map((conTrack: any) => {
                                    if (conTrack.status === 'FCL_DEL' || conTrack.status === 'PMTTOK')
                                        del = del + " container number " + container.container_number + " delivered on " + conTrack.actionDateAndTime
                                        if (conTrack.status === 'COMPL')
                                        com = com + " container number " + container.container_number+"  back in yard on "+conTrack.actionDateAndTime
                               })
                                
                        })
                       step.push(del);
                             if(com!=="")
                       step.push(com); 
                            setSteps(step);
                            }
                        }}
                    >

                        <img src='./track_red.svg' />
                    </IconButton>
                </StyledTableCell>
                {trackPopup && <SwipeableDrawer
                    anchor='right'
                    open={trackPopup}
                    onClose={() => {
                        setTrackPopup(false);

                    }}
                    onOpen={() => {
                        setTrackPopup(true);

                    }}
                >
                    {list1('right', row)}
                </SwipeableDrawer>}

            </>
        )
    } else if (dk.key === 'contactDetails') {

        return (
            <>
                <StyledTableCell1 key={index} align="center" >
                    <Grid container  alignItems="flex-start">
                        <Grid item style={{ marginTop: "40px", marginRight: "-10px" }}>
                            <img src="./location-pin.svg" />
                        </Grid>
                        <Grid item >
                            <Box style={{
                                width: "12rem", height: "6rem",
                                color: "black",
                                textAlign: "center",

                                marginTop: "5px",
                                border: "2px dashed #ccc"
                            }}>
                                {/* <p>{datastr.split("$")[0]}</p>
                                <p>{datastr.split("$")[1]}</p>
                                <p>{datastr.split("$")[2]}</p> */}
                              <Grid container style={{marginTop:"5px",fontSize:"13px"}} > {datastr} </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </StyledTableCell1>
            </>
        )
    }else if (dk.key === "settlement") {
        return (
            <>
                <StyledTableCell key={index} align="center">
                    <Grid container ><Grid item>
                        {row.settlementStatus==='CLAIM' && <Button style={{ textTransform: "none" }}
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                history.push('./../settlements')
                            }}> Settlement</Button>}
                        {row.settlementStatus==='INVSUBMT' && <Button style={{ textTransform: "none" ,fontStyle:"italic",backgroundColor:"#EE9B22",color:"white"}}
                            disabled={true}
                            variant="contained"
                        > Invoice Submitted</Button>}
                         {row.settlementStatus==='INVAPPR' && <Button style={{ textTransform: "none" ,fontStyle:"italic",backgroundColor:"#EE9B22",color:"white"}}
                            disabled={true}
                            variant="contained"
                        > Invoice Approved</Button>}
                        {row.settlementStatus==='SETTLED' && <Button style={{ textTransform: "none" ,fontStyle:"italic",backgroundColor:"#EE9B22",color:"white"}}
                            disabled={true}
                            variant="contained"
                        > Amount Paid</Button>}
                        {row.settlementStatus === 'INVREJECT' && <Button style={{ textTransform: "none", backgroundColor: "#EA2428", color: "white" }}
                            
                            variant="contained"
                            onClick={openPopup}
                        > Invoice Rejected</Button>}
                        {showUploadPopup && <UploadDocumentPopup popUpParams={popUpParams} onClose={() => {
                            setShowUploadPopup(false);
                            onSubmit();
                        }}
                           
                          redirectToClaim={(e:any)=>{history.push("/claimSummary",{ settlement: row,fileName:e })}}/> }
                    </Grid>
                    </Grid>
                </StyledTableCell>
                </>
        )
    } 
   
    else {
        return (
            <>

                <StyledTableCell key={index} align="center"><Grid item xs={2}>{dk.name} </Grid><Grid item xs={2} style={{ fontWeight: 'bold' }}>{datastr} </Grid></StyledTableCell>



            </>
        )
    }

}

const BootstrapInput = withStyles((theme) => ({
    root: {
     
    
 
    },
   input: {
     borderRadius: 4,
     position: "relative",
     backgroundColor: theme.palette.background.paper,
     border: "1px solid #ced4da",
     width: 100,
     fontSize: 15,
     padding: "26px 15px 5px  20px",
     transition: theme.transitions.create(["border-color", "box-shadow"]),
     // Use the system font instead of the default Roboto font.
     fontFamily: ['"Segoe UI Regular"'].join(","),
     "&:focus": {
       borderRadius: 4,
       borderColor: "grey",
       boxShadow: "0 0 0 0rem ",
     },
     color: "grey",
    
   }
 
}))(InputBase);
 

function CollapseTableRow({ dk, row, index, tabSelected, rowParent, truckList, onSubmit }: any) {
    const [showPopup, setShowPopup] = useState(NO_DIALOG);
    const [viewPopup, setViewPopup] = useState(false);
    const [trackPopup, setTrackPopup] = useState(false);
    const [showToaster, setShowToaster] = useState(false);
    console.log("row in CollapseTableRow1 ", row);
    console.log("tab selected", tabSelected);
    console.log("trucklist ::", truckList);
    const classes = useStyles1();
    const [steps, setSteps] = useState([]);
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    const [render, setRender] = useState(0);
    const [message, setMessage] = useState(["Kindly note the number for future communication", "Order Number #", rowParent.referenceNumber, " The job will be marked under delivered status, only if POD is approved by Admin"])
    const popUpParams = { uploadType: "POD", referenceNumber: row.container_number, message: message, dpwTransactionId: row.dpwTransactionId, boeNumber: row.boeNumber, status: row.proofOfDelivery }
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({ right: false });
    const [tokenPopup, setTokenPopup] = React.useState(false);
    const [fromTime, setFromTime] = React.useState("");
    const [toTime, setToTime] = React.useState("");
    
    const methods = useForm({
        //resolver: yupResolver(schema),
        mode: "onChange",
        reValidateMode: "onChange",
        //  defaultValues: '',
    });
    
    const truckKVmapping = { label: "label", value: "value" };
    let transporter = "";
  const truckUrl = `${endpointContants.fetchTrucksForTransporter}?transporter=${transporter}`;

    console.log("collapse data row", dk.key);
    let rd = 'row.' + dk.key;
    let datastr = eval(rd);
    let showToast = false;
    let view = false;
    let track = false;
    console.log("collapse data row datastr ", datastr);

    const openPopup = () => {
        console.log("Delivered clicked");
        setShowUploadPopup(true);
        setRender(render + 1);

    };

    const handleClose = () => {
        setShowUploadPopup(false);
        onSubmit();
    };

    const handleCloseForToken = () => {
        setOpen(false);
    }

    const handleCloseTokenConfirm = () => {
        setTokenPopup(false);
        onSubmit();
    }

    const land = () => {
        tabSelected = "Delivered";
        console.log("efergt");
    }

    const onEtokenDownload = (jobRefNo: any, containerNumber: any, tokenType: any) => {
  
        RequestContainerService.fetchEtoken(jobRefNo, containerNumber, tokenType)
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

    const onPODDownload = (jobRefNo: any, containerNumber: any) => {
  
        RequestContainerService.fetchPod(jobRefNo, containerNumber)
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



    const list = (anchor: any, row: any) => (
        console.log("anchor and row", row),
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}

        >

            <ContactDetails createEditFormData={row} onConfirm={() => {

                setViewPopup(false);
            }} />

        </div>
    );

    const list1 = (anchor: any, row: any) => (
        console.log("anchor and row", row),
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}

        >
            <Track tab={tabSelected} steps={steps} />
            {/* <ContactDetails createEditFormData={row} onConfirm={() => {
                      
                setViewPopup(false);
            }} /> */}

        </div>
    );

    if (dk.key === "track") {
        return (
            <>

                <CollapseTableCell key={index} align="center" ><IconButton

                    onClick={() => {
                        track = true;
                        setTrackPopup(true);
                        let step: any;
                        if (tabSelected === 'Pending') {
                            console.log("calling");
                            step.push("Booked on " + row.bookingDate);
                            setSteps(step);
                        }
                        if (tabSelected === "Confirmed") {
                            let truckAssigned = "";
                            row.containerTrackList.map((track: any) => {
                                if (track.status === 'PTOK')
                                    truckAssigned = track.actionDateAndTime;
                                step.push("Booked on " + row.bookingDate);
                                step.push("truck assigned" + truckAssigned.split(" ")[0] + " at " + truckAssigned.split(" ")[1]);
                                setSteps(step);
                            })
                        }
                        if (tabSelected === "In Progress") {
                            let truckAssigned = "";
                            let jobStarteddate = "";
                            let jobStatedAt = "";
                            {
                                row.containerTrackList.map((track: any) => {
                                    if (track.status === 'PTOK')
                                        truckAssigned = track.actionDateAndTime;
                                    if (track.status === 'INPRO') {
                                        jobStarteddate = track.actionDateAndTime.split(" ")[0];
                                        jobStatedAt = track.actionDateAndTime.split(" ")[1];
                                    }
                                })
                            }
                            console.log("rowwww", row);
                            step.push("Booked on " + row.bookingDate);
                            step.push("truck assigned on " + truckAssigned);
                            step.push("Job started on " + jobStarteddate + " at" + jobStatedAt);
                            setSteps(step);
                        }
                        if (tabSelected === "Delivered") {
                            let truckAssigned = "";
                            let jobStarteddate = "";
                            let podSubmitted = "";
                            let delivered = "";
                            let jobStatedAt = "";
                            {
                                row.containerTrackList.map((track: any) => {
                                    if (track.status === 'PTOK')
                                        truckAssigned = track.actionDateAndTime;
                                    if (track.status === 'INPRO') {
                                        jobStarteddate = track.actionDateAndTime.split(" ")[0];
                                        jobStatedAt = track.actionDateAndTime.split(" ")[1];
                                    }
                                    if (track.status === "PODUPL")
                                        podSubmitted = track.actionDateAndTime;
                                    if (track.status === "DEL")
                                        delivered = track.actionDateAndTime;
                                })
                            }
                            console.log("rowwww", row);
                            step.push("Booked on " + row.bookingDate);
                            step.push("truck assigned on " + truckAssigned);
                            step.push("Job started on " + jobStarteddate + "at " + jobStatedAt);
                            step.push("POD Submitted " + podSubmitted);
                            step.push("Delivered on " + delivered);
                            setSteps(step);
                        }
                    }}
                ><img src='./track_red.svg' /></IconButton></CollapseTableCell>

                {trackPopup && <SwipeableDrawer
                    anchor='right'
                    open={trackPopup}
                    onClose={() => {
                        setTrackPopup(false);

                    }}
                    onOpen={() => {
                        setTrackPopup(true);

                    }}
                >
                    {list1('right', row)}
                </SwipeableDrawer>}

            </>
        )

    }
   
    if (!(dk.key === "track") && !(dk.key === "actions") && !(dk.key === "etoken") && !(dk.key === "pods") && !(dk.key === "mtetoken") && !(dk.key === "mtTruck") && !(dk.key === "mtDel") && !(dk.key === "timeInSlot") && !(dk.key === "tokenIn") && !(dk.key === "requestTimeInSlot")) {
        return (
            <>
                <CollapseTableCell key={index} align="center">{datastr}</CollapseTableCell>

            </>
        )

    }
    if (dk.key === "actions") {
        return (
            <>
                <StyledTableCell key={index} align="center">
                    <Grid container ><Grid item>
                        {row.refStatus.code === 'INPRO' && <Link style={{ color: "#0E1B3D", marginTop: "20px", textDecoration: "underline" }}
                            component="button"
                            variant="body2"

                            onClick={openPopup}
                        >Delivered?</Link>}
                        {row.refStatus.code === 'PODUPL' && <InputLabel style={{ color: "#EE600F" ,marginTop:"25px"}}>POD submitted
                            </InputLabel>}
                        {row.refStatus.code === 'PODREJ' && <Link style={{ color: "#0E1B3D", marginTop: "20px" }}
                            component="button"
                            variant="body2"

                            onClick={openPopup}
                        >POD Rejected</Link>}
                    </Grid>
                    </Grid>
                </StyledTableCell>
                {showUploadPopup && <UploadDocumentPopup onClose={handleClose} land={land} popUpParams={popUpParams} />}
            </>
        )
    }
    if (dk.key === "etoken") {
        return (
            <>
                <StyledTableCell key={index} align="center">
                    <Grid container ><Grid item>
                        <img src="./download_doc.svg" /><Link  style={{textDecoration:"underline",fontSize:"14px"}} onClick={() => onEtokenDownload(rowParent.referenceNumber, row.container_number, "FCL OUT")}>FCL OUT eToken</Link>
                    </Grid>
                    </Grid>
                </StyledTableCell>
               
            </>
        )
    }
    if (dk.key === "pods") {
        return (
            <>
                <StyledTableCell key={index} align="center">
                    <Grid container ><Grid item>
                        <img src="./document.svg" onClick={() => onPODDownload(rowParent.referenceNumber, row.container_number)} />
                    </Grid>
                    </Grid>
                </StyledTableCell>
            </>
        )
    }

    if (dk.key === "mtetoken") {
        return (
            <>
                <StyledTableCell key={index} align="center">
                    <Grid container ><Grid item>
                        {row.refStatus.code === "FCL_DEL" && <Link style={{ color: "#0E1B3D", marginTop: "20px", textDecoration: "underline" }}
                         
                            onClick={(e: any) => {
                                if (row.mtTruck !== undefined && row.mtTruck !== "" && row.tokenInDate !== undefined && row.tokenInDate !== "" && row.tokenInSlotFrom !== undefined && row.tokenInSlotFrom !== "" && row.tokenInSlotTo !== undefined && row.tokenInSlotTo !== "")
                                    setOpen(true);
                                else
                                    e.preventDefault();
                            }}>Request For Token?</Link>}
                        {row.refStatus.code === "PMTTOK" && <InputLabel style={{
                            width: "10rem", height: "2rem",
                            color: "Black",
                            textAlign: "center",
                            display: "block",
                            marginTop: "2px",
                            backgroundColor: "#EE9B22",
                            border: "2px  #ccc",
                        }}>Pending for token</InputLabel>}
                        {(row.refStatus.code === "MTTOKASGN" || row.refStatus.code === "MT_DEL") && <> <img src="./download_doc.svg" onClick={() => onEtokenDownload(rowParent.referenceNumber, row.container_number, "MT IN")} /><Link onClick={() => onEtokenDownload(rowParent.referenceNumber, row.container_number, "MT IN")}>eToken</Link></>}
                      
                    </Grid>
                    </Grid>
                    
                    <Dialog
                        fullWidth={true}
                        open={open}
                        onClose={handleCloseForToken}
                        aria-labelledby="form-dialog-title"
                        
                    >
                        <DialogTitle id="form-dialog-title" style={{ backgroundColor: '#0E1B3D' }}>
                            Send for Token?
                          </DialogTitle>
                        <DialogContent>
                            
                            Would you like to save the selection of Truck done for this container and send it for token request?
                             
                          </DialogContent>
                        <DialogActions style={{ alignSelf: "center" }}>
                            <Button
                                onClick={() => {
                                
                                    RequestContainerService.requestForToken(row)
                                        .then((response) => {
                                            console.log("response from request token", response);
                                            setOpen(false);
                                            setTokenPopup(true);
                                            //  onSubmit();
                                        }).catch(() => {
                                            console.log("error");
                                        });
                                }}
                                style={{
                                    background: "#4CAB5B",
                                    color: "#fff",
                                    textTransform: "none",
                               
                                }}
                            >
                                Yes
                            </Button>
                            <Button
                                onClick={handleCloseForToken}
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
                    {tokenPopup && <TokenConfirmPopup onClose={handleCloseTokenConfirm} />}
                </StyledTableCell>

              
            </>
        )
    }
    if (dk.key === "mtDel" && tabSelected === "Delivered") {
        return (
            <>
                <StyledTableCell key={index} align="center">
                    <Grid container ><Grid item>
       
                        {(row.refStatus.code === "MT_DEL") && <> <Button style={{ textTransform: "none", fontStyle: "italic", backgroundColor: "#EE9B22", color: "white" }}
                            disabled={true}
                            variant="contained">Empty Delivered</Button></>}
      
                    </Grid>
                    </Grid>
                </StyledTableCell>
            </>)
    }

    if (dk.key === "mtTruck" && tabSelected === "Delivered") {
       
        return (
            <>
                  <FormProvider {...methods}>
                <StyledTableCell key={index} align="center">
                    <Grid container ><Grid item style={{width:"150px"}}>
                        {row.refStatus.code === "FCL_DEL" &&
                            // <FormControl style={{ marginTop: "3px" }}>
                 
                            // <NativeSelect
                            //     // value={truckNumber}
                            //     //labelId="demo-customized-select-label"
                            //     id="demo-customized-select"
                            //     input={<BootstrapInput />}
                            //     onChange={(e) => {
                            //         row.mtTruck = e.target.value;
                            //         console.log("rowwww", row);
                            //     }}
                            // >
                            //     {truckList.map((option: any, i: any) => {
                            //         return (
                            //             <option value={option.value} key={i}>
                            //                 {option.label}
                            //             </option>
                            //         );
                            //     })}
                            // </NativeSelect> 

                            // </FormControl>
                            <ApplnAutoCompleteAsync
                            name={"truck"}
                        label="Search by truck no"
                      
                        kvMapping={truckKVmapping}
                        remoteUrl={truckUrl}
                            // onChange={(e,value) => {
                            //            row.mtTruck = value.value;
                            //            console.log("rowwww", row);
                            //         }}
                                options={[]}
                                
                                iconColor=""
                                value=""
                                onSelect={(e:any) => {
                                    console.log("select for mt truck", e);
                                    row.mtTruck = e;
                                  }}
                          />
                        }
                        {(row.refStatus.code === "PMTTOK" || row.refStatus.code === "MTTOKASGN") &&
                            <InputLabel style={{fontSize:"14px",color:"#848484", textAlign: "left",marginTop:"25px"}}>{row.mtTruck}</InputLabel>
                        }
                    </Grid>
                    </Grid>
                    </StyledTableCell>
                    </FormProvider>
            </>
        )
    }
    if (dk.key === "timeInSlot" && tabSelected === "Delivered" && row.refStatus.code == "FCL_DEL") {
       
        return (
            <>
                <StyledTableCell1 key={index} align="center">
                 
                    <Grid container>
                        <Grid item xs={6} style={{ marginTop: "20px" }}>
                            <FormProvider {...methods}>
                                <ApplnDatePicker name={"dateTime"} label="" iconColor="#1FA5FF" value="" onChange={(e: any) => {
                                    row.tokenInDate = e;
                              
                                    console.log("selected date ::::", e);
                                }} />
                            </FormProvider>
                        </Grid>
                        <Grid item xs={1}>
                            <hr
                                style={{
                                    width: "0px",
                                    height: "50px",
                                    backgroundColor: "#D3D3D3",
                                }}
                            ></hr>
                        </Grid>

                        <Grid item xs={2}>
                            <TextField
                                id="fromTime"
                                type="time"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    size: "small",
                                }}
                                // defaultValue={container.tokenOutSlotFrom}
                                onChange={(event) => {
                                    setFromTime(event.target.value);
                                    row.tokenInSlotFrom =
                                        event.target.value;
                                    // validate(job);
                                    //  setFromDate(event.target.value);
                                }}
                            />
                            <TextField
                                id="toTime"
                                type="time"
                                size="small"
                                inputProps={{
                                    size: "small",
                                }}
                                //defaultValue={container.tokenOutSlotTo}
                                onChange={(event) => {
                                    setToTime(event.target.value);
                                    row.tokenInSlotTo = event.target.value;
                                    // validate(job);
                                    //  setFromDate(event.target.value);
                                    console.log("hahhahahahhahah", row);
                                }}
                            />
                        </Grid>
                    </Grid>
                      
                </StyledTableCell1>
            </>
        )
    }
    else if (dk.key === "timeInSlot" && tabSelected === "Delivered" && row.refStatus.code == "MTTOKASGN") {
        return (
            <>
                <CollapseTableCell key={index} align="center">{datastr}</CollapseTableCell>
            </>
        )
    } else if (dk.key === "timeInSlot" && tabSelected === "Delivered" && row.refStatus.code == "PMTTOK") {
        return (
            <>
                <CollapseTableCell key={index} align="center"></CollapseTableCell>
            </>
        )
    } else if (dk.key === "timeInSlot" && tabSelected === "Completed" ) {
        return (
            <>
                <CollapseTableCell key={index} align="center">{datastr}</CollapseTableCell>
            </>
        )
    } 

    if (dk.key === "mtTruck" && tabSelected === "Completed") {
        return (
            <>
                <CollapseTableCell key={index} align="center">{datastr}</CollapseTableCell>

            </>
        )
    }

    if (dk.key === "tokenIn" && tabSelected === "Delivered" && row.refStatus.code == "MTTOKASGN") {
        return (
            <>
                <CollapseTableCell key={index} align="center">{datastr}</CollapseTableCell>
            </>
        )
    } else  if(dk.key === "tokenIn" && tabSelected === "Delivered" && row.refStatus.code !== "MTTOKASGN") {
        return (
            <>
                <CollapseTableCell key={index} align="center"></CollapseTableCell>
            </>
        )
    } else if (dk.key === "tokenIn" && tabSelected === "Completed") {
        return (
            <>
                <CollapseTableCell key={index} align="center">{datastr}</CollapseTableCell>

            </>
        )
    }

    if (dk.key === "requestTimeInSlot" && tabSelected === "Delivered" && (row.refStatus.code == "MTTOKASGN" || row.refStatus.code == "PMTTOK")) {
        return (
            <>
                <CollapseTableCell key={index} align="center">{datastr}</CollapseTableCell>
            </>
        )
    }
   else if (dk.key === "requestTimeInSlot" && tabSelected === "Delivered" && (row.refStatus.code == "FCL_DEL" )) {
        return (
            <>
                <CollapseTableCell key={index} align="center"></CollapseTableCell>
            </>
        )
    }
}








const StatusDataTable: React.FC<TableProps> = ({ tableData, tableKeys, handleClick, actions = [], remote, remoteUrl, refresh, dataRootKey, collapsableTableKeys = [],
    collapseTableList, keyTest, tabSelected, page }) => {
    console.log("collapse table", tableKeys);
    const [dtstate, setdtstate] = useState({ rowsPerPage: 10, page: 0, sortColumn: null, currentPageRows: [], currentPageKey: [], collapseTableKey: [], count: 0 });
    const [alertOpen, setAlertOpen] = useState({ isopen: false, errorMsg: "" });
    const [loading, setLoading] = useState(false);
    const [reRender, setReRender] = useState(0);
    const [headerChecked, setHeaderChecked] = useState(false);
    const [open, setOpen] = useState(false);
    const [tableData1, setTableData1] = useState([]);
    const [truckList, setTruckList] = useState([]);



    useEffect(() => {


        loadDatTable();


    }, [reRender]);


    useEffect(() => {
        setdtstate((prevState) => ({
            ...prevState,
            currentPageKey: [],
            refresh: refresh,
            page: 0,
            rowsPerPage: 10,
            currentPageRows: [],
            collapseTableKey: []
        }));
        loadDatTable();
    }, [refresh]);

    useEffect(() => {


       // loadTruckOptions();


    }, []);

    const onSubmit = () => {
        setReRender(reRender + 1);
    }
    const updateAlertState = (status: boolean, msg: string) => {
        setAlertOpen({
            isopen: status,
            errorMsg: msg
        })
    }

    const setCurrentSortColumn = () => {
        let sortEle = tableKeys.filter((tk) => {
            return (tk.sort === true && tk.sortActive === true)
        })


        setdtstate((prevState) => ({
            ...prevState,
            sortColumn: sortEle[0]
        }));
    }

    const loadDatTable = () => {

        setCurrentSortColumn();
        if (remote !== true) {

            setdtstate((prevState) => ({
                ...prevState,
                currentPageKey: tableKeys,
                refresh: refresh,
                page: 0,
                rowsPerPage: 10,
                currentPageRows: getPageData(0, 1, 10),
                collapseTableKey: collapsableTableKeys


            }));
        } else {
            // 'https://jsonplaceholder.typicode.com/users'

            if (remoteUrl === '' || remoteUrl.trim() === '')
                return;

            loadHttp(remoteUrl,0);


        }

    }

    const loadTruckOptions = async () => {
        const transporterCode="";
       
            AssignTruckAndDriverService.fetchTrucksForTransporter(transporterCode)
                .then((response) => {
                    console.log("trucklist:::::;::", response);
                setTruckList(response);
                
              })
              .catch(() => {
                console.log("error");
              });
         
    }

   

    const loadHttp = (remoteUrl: any, pageNumber?:number, pageSize = dtstate.rowsPerPage) => {
        setLoading(true);
        let fnUrl = '';
        let pageNo=pageNumber;
        if (remoteUrl.indexOf('?') === -1) {
            fnUrl = remoteUrl + '?pgNo=' + pageNo + '&pgSize=' + pageSize;
        } else {
            fnUrl = remoteUrl + '&pgNo=' + pageNo + '&pgSize=' + pageSize;
        }

        getHttp({ url: fnUrl }, false).then(e => {

            let remoteData = e;
            console.log("eeeeee", e);
            //countData(remoteData.count);
            if (dataRootKey && dataRootKey !== '') {
                let keyEle = 'e.' + dataRootKey;
                remoteData = eval(keyEle);
                console.log("remote Data::", remoteData);
                // setTableData1(remoteData);
            }
            setdtstate((prevState) => ({
                ...prevState,
                currentPageKey: tableKeys,
                refresh: refresh,
                page: pageNo,
                rowsPerPage: 10,
                currentPageRows: remoteData,
                collapseTableKey: collapsableTableKeys,
                count: e.totalElements

            }));


            setLoading(false);

        }).catch(error => {
            updateAlertState(true, error);
            setLoading(false);

        })
    }

    const handleSort = (scol: any) => {

        if (scol.id === dtstate.sortColumn.id) {
            if (scol.dir === 'asc')
                scol.dir = 'dsc';
            else
                scol.dir = 'asc';
        } else {
            scol.dir = 'asc';
        }

        let fnlUrl = null;
        if (remoteUrl.indexOf('?') === -1)
            fnlUrl = remoteUrl + '?sortCol=' + scol.id + '&sortOrder=' + scol.dir;
        else
            fnlUrl = remoteUrl + '&sortCol=' + scol.id + '&sortOrder=' + scol.dir;

        loadHttp(fnlUrl, 0, 10);
    }




    const getCollapseTableHeadRow = ({ dk, index, row }: any) => {

        // if (dk.type === COLUMN_TYPE_STRING)
        if ( dk.key === 'mtDel') {
            return (
                <CollapseTableCell key={index} align="center" >
                </CollapseTableCell>
            )
        }
        else {
            return (

                <CollapseTableCell key={index} align="center" >{dk.name}
                </CollapseTableCell>

            )
        }

    }



    const getPageData = (currentPage: number, nextPage: number, rowsPerPage: number) => {
        console.log("currentPage::", currentPage);
        console.log("nextPage::", nextPage);
        console.log("rowsPerPage::", rowsPerPage);
        return (tableData.slice((currentPage) * rowsPerPage, (nextPage) * rowsPerPage));

    }
    const handleChangePage = (event: any, newpage: number) => {
        console.log("called handleChangePage");
        if (remote !== true) {
            setdtstate((prevState) => ({
                ...prevState,
                page: newpage,
                currentPageRows: getPageData(newpage, newpage + 1, dtstate.rowsPerPage)
            }));
        } else {
            setdtstate((prevState) => ({
                ...prevState,
                page: newpage
            }));
            loadHttp(remoteUrl, newpage);
        }



    }

    const handleChangeRowsPerPage = (event: any) => {
        console.log("called handleChangeRowsPerPage");

        if (remote !== true) {
            setdtstate((prevState) => ({
                ...prevState,
                refresh: refresh,
                page: 0,
                rowsPerPage: event.target.value,
                currentPageRows: getPageData(0, 1, event.target.value)
            }));
        } else {
            let fnlUrl = remoteUrl + '?pageNo=1&pageSize=' + event.target.value;
            loadHttp(fnlUrl);
        }




    }

    // const classes = useStyles();


    const mapCollapseTableList = (row: any, tabSelected: string, open1: boolean) => {


        let rd = 'row.' + collapseTableList;
        let rk = 'row.' + keyTest;
        let datastr = eval(rd);
        let keystr = eval(rk);

        const onSubmit = () => {
            setReRender(reRender + 1);
        }

        return (
            datastr.map((row1: any, ind: any) => (

                <InnerTableRow>

                    {dtstate.collapseTableKey.map((dk) => (

                        <CollapseTableRow dk={dk} row={row1} keystr={keystr} tabSelected={tabSelected} rowParent={row} truckList={truckList} onSubmit={onSubmit}/>

                    ))}

                </InnerTableRow>
            )
            )

        )


    }





    function CollapseRow({ row, extIndex, page,onSubmit }: any) {

        const [open, setOpen] = React.useState(false);
        const [allChecked, setAllChecked] = React.useState(false);
        const [open1, setOpen1] = React.useState(false);
        console.log("ddddddd", onSubmit);

        return (
            <>

                <HeaderTableRow key={extIndex}  >




                    {dtstate.currentPageKey.map((dk, index) => (
                        <GetTableRow dk={dk} row={row} index={index} page={page} tabSelected={tabSelected} onSubmit={onSubmit}/>
                    ))

                    }
                    {actions.length > 0 ?
                        <TableCell align="right" style={{ width: '120px' }}>
                            {
                                actions.map((act, x) => (

                                    <Tooltip key={x} title={act.tip} placement="top" arrow>
                                        <IconButton key={x} style={{ padding: "0px" }}
                                            onClick={() => {
                                                //setOpen(!open)
                                                row.openCollapsePanel = !row.openCollapsePanel
                                                setOpen(row.openCollapsePanel);

                                            }

                                            }

                                        >
                                            {!row.openCollapsePanel && <img src="./plus.svg" />}
                                            {row.openCollapsePanel && <Icon style={{ color: act.color }}>{act.icon1}</Icon>}
                                        </IconButton>


                                    </Tooltip>

                                ))
                            }
                        </TableCell>
                        : null}
                </HeaderTableRow>

                <TableRow >
                    {open && <InnerTable colSpan={9} >
                        <StyledCollapse in={open} timeout="auto" unmountOnExit >

                            {/* <Box margin={1}  style={{ maxHeight: 150 }}> */}
                            <StyledTableContainer style={{ maxHeight: 200 }}>
                                <Table stickyHeader >
                                    <TableHead>
                                        <TableRow>
                                            {dtstate.collapseTableKey.map((dk, index) => {

                                                return getCollapseTableHeadRow({ dk, index, row })
                                            }
                                            )}



                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            mapCollapseTableList(row, tabSelected, open1)
                                        }
                                    </TableBody>
                                </Table>
                            </StyledTableContainer>
                        </StyledCollapse>
                    </InnerTable>}
                </TableRow>




            </>
        )


    }


    return (

        <>

            <AlertDialog isopen={alertOpen.isopen} message={alertOpen.errorMsg} onClose={(e: any) => {
                updateAlertState(false, '');

            }} />

            {loading || (dtstate.currentPageRows && dtstate.currentPageRows.length > 0) ?
                <div className="main-table-div">
                    {loading && <CircularProgress className="dtable-loader" />}
                    {loading && <div className="dtable-overlay"></div>}
                    {/* <Paper style={{ padding: "20px", marginBottom: "20px" }}>  */}
                    <TableContainer >
                        <SpacedTable>

                            <TableBody >
                                {dtstate.currentPageRows.map((row, extIndex) => (

                                    <CollapseRow key={extIndex} row={row} extIndex={extIndex} page={page} onSubmit={onSubmit} />


                                ))}
                            </TableBody>

                        </SpacedTable>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[]}
                        colSpan={3}
                        component="div"
                        count={dtstate.count}
                        rowsPerPage={dtstate.rowsPerPage}
                        page={dtstate.page}
                        backIconButtonProps={{ id: 'backId' }}
                        onChangePage={handleChangePage}
                        nextIconButtonProps={{ id: 'nextId' }}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    {/* </Paper>  */}
                </div>
                : (<Paper elevation={5} style={{ borderRadius: 8, padding: '30px', marginTop: 20, minWidth: '760px', minHeight: '100px', color: '#FF7171' }}>
                <Grid container direction="row" spacing={5}>
                  <Grid item sm={12} xs={12}>
                    <Typography variant="subtitle1" style={{ fontSize: '16px', textAlign: 'center' }}>
                      <b>{'No records found'}</b></Typography>
                  </Grid>
                </Grid>
              </Paper>)}
        </>
    );


}

export default React.memo(StatusDataTable);