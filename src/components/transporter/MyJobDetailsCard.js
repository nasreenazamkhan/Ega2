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
import CloseIcon from "@material-ui/icons/Close";
import "../../assets/styles.css"; 
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
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import clsx from "clsx";
import { postHttp } from '../../lib/common/HttpService';
import TableHead from "@material-ui/core/TableHead";

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
    height: "160px",
    textAlign: "center",
   // borderRight: "1px solid #D0D0D0",
    width: "40%",
  },
});



const defaultProps = {
  m: 1,
  style: { width: "3rem", height: "2rem" },
  color: "black",
  textAlign: "center",
  align: "right",
  marginTop: "40px",
  border: "2px dashed #ccc",
};

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

const defaultProps2 = {
  m: 1,
  style: { width: "182px", height: "31px"},
  color: "Black",
  textAlign: "center",
  align: "right",
  marginTop: "2px",
  border: "2px  #ccc",
  bgcolor: "#FFC746",
  fontStyle: "italic",
  
};



export default function MyJobDetailsCard(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [render, setRender] = useState(0);
  const classes = useStyles();
  const [viewPopup, setViewPopup] = useState(false);
  const [containerList, setContainerList] = useState([]);
  const [dateTime, setDateTime] = useState("");
  const [jobNumber, setJobNumber] = useState("");

  useEffect(() => {

  }, []);

  const list = (anchor, requestContainerList, tabSelected) => (
    
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
    >
      <br></br>
      <InputLabel
        style={{ fontSize: "20px", color: "#434343", marginLeft: "15px" }}
      >
        {" "}
        Container Details
      </InputLabel>
      <br></br>
      <div >
                    <CloseIcon fontSize="large" className="rightAlign" onClick={() => {
                        setViewPopup(false);
                    }}/>
            </div>
      <Divider></Divider>
      <br></br>
      <Table size="small" style={{ width: "320px", marginLeft: "12px" }}>
        <TableHead>
          <Paper elevation={0} style={{ marginTop: "5px" }}>
            <TableRow>
              <TableCell style={{  color: "grey",whiteSpace:'nowrap' }}>
                Container Number
              </TableCell>
              <TableCell style={{ color: "grey",whiteSpace:'nowrap' }}>
                ISO Code
              </TableCell>
              <TableCell style={{  color: "grey" }}>
                Pickup
              </TableCell>
              {tabSelected === 'ACTIVE JOBS' && <TableCell style={{  color: "grey" }}>
                Token No
              </TableCell>}
              {tabSelected === 'ACTIVE JOBS' && <TableCell style={{ color: "grey" }}>
                Time slot
              </TableCell>}
            </TableRow>
          </Paper>
        </TableHead>
        <TableBody>
          {requestContainerList.map((container, ind) => (
            <TableRow>
              <Paper variant="outlined" style={{ marginTop: "5px" }}>
                <TableCell style={{  color: "grey" }}>
                  {container.container_number}
                </TableCell>
                <TableCell style={{  color: "black" }}>
                  {container.iso_code}
                </TableCell>
                <TableCell style={{  color: "black" }}>
                  {container.pickupLocation}
                </TableCell>
                {tabSelected === 'ACTIVE JOBS' && <TableCell style={{ color: "black" }}>
                  {container.token}
                </TableCell>}
                {tabSelected === 'ACTIVE JOBS' && <TableCell style={{  color: "black" }}>
                  {container.timeSlot}
                </TableCell>}
              </Paper>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const openPopup = () => {
    console.log("start job button clicked");
    setShowPopup(true);
   // setRender(render + 1);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
       {props.columnsValues && props.columnsValues.length > 0 ? (
      props.columnsValues.map((value, inx) => (
        console.log("value::::",value),
        <Card style={{ width: "1218px", height: "190px" , marginTop: "20px",background: "#FFFFFF 0% 0% no-repeat padding-box",
        boxShadow: "4px 4px 7px #0000002B",
        border: "1px solid #DCDCDC",
        borderRadius: "5px",
          opacity: 1
        }}>
          <cardHeader >
          <Table >
            <TableBody>
              <TableRow >
        
                <TableCell>
                  <Grid item xs={5}>
                    <InputLabel style={{  color: "#848484" ,whiteSpace:'nowrap'}}>
                      Job Number#
                  </InputLabel>
                  </Grid>
                  <Grid item xs={5}>
                    <InputLabel style={{  color: "black" }}>
                     {value.referenceNumber}
                  </InputLabel>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid item xs={5}>
                    <InputLabel style={{  color: "#848484" ,whiteSpace:'nowrap'}}>
                   Drop Date & Time
                  </InputLabel>
                  </Grid>
                  <Grid item xs={5}>
                    <InputLabel style={{  color: "#848484" ,whiteSpace:'nowrap'}}>
                     {value.dateAndTime}
                  </InputLabel>
                  </Grid>
                </TableCell>
                {props.tabSelected === "ACTIVE JOBS" && (
                  <TableCell>
                    <Grid item xs={5}>
                      <InputLabel style={{ color: "#848484" }}>
                        Token
                    </InputLabel>
                    </Grid>
                    <Grid item xs={5}>
                      <InputLabel style={{  color: "black" }}>
                      {value.requestContainerList[0].token}
                    </InputLabel>
                    </Grid>
                  </TableCell>
                )}
              
                <TableCell>
                  <Grid item xs={7}>
                    <InputLabel style={{  color: "#848484",whiteSpace:'nowrap' }}>
                      Number of containers
                  </InputLabel>
                  </Grid>
                  <Grid item xs={7}>
                    <Link
                     
                      component="button"
                      variant="body2"
                      onClick={() => {
                        setViewPopup(true);
                        setContainerList(value.requestContainerList);
                      }}
                    >
                      {value.noOfContainers}
                </Link>
                  </Grid>
                  {viewPopup && <SwipeableDrawer
                    anchor="right"
                    open={viewPopup}
                    onClose={() => {
                      setViewPopup(false);
                    }}
                    onOpen={() => {
                      setViewPopup(true);
                    }}
                  >
                    {list('right', containerList, props.tabSelected)}
                  </SwipeableDrawer>}
                </TableCell>
                <TableCell>
                  <Grid item xs={5}>
                    <InputLabel style={{   color: "#848484",whiteSpace:'nowrap' }}>
                      Driver Name
                    </InputLabel>
                  </Grid>
                  <Grid item xs={5}>
                    <InputLabel style={{  fontStyle:"italic",whiteSpace:'nowrap',color: "#848484"  }}>
                     not assigned
                    </InputLabel>
                  </Grid>
                </TableCell>
                          
                <TableCell>
                  <Grid item xs={5}>
                    <InputLabel style={{   color: "#848484" ,whiteSpace:'nowrap'}}>
                      Contact Number
                    </InputLabel>
                  </Grid>
                  <Grid item xs={5}>
                    <InputLabel style={{  color: "black",fontStyle:"italic" ,whiteSpace:'nowrap',color: "#848484" }}>
                    not assigned
                    </InputLabel>
                  </Grid>
                </TableCell>
            
              
                {props.tabSelected === "PENDING JOBS" && (
                  <TableCell>
                    <Box {...defaultProps2} ><inputLabel style={{color:"#644A0D"}}>Pending for token</inputLabel></Box>
                  </TableCell>
                )}
              
              </TableRow>
            </TableBody>
            </Table>
            </cardHeader>
          <TableRow>
            <TableCell className={classes.matCell}>
              <div className="row">
              <Grid container  alignItems="flex-start"> 
                              <Grid item >
                              <img src="./location-pin-grey.svg"  style={{marginTop:"30px",marginRight:"-240px"}} />
                  </Grid>
                  <Grid item > 
                <Box {...defaultProps1}><InputLabel style={{color:"black"}}>{value.contactDetails.split("$")[0]}</InputLabel>
                        <InputLabel style={{color:"black"}}>{value.contactDetails.split("$")[1]}</InputLabel>
                      </Box>
                  </Grid>
                  </Grid>
              </div>

              <Divider orientation="vertical" flexItem />
            </TableCell>
            <TableCell className={classes.matCell1}>
            <Grid container  alignItems="flex-start"> 
                              <Grid item >
                              <img src="./truck_black.svg"  style={{marginTop:"30px",marginRight:"-160px"}} />
                  </Grid>
                  <Grid item > 
              <Box
                style={{
                  border: "2px dashed #ccc",
                  height: "70px",
                  width: "300px",
                  marginBottom: "60px",
                  marginLeft:"80px"
                }}
              >
                <div className="row">
                  <Box style={{ height: '30px', width: '250px', border: "2px solid #ccc", marginTop: "20px", marginLeft: "30px" }}>
                    {value.vehicleRegNo}
              </Box>
                  {/* <Box style={{ height: '30px', width: '200px', border: "2px solid #ccc", marginTop: "30px", marginLeft: "30px" }}>
                    {value.vehicleType}
              </Box> */}
                </div>
              </Box>
                </Grid>
                </Grid>
            </TableCell>
          </TableRow>
        </Card>
      ))) : (
        <Paper
          elevation={5}
          style={{
            borderRadius: 8,
            padding: "30px",
            marginTop: 20,
            minWidth: "760px",
            minHeight: "100px",
            color: "#FF7171",
          }}
        >
          <Grid container direction="row" spacing={5}>
            <Grid item sm={12} xs={12}>
              <Typography
                variant="subtitle1"
                style={{ fontSize: "16px", textAlign: "center" }}
              >
                <b>{"No records found"}</b>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
     
      
    </>
  );
}
