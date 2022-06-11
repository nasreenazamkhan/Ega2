import React, { useState } from "react";
import {

  Table,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  TextField,
  TableHead,
  Paper

} from "@material-ui/core";

import { Card } from "@material-ui/core/";
import Box from "@material-ui/core/Box";

import { InputLabel } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import clsx from "clsx";
import { makeStyles,withStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MuiTableCell from "@material-ui/core/TableCell";

function AssignDriverSubForm(props) {
  const [driverNameState,setDriverNameState]=useState({ placeHolder: "Enter driver name here", error: false,color:'grey' })
  const [driverContactNoState,setDriverContactNoState]=useState({ placeHolder: "Enter driver number here", error: false,color:'grey' })
  const [job,setJob]=useState(props.job);
  const [viewPopup, setViewPopup] = useState(false);

  const useStyles = makeStyles({

    list: {
      width: 350,
    },
    fullList: {
      width: "auto",
    },
  });



  const classes = useStyles();

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
    >
      <br></br>
      <InputLabel
        style={{ fontSize: "20px", color: "grey", marginLeft: "15px" }}
      >
        {" "}
        Container Details
      </InputLabel>
      <br></br>borderBottom:"none" ,width:185
      <Divider></Divider>
      <br></br>
      <Table size="small"  style={{ width: "320px", marginLeft: "12px" }}>
        <TableHead>
          <Paper elevation={0} style={{ marginTop: "5px" }}>
            <TableRow>
              <TableCell style={{ fontSize: "13px", color: "grey",}}>
                Container Number
              </TableCell>
              <TableCell style={{ fontSize: "13px", color: "grey", borderBottom:"none" ,width:185}}>
                ISO Code
              </TableCell>
            </TableRow>
          </Paper>
        </TableHead>
        <TableBody>
          {job.requestContainerList.map((container, ind) => (
            <TableRow>
              <Paper variant="outlined" style={{ marginTop: "5px" }}>
                <TableCell style={{ fontSize: "13px", color: "grey",borderBottom:"none" ,width:185 }}>
                  {container.container_number}
                </TableCell>
                <TableCell style={{ fontSize: "13px", color: "black",borderBottom:"none" ,width:185 }}>
                  {container.iso_code}
                </TableCell>
              </Paper>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );


    return(
        <>
          <Card style={{ width: "1010px", height: "200px" }}>
        <Table>
          <TableBody >
            <TableRow>
              <TableCell>
                <Grid item xs={5}>
                  <InputLabel style={{ fontSize: "13px", color: "grey" }}>
                    Number of Containers
                  </InputLabel>
                </Grid>
                <Grid item xs={5}>
                <Link
                        style={{ color: "red", textDecoration: "underline" }}
                        href="#"
                        onClick={() => {
                          setViewPopup(true);
                        }}
                      >
                        {job.noOfContainers}
                      </Link>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid item xs={5}>
                  <InputLabel style={{ fontSize: "13px", color: "grey" }}>
                    Consignee name
                  </InputLabel>
                </Grid>
                <Grid item xs={7}>
                  <InputLabel style={{ fontSize: "13px", color: "black" }} />
                  {job.consigneeName}
                </Grid>
              </TableCell>
              <TableCell>
                <Grid item xs={5}>
                  <InputLabel style={{ fontSize: "13px", color: "grey" }}>
                    Contact Name
                  </InputLabel>
                </Grid>
                <Grid item xs={8}>
                <TextField  placeholder={driverNameState.placeHolder}
                 error={driverNameState.error}
                 onFocus={(e) => {
                   if(e.target.value.length===0)       
                    setDriverNameState({ placeHolder: "Enter driver name here", error: true,color:'red' });  
                   else
                   setDriverNameState({ placeHolder: "", error: false,color:'black' });
                 
                 }}
                 onBlur={(e) => {
                  if(e.target.value.length!==0)       
                  setDriverNameState({ placeHolder: "", error: false,color:'black' });
                  job.driverName=e.target.value;
                  props.onDriverDetailsEntered(job);
                }}

                 InputProps={{
                  style: {
                    color: driverNameState.color,
                    fontStyle:'italic',
                    fontSize:'13px'
                  } 
                }}
                
                />
                </Grid>
              </TableCell>
              <TableCell>
                <Grid item xs={5}>
                  <InputLabel style={{ fontSize: "13px", color: "grey" }}>
                    Contact Number
                  </InputLabel>
                </Grid>
                <Grid item xs={8}>
                <TextField placeholder={driverContactNoState.placeHolder}
                 error={driverContactNoState.error}
                 onFocus={(e) => {
                   if(e.target.value.length===0)       
                   setDriverContactNoState({ placeHolder: "Enter driver number here", error: true,color:'red' });  
                   else
                   setDriverContactNoState({ placeHolder: "", error: false,color:'black' });
                   
                 }}

                 onBlur={(e) => {
                  if(e.target.value.length!==0)       
                  setDriverContactNoState({ placeHolder: "", error: false,color:'black' });
                  job.driverContactNo=e.target.value;
                  props.onDriverDetailsEntered(job);
                }}


                 InputProps={{
                  style: {
                    color: setDriverContactNoState.color,
                    fontStyle:'italic',
                    fontSize:'13px'
                  } 
                }}></TextField>
                </Grid>
              </TableCell>
            </TableRow>

            <TableRow >
              <TableCell> </TableCell>
              <TableCell colSpan={4}>

              <Grid container  alignItems="flex-start"> 
                              <Grid item  style={{marginTop:"30px",marginRight:"-6px"}}>
                              <img src="../truck.svg"  />
                            </Grid>
                              <Grid item > 
                              <Box
                      style={{
                        border: "2px dashed #ccc",
                        height: "90px",
                        width: "500px",
                        marginBottom: "25px",
                        align: "center",
                      }}
                    >
                      <div className="row">
                        <Box
                          style={{
                            height: "30px",
                            width: "200px",
                            border: "2px solid #ccc",
                            marginTop: "30px",
                            marginLeft: "30px",
                          }}
                        >
                         {job.vehicleRegNo}
                        </Box>
                        <Box
                          style={{
                            height: "30px",
                            width: "200px",
                            border: "2px solid #ccc",
                            marginTop: "30px",
                            marginLeft: "30px",
                          }}
                        >
                          {job.vehicleType}
                        </Box>
                      </div>
                     
                    </Box>
                              </Grid>
                             </Grid>
            
                  
                   
                   
         
              
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <br></br>

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
    )



}
export default React.memo(AssignDriverSubForm);





