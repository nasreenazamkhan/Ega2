import React, { useState, useEffect } from 'react';
import { makeStyles,withStyles, createStyles, Theme } from '@material-ui/core/styles';
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
import { getHttp } from '../../common/HttpService';
import Collapse from '@material-ui/core/Collapse';
import Link from '@material-ui/core/Link';
import ConfirmDialog from '../dialog/confirmDialog';
import Avatar from '@material-ui/core/Avatar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { postHttp } from '../../common/HttpService';
import ContactDetails from '../../../components/request/ContactDetails';
import Badge from '@material-ui/core/Badge';
import Track from '../../../components/stepper/Track';
import { Paper ,Typography} from "@material-ui/core";
import CommonService from "../../../service/CommonService";
import ReInitiatePopup from '../../../components/request/ReInitiatePopup';
import CloseIcon from "@material-ui/icons/Close";
import "../../../assets/styles.css"; 
import * as EndpointContants from '../../../utils/ptmsEndpoints';
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
            backgroundColor: '#F9F9F9',
            boxShadow: '0px 0px 6px 0px #00000045'
        }
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
            textAlign: 'left',
            borderBottom: '1px solid #CECECE'
        },
    }),
)(TableCell);
const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        root: {
height:"81px"
        },
        head: {
            color: '#808080',
            fontSize:"16px !important"
        },
        body: {
            whiteSpace: 'nowrap',
	        fontSize:"16px !important",
            color: '#808080'
        },
    }),
)(TableCell);

const StyledTableCell1 = withStyles((theme: Theme) =>
    createStyles({
        root: {
            height: "81px",
            marginTop: "0px !important",
            marginBottom: "0px !important",
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
            color: '#808080'
        },
    }),
)(TableCell);

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

const useStyles3 = makeStyles({
    root: {
        background: '#73BF7E',
        color: '#fff',
        textTransform: 'none',
        
      }
    
});

const useStyles2 = makeStyles({
    root: {
        background: '#E95A57',
        color: '#fff',
        textTransform: 'none',
        
      }
    
});

