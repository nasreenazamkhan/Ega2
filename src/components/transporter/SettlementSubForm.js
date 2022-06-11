import React, { useEffect, useState } from "react";
import { Card } from "@material-ui/core/";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ApplnFileUpload from "../../lib/components/fileupload/ApplnFileUpload";
import { OTHER_POPUP, NO_DIALOG } from "../../lib/common/Constants";
import StartJobPopup from "./StartJobPopup";
import Box from "@material-ui/core/Box";
import { InputLabel } from "@material-ui/core";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  CardContent,
  Typography,
  Paper,
  IconButton,
  Icon,
  Grid,
} from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import clsx from "clsx";
import { postHttp } from "../../lib/common/HttpService";
import TableHead from "@material-ui/core/TableHead";
import { useHistory } from "react-router-dom";
import JobService from "../../service/JobService";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  leftPane: {
    width: "60%",
  },
  rightPane: {
    width: "40%",
  },
  matCell: {
    fontSize: "14px",
    height: "200px",
    textAlign: "center",
    borderRight: "1px solid #D0D0D0",
    width: "60%",


opacity: 1
  },
  matCell1: {
    fontSize: "14px",
    height: "200px",
    textAlign: "center",
  //  borderRight: "1px solid #D0D0D0",
    width: "40%",
  },
});





const defaultProps1 = {
  m: 1,
  style: { width: "20rem", height: "5rem" },
  color: "black",
  textAlign: "center",
  align: "center",
  marginLeft: "120px",
  marginTop: "1px",
  marginBottom: "50px",
  border: "2px dashed #ccc",
};



const StyledTableheader = withStyles({
  root: {
    
    width: 100,
  
  },
})(MuiTableCell);

const StyledTableCell = withStyles({
  root: {
 
    width: 100,
  
  },
})(MuiTableCell);

const StyledLabel = withStyles({
  root: {
    fontSize: "12px",
    color: "#777777",
  },
})(InputLabel);

const StyledInputLabel = withStyles({
  root: {
    color: '#848484' ,
    whiteSpace:'nowrap'
  },
})(InputLabel);

const StyledLabelData = withStyles({
  root: {
    fontSize: "10px",
    color: "#000000",
   
  },
})(InputLabel);

