import React, { useEffect ,useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { InputLabel, Paper, Divider,Typography } from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import Box from "@material-ui/core/Box";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 600,
    height: 230,
  },
  paperRoot: {
    background: '#F1F1F1 0% 0% no-repeat padding-box',  
    border: '1px solid #DCDCDC',
    borderRadius: '5px',
    opacity: '1'
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
    fontSize: 20,
    color: "#FF0000",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

  splitScreen: {
    display: "flex",
    flexDirection: "row",
  },
  leftPane: {
    width: "60%",
  },
  rightPane: {
    width: "40%",
  },

  table: {
    // marginBottom:'200px',
    width: "300px",
  },

  table1: {
    borderCollapse: "collapse",
  },

  label: {
    fontSize: 13,
    color: "black",
  },

  labelData: {
    fontSize: 13,
    color: "black",
    fontWeight: "bold",
  },
  vhrStyle: {
    height: "300px",
    width: "1px",
  },
  boxOnTable: {
    top:"25px",
    right:"-20px",
    paddingTop: "5px",
    width: "44px",
    height: "44px",
    backgroundColor: "#0E1B3D",
    color: "#FFFFFF",
    textAlign: "center",
    position: "relative",
    marginBottom: "5px",
    fontWeight: "bold",
    zIndex:2
  },
}));

const TableCell = withStyles({
  root: {
    borderBottom: "none",
    width: 185,
  },
})(MuiTableCell);

//   const defaultProps = {
//     bgcolor: "red",
//     m: 1,
//     style: { width: "3rem", height: "2rem" },
//     borderColor: "red",
//     color: "#FFFFFF",
//     textAlign: "center",
//     fontWeight: "fontWeightBold",
//     align: "right",
//   };

const defaultProps1 = {
  m: 1,
  style: { width: "12rem", height: "6rem" },
  color: "black",
  textAlign: "center",
  border: "2px dashed #ccc",
};

function ClaimSummary() {
  const classes = useStyles();
  const location = useLocation();
  const settlementSummary = location.state.settlement;
  const fileName = location.state.fileName;

  let history = useHistory();

  return (
    <>
      <div className="row"></div>
      <div className="row">
      <div className="col-md-6">
      <Typography variant="h2" style={{ textAlign: "left" ,marginTop:"5px"}}>Settlement</Typography>
      </div>
        <div className="col-md-6">
          <Button
            variant="contained"
            color="primary"
            style={{ float: "right"}}
            onClick={() => {
              history.push("/settlements");
          
            }}
          >
           BACK
          </Button>
        
      </div>
      </div>
      <div className="row">
        <Paper
          className={classes.paperRoot}
          style={{ marginTop: "5px", height: "50px", width: "100%" }}
        >
            <InputLabel
            style={{ fontSize: "22px", marginTop: "15px",marginLeft:"10px" }}
          >
            Summary-{settlementSummary.referenceNumber}
          </InputLabel>
        </Paper>
      </div>

      <div className={classes.splitScreen}>
        <div className={classes.leftPane}>
          <div className="row">
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <InputLabel style={{  marginTop: "15px" }}>
                  Job Number#
                </InputLabel>
                <InputLabel
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    marginTop: "15px",
                  }}
                >
                  {settlementSummary.referenceNumber}
                </InputLabel>
              </Grid>

              <Grid item style={{ marginRight: "-8px" }}>
                <img src="./truck.svg" />
              </Grid>
              <Grid item>
                <Box
                  style={{
                    border: "2px dashed #ccc",
                    height: "100px",
                    width: "400px",
                    marginTop: "10px",
                  }}
                >
                  <div className="row">
                  <Grid item xs={3}> </Grid>
                  <Grid item>
                    <Box
                      style={{
                        height: "30px",
                        width: "150px",
                        border: "2px solid #ccc",
                        marginTop: "30px",
                        marginLeft: "30px",
                      }}
                    >
                      {settlementSummary.vehicleRegNo}
                    </Box>
                    </Grid>
                  
                  </div>
                </Box>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className={classes.rightPane}>
          {/* {paymentDetails && ( */}
          {/* <Card style={{ width: "500px", height: "700px" }}>
              <CardContent>
                <InputLabel style={{ fontSize: "13px", color: "grey" }}>
                  PAYMENT DETAILS
                </InputLabel>
                <hr></hr> */}
          <div className="row">
            <div className="col-md-3">
              {" "}
              <hr className={classes.vhrStyle}></hr>
            </div>
            <div className="col-md-7">
              <div className="row">
              <div className="col-md-2"></div>
                <div className="col-md-9">
                  <Table
                    size="small"
                    className={classes.table}
                    //  style={{borderSpacing:"1px",marginTop:"100px",marginBottom:"200px"}}
                  >
                    <TableBody>
                      <TableRow>
                        <TableCell style={{ width: 30 }}>
                          <InputLabel >
                            Total Containers
                          </InputLabel>
                        </TableCell>
                        <TableCell style={{ width: 20 }}>
                          <InputLabel>
                            {settlementSummary.noOfContainers}
                          </InputLabel>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ width: 180 }}>
                          <InputLabel >
                            Sub Total
                          </InputLabel>
                        </TableCell>
                        <TableCell>
                          <InputLabel >
                            {settlementSummary.settlementAmountDisplay}
                          </InputLabel>
                        </TableCell>
                      </TableRow>
                      {/* <TableRow>
                          <TableCell style={{ width: 180 }}>
                            <InputLabel className={classes.label}>
                              Delivery Charge
                            </InputLabel>
                          </TableCell>
                          <TableCell>
                            <InputLabel className={classes.labelData}>
                              20 AED
                            </InputLabel>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ width: 180 }}>
                            <InputLabel className={classes.label}>
                              Tax
                            </InputLabel>
                          </TableCell>
                          <TableCell>
                            <InputLabel className={classes.labelData}>
                              20 AED
                            </InputLabel>
                          </TableCell>
                        </TableRow> */}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="row">
              <div className="col-md-2">   <Box className={classes.boxOnTable}> {" "} AED</Box> </div>
              <div className="col-md-7">
              
                <Grid item>
                  <Card
                    variant="outlined"
                    style={{ height: "100px", width: "300px" }}
                  >
                    <CardContent>
                    
                      <Grid container spacing={1} alignItems="center">

                        <Grid item xs={6} style={{ marginTop: "25px" }}>
                          <InputLabel >
                            Amount Payable
                          </InputLabel>
                        </Grid>

                        <Grid item xs={6} style={{ marginTop: "25px" }}>
                          <InputLabel
                            style={{ color: "#C62926",fontWeight:"bold" }}
                          >
                           {settlementSummary.settlementAmountDisplay} AED
                          </InputLabel>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                {/* </Grid> */}

                {/* </div>
                  </div> */}
                  
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
      <hr></hr>
      <div className="row">
        <div className="col-md-6">{fileName} </div>
        <div className="col-md-6">
          <Button
            variant="contained"
           disabled="true"
            style={{
              textTransform: "capitalize",
              backgroundColor: "#EB9743",
              color:"#FFFFFF",
              float: "right",
              fontStyle: "italic",
            }}
          >
            INVOICE SUBMITTED
          </Button>
        </div>
      </div>
      <hr></hr>
      <div className="row">
      <div className="col-md-4"> </div>
      <div className="col-md-6"><InputLabel style={{color:"green",fontWeight:"bold",fontSize:"18px"}}>INVOICE DETAILS SUBMITED. PLEASE WAIT FOR VERIFICATION</InputLabel>
      </div>
      </div>
      <br></br>
    </>
  );
}

export default React.memo(ClaimSummary);