function GetTableRow({ dk, row, index, page, tabSelected ,userType}: any) {
    const [drawer, setDrawer] = useState(false);
    const [trackPopup, setTrackPopup] = useState(false);
    const [truckTypeDrawer, setTruckTypeDrawer] = useState(false);
    const [steps, setSteps] = useState([]);
    const [reInitiatePopup, setReInitiatePopup] = useState(false);
//     const classes = useStyles1();
//    const classes1 = useStyles2();
    console.log("data table row::::", row);
    let rd = 'row.' + dk.key;
    let datastr = '';
    if (dk.key !== "truckList")
        datastr = eval(rd);
    console.log("dk.key", dk.key);
    console.log("datastr", datastr);
    // let history = useHistory();


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
            <Table >{/**size="small" style={{ width: "320px", marginLeft: "12px" }} */}
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
        console.log("anchor and row", row),
        <div>
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
        <>
        <div>
            <br></br>
            <InputLabel
                style={{  color: "grey", marginLeft: "15px" ,fontSize: "20px",}}
                
            >
                {" "}
         Truck Details
        </InputLabel>
                <div >
                    <CloseIcon fontSize="large" className="rightAlign" onClick={() => {
                        setTruckTypeDrawer(false);
                    }}/>
            </div>
            <br></br>
            <Divider></Divider>
            <br></br>
            <Table 
              size="small" style={{ width: "320px", marginLeft: "12px" }}
             >
                <TableHead>
                    <Paper elevation={0} style={{ marginTop: "5px" }}>
                        <TableRow>
                            <TableCell style={{ color: "grey" }}>{/**style={{ fontSize: "13px", color: "grey" }} */}
                                Type
                </TableCell>
                            <TableCell style={{ color: "grey" }}>{/**style={{ fontSize: "13px", color: "grey" }} */}
                                Drop Time
                </TableCell>

                        </TableRow>
                    </Paper>
                </TableHead>
                <TableBody>
                    {truckList.map((truck: any, ind: any) => (
                        <TableRow>
                            <Paper variant="outlined" style={{ marginTop: "5px" }}>
                                <TableCell style={{ color: "grey" }}>{/**style={{ fontSize: "13px", color: "grey" }} */}
                                    {truck.vehicleName}
                                </TableCell>
                                <TableCell style={{ color: "grey" }}>{/**style={{ fontSize: "13px", color: "black" }} */}
                                    {truck.dateAndTime}
                                </TableCell>

                            </Paper>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
         
            
            </>
    );

    if (dk.key === 'downloadReciept') {
        return (
            <>
                <StyledTableCell1 key={index} align="center">{row.statusCode === "SUCC" && <Grid container spacing={1} >
                        <Grid item xs={12} ><Link
                    style={{textDecoration:"underline",fontSize:"16px"}}
                    component="button"
                    onClick={() => {
                        CommonService.downloadReceipt(row.bookingNumber);
                    }}

                    >DOWNLOAD RECEIPT</Link></Grid>
                      <Grid item xs={12}>
                <Link
                    style={{textDecoration:"underline",fontSize:"16px"}}
                    component="button"
                    onClick={() => {
                        CommonService.downloadInvoice(row.bookingNumber);
                    }}

                >DOWNLOAD INVOICE</Link></Grid></Grid>}
                    {row.statusCode==="PPAY" && <InputLabel>PENDING PAYMENT</InputLabel>}
                     {row.statusCode==="FPAY" && <><Link
                        component="button"
                        style={{fontSize:"16px",color:"#EA2428",textDecoration:"underline"}}
                    onClick={() => {
                        setReInitiatePopup(true);
                        
                    }}

                    > PAYMENT FAILED</Link>
                        {reInitiatePopup && <ReInitiatePopup row={row} onReinitiateClose={() => {setReInitiatePopup(false); }}/>}
                        </>
                    }
                </StyledTableCell1>
            </>
        )
    } else if (dk.key === 'truckList') {
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
        } else {
            return (
                <StyledTableCell key={index} align="center">
                </StyledTableCell>
            )
        }
    }else {
        return (
            <>

                <StyledTableCell key={index} align="center">
                    <Grid item xs={2}>{dk.name} </Grid>
                    <Grid item xs={2} style={{ fontWeight: 'bold' ,color:'black'}}>{datastr} </Grid>
                </StyledTableCell>



            </>
        )
    }

}

function CollapseTableRow({ dk, row, index, tabSelected, rowParent ,onSubmit,userType}: any) {
    const [showPopup, setShowPopup] = useState(NO_DIALOG);
    const [viewPopup, setViewPopup] = useState(false);
    const [trackPopup, setTrackPopup] = useState(false);
    const [showToaster, setShowToaster] = useState(null);
    // const classes = useStyles1();
     const classes1 = useStyles2();
     const classes2 = useStyles3();
    const [steps, setSteps] = useState([]);
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    const [render, setRender] = useState(0);
    // const [message, setMessage] = useState(["Kindly note the number for future communication", "Order Number #", rowParent.referenceNumber, " The job will be marked under delivered status, only if POD is approved by Admin"])
    // const popUpParams = { uploadType: "POD", referenceNumber: row.container_number, message: message, dpwTransactionId: row.dpwTransactionId, boeNumber: row.boeNumber }
    var clos = "YES";
    const [state, setState] = React.useState({

        right: false,
    });

    let rd = 'row.' + dk.key;
    let datastr = eval(rd);
    let showToast = false;
    let view = false;
    let track = false;
        const openPopup = () => {
        console.log("Delivered clicked");
        setShowUploadPopup(true);
        setRender(render + 1);

    };

    const handleClose = () => {
        setShowUploadPopup(false);

    };

    const land = () => {
        tabSelected = "Delivered";
    }


    const list = (anchor: any, row: any) => (
        <div
            // className={clsx(classes.list, {
            //     [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            // })}
           style={{width:"394px"}} 
        >
        <ContactDetails createEditFormData={row} onConfirm={() => {
            setViewPopup(false);
            onSubmit();
        }} />
        <div>
        <CloseIcon fontSize="large" className="rightAlign" onClick={() => {
                        setViewPopup(false);
                }}/>
        </div>
        </div>
        
    );

    const list1 = (anchor: any, row: any) => (
        <div
          style={{width:"450px"}}
        >
        <div >
        <CloseIcon fontSize="large" className="rightAlign" onClick={() => {
                setTrackPopup(false);
        }}/>
        </div>
        <br></br>
        <InputLabel
            style={{ fontSize: "24px", color: "#434343", marginLeft: "26px" }}
        >
        {" "}
        Tracking Details for {row.container_number}
        </InputLabel>
                
            <br></br>
            <Divider></Divider>
            <br></br>
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
                        let step = [];
                        if (tabSelected === 'Pending') {
                            let truckAssigned = "";
                            let truckAssignedBy = "";
                            row.containerTrackList.map((track: any) => {
                                if (track.status === 'PTOK') {
                                    truckAssigned = track.actionDateAndTime;
                                    truckAssignedBy = track.createdBy;
                                }
                                })
                            step.push("Booked on " + row.bookingDate.split(" ")[0] + " at " + row.bookingDate.split(" ")[1]);
                            {row.refStatus.code==="PTOK" && step.push("Job accepted by transporter and pending for token")}
                            setSteps(step);
                        }
                        if (tabSelected === "Confirmed") {
                            let truckAssigned = "";
                            row.containerTrackList.map((track: any) => {
                                if (track.status === 'PTOK')
                                    truckAssigned = track.actionDateAndTime;
                                })
                            step.push("Booked on " + row.bookingDate.split(" ")[0]+" at "+row.bookingDate.split(" ")[1]);
                            step.push("truck assigned on "+truckAssigned.split(" ")[0]+" at "+truckAssigned.split(" ")[1]);
                            setSteps(step);
                        }
                        if (tabSelected === "In Progress") {
                            let truckAssigned = "";
                            let jobStarted = "";
                            {
                                row.containerTrackList.map((track: any) => {
                                    if (track.status === 'PTOK')
                                        truckAssigned = track.actionDateAndTime;
                                    if (track.status === 'INPRO')
                                        jobStarted = track.actionDateAndTime;
                                })
                            }
                            console.log("rowwww", row);
                            step.push("Booked on " + row.bookingDate.split(" ")[0]+" at "+row.bookingDate.split(" ")[1]);
                            step.push("truck assigned on " + truckAssigned.split(" ")[0]+" at "+truckAssigned.split(" ")[1]);
                            step.push("Job started on " + jobStarted.split(" ")[0]+" at "+jobStarted.split(" ")[1]);
                            setSteps(step);
                        }
                        if (tabSelected === "Delivered") {
                            let truckAssigned = "";
                            let jobStarted = "";
                            let podSubmitted = "";
                            let delivered = "";
                            {
                                row.containerTrackList.map((track: any) => {
                                    if (track.status === 'PTOK')
                                        truckAssigned = track.actionDateAndTime;
                                    if (track.status === 'INPRO')
                                        jobStarted = track.actionDateAndTime;
                                    if (track.status === "PODUPL")
                                        podSubmitted = track.actionDateAndTime;
                                    if (track.status === "FCL_DEL")
                                    delivered = track.actionDateAndTime;
                                })
                            }
                            console.log("rowwww", row);
                            step.push("Booked on " + row.bookingDate.split(" ")[0]+" at "+row.bookingDate.split(" ")[1]);
                            step.push("truck assigned on " + truckAssigned.split(" ")[0]+" at "+truckAssigned.split(" ")[1]);
                            step.push("Job started on " + jobStarted.split(" ")[0]+" at "+jobStarted.split(" ")[1]);
                            step.push("POD Submitted " + podSubmitted.split(" ")[0]+" at "+podSubmitted.split(" ")[1]);
                            step.push("Delivered on " + delivered.split(" ")[0]+" at "+delivered.split(" ")[1]);
                           
                            setSteps(step);
                        }

                        if (tabSelected === "Completed") {
                            let truckAssigned = "";
                            let jobStarted = "";
                            let podSubmitted = "";
                            let delivered = "";
                            let completed = "";
                            {
                                row.containerTrackList.map((track: any) => {
                                    if (track.status === 'PTOK')
                                        truckAssigned = track.actionDateAndTime;
                                    if (track.status === 'INPRO')
                                        jobStarted = track.actionDateAndTime;
                                    if (track.status === "PODUPL")
                                        podSubmitted = track.actionDateAndTime;
                                    if (track.status === "FCL_DEL")
                                        delivered = track.actionDateAndTime;
                                    if (track.status === "COMPL")
                                        completed = track.actionDateAndTime;
                                })
                            }
                            console.log("rowwww", row);
                            step.push("Booked on " + row.bookingDate.split(" ")[0]+" at "+row.bookingDate.split(" ")[1]);
                            step.push("truck assigned on " + truckAssigned.split(" ")[0]+" at "+truckAssigned.split(" ")[1]);
                            step.push("Job started on " + jobStarted.split(" ")[0]+" at "+jobStarted.split(" ")[1]);
                            step.push("POD Submitted " + podSubmitted.split(" ")[0]+" at "+podSubmitted.split(" ")[1]);
                            step.push("Delivered on " + delivered.split(" ")[0]+" at "+delivered.split(" ")[1]);
                            step.push("Empty container back in yard " + completed.split(" ")[0]+ " at "+completed.split(" ")[1]);
                            setSteps(step);
                        }
                    }}
                ><img src='./truck.svg' /></IconButton></CollapseTableCell>

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

    } if (dk.key === "action") {
        if (tabSelected === "Pending") {
            return (
                <>
                    <CollapseTableCell key={index} align="center">
                        <Grid container style={{paddingTop: "5px !important"}}>
                            <Grid item xs={6}>
                                <Link
                                    component="button"
                                variant="body2"
                                    style={{ fontSize:"14px",textDecoration:"underline",marginTop:"15px"}}
                                    onClick={() => {
                                        setViewPopup(true);
                                        view = true;
                                    }}
                                >View</Link> 
                            </Grid>
                        {rowParent.statusCode !== "PPAY" && 
                            <Grid item xs={6} >
                                
                                   
                                        <Link
                                            component="button"
                                            variant="body2"
                                            style={{ fontSize:"14px",textDecoration:"underline",marginTop:"15px",color:"#C62926"}}
                                        onClick={() => {
                                            setShowPopup(CONFIRM_DIALOG);
                                        }}>Cancel</Link>
                                <Tooltip title="Cancellation Policy" arrow>
                                    <Badge badgeContent={<img  src='./info.svg' style={{height:"6px",width:"6px"}}/>} >
                                        </Badge>
                                       
                                </Tooltip>
                            </Grid>
                        }{rowParent.statusCode === "PPAY" && 
                            <Grid item xs={6} >
                                <Tooltip title="Cancellation Policy" arrow>
                                    <Badge badgeContent={<img  src='./info.svg' style={{height:"6px",width:"6px",marginTop:"30px"}}/>}>
                                        <Link style={{ color: "grey", fontSize:"14px",textDecoration:"underline",marginTop:"15px" }}
                                        component="button"
                                        >Cancel</Link>
                                    </Badge>
                                </Tooltip>
                            </Grid>
                        }
                        </Grid>
                    </CollapseTableCell>
                    <ConfirmDialog isopen={showPopup === CONFIRM_DIALOG} closeTxt={"No"} confirmTxt={"Yes"} title={"Attention!"} 
                          closeButtonCss={
                            classes1.root
                         } confirmButtonCss={classes2.root}
                    
                      onClose={() => {
                        console.log("closed", row);
                        setShowPopup(NO_DIALOG);

                    }} onConfirm={() => {
                        row.refStatus.code = 'CNCL'
                        console.log("confirmed", row);
                        const remoteUrl = `${EndpointContants.cancelContainer}`;
                        
                        let obj = {
                            url: remoteUrl,
                            body: row
                        };
                        postHttp(obj, true).then(response => {


                            console.log("calling toaster", showToaster);
                            
                            clos = "NO";
                        setShowPopup(NO_DIALOG);
                        onSubmit();
                            //setPstate(pstate + 1);
                        })
                            .catch(error => {
                                // const errMsg = error.message;
                                // dispatch(fetchUserFailure(errMsg));
                            })
                            setShowToaster(true);
                        

                        }}><p>Are you sure to cancel the booking for this item</p>
                        <p>Please view our cancellation policy</p>
                       </ConfirmDialog>
                       {
                          showToaster &&  <SuccessToast
                            icon="check_circle"
                            title="Booking cancelled successfully"
                            message=""
                            showToast={()=>{setShowToaster(false)}}
                            position="top-right"
                          />}
                    <SwipeableDrawer
                        anchor='right'
                        open={viewPopup}
                        onClose={() => {
                            setViewPopup(false);

                        }}
                        onOpen={() => {
                            setViewPopup(true);

                        }}
                    >
                        {list('right', row)}
                    </SwipeableDrawer>
                 
                    
                </>
            )
        } else {
            return (
                <>
                    <CollapseTableCell key={index} align="center"><Link style={{ fontSize:"14px",textDecoration:"underline"}}
                        component="button"
                        variant="body2"
                        onClick={() => {
                            setViewPopup(true);
                            //setState({ ...state, [right]: true });
                            console.log("view clicked");
                            view = true;
                        }}
                    >View</Link></CollapseTableCell>
                    <SwipeableDrawer
                        anchor='right'
                        open={viewPopup}
                        onClose={() => {
                            setViewPopup(false);

                        }}
                        onOpen={() => {
                            setViewPopup(true);

                        }}
                    >
                        {list('right', row)}
                    </SwipeableDrawer>
                </>
            )
        }
    } if (dk.key === "date_time") {
        if (row.multiLocFlag === "N") {
            return (
                <>
                    <CollapseTableCell key={index} align="center"></CollapseTableCell>
                </>
            )
        } else {
            return (
                <CollapseTableCell key={index} align="center">{datastr}</CollapseTableCell>
            )
        }

    }
    if (dk.key === "refVehicleTypeName") {
        if (row.multiLocFlag === "N") {
            return (
                <>
                    <CollapseTableCell key={index} align="center"></CollapseTableCell>
                </>
            )
        } else {
            return (
                <CollapseTableCell key={index} align="center">{datastr}</CollapseTableCell>
            )
        }

    }
    if (dk.key === "consigneeDetails") {
        if (userType === "IMPORTER") {
            return (
                <>
                    <CollapseTableCell key={index} align="center"></CollapseTableCell>
                </>
            )
        
        } else {
            return (
                <CollapseTableCell key={index} align="center">{datastr}</CollapseTableCell>
            )
        }
    }
     if (!(dk.key === "action") && !(dk.key === "track") && !(dk.key === "actions") && !(dk.key === "etoken") && !(dk.key === "pods") && !(dk.key === "mtetoken") && !(dk.key === "mtTruck") && !(dk.key === "consigneeDetails")) {
        return (
            <>
                <CollapseTableCell key={index} align="center">{datastr}</CollapseTableCell>

            </>
        )

    }
 
}