function SettlementSubForm(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [render, setRender] = useState(0);
  const classes = useStyles();
  const [viewPopup, setViewPopup] = useState(false);
  const [containerList, setContainerList] = useState([]);
  const [job, setJob] = useState(props.job);
  let history = useHistory();
  

  useEffect(() => {}, []);

  const list = (anchor) => (
    <div>
      <br></br>
      <InputLabel
        style={{ fontSize: "20px", color: "grey", marginLeft: "15px" }}
      >
        {" "}
        Container Details
      </InputLabel>
      <br></br>
      <Divider></Divider>
      <br></br>
      <Table size="small" style={{ width: "300px", marginLeft: "12px" }}>
        <TableHead>
         
            <TableRow>
              <StyledTableheader>
                <StyledLabel> Container Number</StyledLabel>
              </StyledTableheader>
              <StyledTableheader>
                <StyledLabel> ISO Code</StyledLabel>
              </StyledTableheader>
              <StyledTableheader>
                <StyledLabel> Pick Up</StyledLabel>
              </StyledTableheader>
              <StyledTableheader>
                <StyledLabel> Token Out</StyledLabel>
              </StyledTableheader>
              <StyledTableheader>
                <StyledLabel> Token Out Date</StyledLabel>
              </StyledTableheader>
              <StyledTableheader>
                <StyledLabel> Token In </StyledLabel>
              </StyledTableheader>
              <StyledTableheader>
                <StyledLabel> Token In Date</StyledLabel>
              </StyledTableheader>
            </TableRow>
        
        </TableHead>
        <TableBody>
          {job.requestContainerList.map((container, ind) => (
            <TableRow>
            
                <StyledTableCell><StyledLabelData>{container.container_number}</StyledLabelData></StyledTableCell>
                <StyledTableCell><StyledLabelData>{container.iso_code}</StyledLabelData></StyledTableCell>
                <StyledTableCell><StyledLabelData>{container.pickupLocation}</StyledLabelData></StyledTableCell>
                <StyledTableCell><StyledLabelData>{container.tokenOut}</StyledLabelData></StyledTableCell>
                <StyledTableCell><StyledLabelData>{container.timeOutSlot}</StyledLabelData></StyledTableCell>
                <StyledTableCell><StyledLabelData>{container.tokenIn}</StyledLabelData></StyledTableCell>
                <StyledTableCell><StyledLabelData>{container.timeInSlot}</StyledLabelData></StyledTableCell>
              
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const openPopup = () => {
    setShowPopup(true);
    // setRender(render + 1);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const onFileDownload = (job) => {
    JobService.fetchInvoice(job.referenceNumber)
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
  };

  return (
    <>
      <Card style={{ width: "1218px", height: "210px" , marginTop: "20px",background: "#FFFFFF 0% 0% no-repeat padding-box",
        boxShadow: "4px 4px 7px #0000002B",
        border: "1px solid #DCDCDC",
        borderRadius: "5px",
          opacity: 1
        }}>
           <cardHeader >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Grid item xs={10}>
                  <StyledInputLabel >
                    Order Number#
                  </StyledInputLabel>
                </Grid>
                <Grid item xs={10}>
                  <StyledInputLabel>
                    {job.referenceNumber}
                  </StyledInputLabel>
                </Grid>
              </TableCell>

              <TableCell>
                <Grid item xs={10}>
                  <StyledInputLabel>
                    Completed On
                  </StyledInputLabel>
                </Grid>
                <Grid item xs={10}>
                  <StyledInputLabel style={{ color: "black" }}>
                    {job.completedDate}
                  </StyledInputLabel>
                </Grid>
              </TableCell>

              <TableCell>
                <Grid item xs={10}>
                  <StyledInputLabel >
                    Number of containers
                  </StyledInputLabel>
                </Grid>
                <Grid item xs={10}>
                  <Link
                    style={{
                      color: "#0568AE",
                      position: "relative",
                      marginTop: "1",
                    }}
                    component="button"
                    variant="body2"
                    onClick={() => {
                      setViewPopup(true);
                      setContainerList(job.requestContainerList);
                    }}
                  >
                    {job.noOfContainers}
                  </Link>
                </Grid>
                <SwipeableDrawer
                  anchor="right"
                  open={viewPopup}
                  onClose={() => {
                    setViewPopup(false);
                  }}
                  onOpen={() => {
                    setViewPopup(true);
                  }}
                >
                  {list("right", containerList)}
                </SwipeableDrawer>
              </TableCell>
              <TableCell>
                <Grid item xs={10}>
                  <StyledInputLabel>
                    Contact name
                  </StyledInputLabel>
                </Grid>
                <Grid item xs={10}>
                  <StyledInputLabel>
                    {job.driverName}
                  </StyledInputLabel>
                </Grid>
              </TableCell>

              <TableCell>
                <Grid item xs={10}>
                  <StyledInputLabel>
                    Contact Number
                  </StyledInputLabel>
                </Grid>
                <Grid item xs={10}>
                  <StyledInputLabel>
                    {job.driverContactNo}
                  </StyledInputLabel>
                </Grid>
              </TableCell>

              <TableCell>
                {job.settlementStatus === "Settlement" && (
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      textTransform: "capitalize",
                      backgroundColor: "#3C66D3",
                    }}
                    onClick={() => {
                      history.push("/settlementSummary", { settlement: job });
                    }}
                  >
                    {job.settlementStatus}
                  </Button>
                )}
                {job.settlementStatus === "Invoice Submitted" && (
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <img
                        src="./document.svg"
                        onClick={() => onFileDownload(job)}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        style={{
                          textTransform: "capitalize",
                          backgroundColor: "#EB9743",
                        }}
                      >
                        {job.settlementStatus}
                      </Button>
                    </Grid>
                  </Grid>
                )}
                {job.settlementStatus === "Invoice Approved" && (
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <img src="./document.svg" />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        style={{
                          textTransform: "capitalize",
                          backgroundColor: "#EB9743",
                        }}
                      >
                        {job.settlementStatus}
                      </Button>
                    </Grid>
                  </Grid>
                )}
                {job.settlementStatus === "Amount Paid" && (
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <img
                        src="./document.svg"
                        onClick={() => onFileDownload(job)}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        style={{
                          textTransform: "capitalize",
                          backgroundColor: "#EB9743",
                        }}
                      >
                        {job.settlementStatus}
                      </Button>
                    </Grid>
                  </Grid>
                )}

                {job.settlementStatus === "Invoice Rejected" && (
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <Button
                        variant="contained"
          
                        style={{
                          textTransform: "capitalize",
                          backgroundColor: "#EA2428",
                        }}
                        onClick={() => {
                          history.push("/settlementSummary", {
                            settlement: job,
                          });
                        }}
                      >
                        {job.settlementStatus}
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </cardHeader>
        <TableRow>
          <TableCell className={classes.matCell}>
            <div className="row">
              <Grid container alignItems="flex-start">
              <Grid item >
                              <img src="./location-pin-grey.svg"  style={{marginTop:"30px",marginRight:"-240px"}} />
                  </Grid>
                <Grid item >
                  <Box {...defaultProps1}>
                    
                    <Grid container style={{ marginTop: "5px" }}>
                      {" "}
                     <Typography variant="h3" style={{color:'#000000'}}>{job.contactDetails}</Typography> 
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </div>

            <Divider orientation="vertical" flexItem />
          </TableCell>
          <TableCell className={classes.matCell1}>
         
          <div className="row">
          <Grid container alignItems="flex-start">
          <Grid item >
                              <img src="./truck_black.svg"  style={{marginTop:"30px",marginRight:"-240px"}} />
                  </Grid>
            
          <Grid item >
          <Box {...defaultProps1}>
                
          <div className="row">
                  <Box style={{ height: '30px', width: '250px', border: "2px solid #ccc", marginTop: "20px", marginLeft: "50px" }}>
                    {job.vehicleRegNo}
              </Box>
                  {/* <Box style={{ height: '30px', width: '200px', border: "2px solid #ccc", marginTop: "30px", marginLeft: "30px" }}>
                    {value.vehicleType}
              </Box> */}
                </div>
          
             
                </Box> 
                </Grid> 
                </Grid>
                </div>
          </TableCell>
        </TableRow>
      </Card>

      <SwipeableDrawer
        anchor="right"
        open={viewPopup}
        onClose={() => {
          setViewPopup(false);
        }}
        onOpen={() => {
          setViewPopup(true);
        }}
      >
        {list()}
      </SwipeableDrawer>
    </>
  );
}

export default React.memo(SettlementSubForm);