const ViewRequestDataTable: React.FC<TableProps> = ({tableData, tableKeys, remote, remoteUrl, refresh, dataRootKey, collapsableTableKeys = [], page, 
    actions = [], collapseTableList, keyTest, tabSelected,userType/*, handleClick */}) => {
    const [dtstate, setdtstate] = useState({ rowsPerPage: 10, page: 0, sortColumn: null, currentPageRows: [], currentPageKey: [], collapseTableKey: [], count: 0 });
    const [alertOpen, setAlertOpen] = useState({ isopen: false, errorMsg: "" });
    const [loading, setLoading] = useState(false);
    const [reRender, setRerender] = useState(0);
 
    // const [headerChecked, setHeaderChecked] = useState(false);
    // const [open, setOpen] = useState(false);
    // const [tableData1, setTableData1] = useState([]);
   // const status = useSelector((state:any) => state.loginUser.errorMsg);
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
            if (remoteUrl === '' || remoteUrl.trim() === '')
                return;
            loadHttp(remoteUrl,0);
        }
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
           console.log("caught",error);
          //  return <div> {error?.response?.statusText}</div>
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
    const getCollapseTableHeadRow = ({ dk, index, row ,userType}: any) => {

        // if (dk.type === COLUMN_TYPE_STRING)
        if (row.multiLocFlag === "N" && dk.key === 'date_time') {
            return (
                <CollapseTableCell key={index} align="center" >
                </CollapseTableCell>
            )
        }else if (row.multiLocFlag === "N" && dk.key === 'refVehicleTypeName') {
            return (
               
                <CollapseTableCell key={index} align="center" >
                </CollapseTableCell>
            )
        } else if (dk.key === 'consigneeDetails') {
            if (userType === "IMPORTER") {
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
        
        else {
            return (

                <CollapseTableCell key={index} align="center" >{dk.name}
                </CollapseTableCell>

            )
        }

    }
    const getPageData = (currentPage: number, nextPage: number, rowsPerPage: number) => {
        return (tableData.slice((currentPage) * rowsPerPage, (nextPage) * rowsPerPage));

    }

    const handleChangePage = (event: any, newpage: number) => {
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
    const mapCollapseTableList = (row: any, tabSelected: string, open1: boolean,userType:string) => {
        let rd = 'row.' + collapseTableList;
        let rk = 'row.' + keyTest;
        let datastr = eval(rd);
        let keystr = eval(rk);
        const onSubmit = () => {
            setRerender(reRender + 1);
        }
        return (
            datastr.map((row1: any, ind: any) => (
                <TableRow>
                    {dtstate.collapseTableKey.map((dk) => (
                        <CollapseTableRow dk={dk} row={row1} keystr={keystr} tabSelected={tabSelected} rowParent={row} userType={userType} onSubmit={onSubmit} />
                    ))}
                </TableRow>
            )
            )

        )


    }
    function CollapseRow({ row, extIndex, page,userType }: any) {
        const [open, setOpen] = React.useState(row.openCollapsePanel);
        const [allChecked, setAllChecked] = React.useState(false);
        const [open1, setOpen1] = React.useState(false);
        return (
            <>
                <HeaderTableRow key={extIndex}  >
                    {dtstate.currentPageKey.map((dk, index) => (
                        <GetTableRow dk={dk} row={row} index={index} page={page} tabSelected={tabSelected} userType={userType}/>
                    ))
                    }
                    {actions.length > 0 ?
                        <TableCell align="right" style={{ width: '120px' }}>
                            {
                                actions.map((act, x) => (

                                    <Tooltip key={x} title={act.tip} placement="top" arrow>
                                        <IconButton key={x} style={{ padding: "0px" }}
                                            onClick={() => {
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

                                                return getCollapseTableHeadRow({ dk, index, row,userType })
                                            }
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            mapCollapseTableList(row, tabSelected, open1,userType)
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
        {loading || (dtstate.currentPageRows && dtstate.currentPageRows.length > 0) ?
            <div >
                {loading && <CircularProgress  />}
                {loading && <div ></div>}
        <TableContainer >
            <SpacedTable>
                <TableBody >
                    {dtstate.currentPageRows.map((row, extIndex) => (
                        <CollapseRow key={extIndex} row={row} extIndex={extIndex} page={page} userType={userType}/>
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
      </div>
            :  (<Paper elevation={5} style={{ borderRadius: 8, padding: '30px', marginTop: 20, minWidth: '760px', minHeight: '100px', color: '#FF7171' }}>
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



export default React.memo(ViewRequestDataTable);