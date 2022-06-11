import React, { useEffect,useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { InputLabel, Paper, Divider,Typography ,TableHead} from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import Box from "@material-ui/core/Box";
import { useLocation } from "react-router-dom";
import UploadDocumentPopup from "../../components/transporter/UploadDocumentPopup";
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
    marginTop:'10px',
    width: "300px",
    borderTop: '1px solid #E4EBFF'
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
  // boxOnTable: {
  //   left: "5px",
  //  // top: "30px",
  //   padding: "1.4%",
  //   width: "44px",
  //   height: "44px",
  //   backgroundColor: "#0E1B3D",
  //   color: "#FFFFFF",
  //   textAlign: "center",
  //   position: "relative",
  //   marginBottom: "10px",
  //   fontWeight: "bold",
  // },
  boxOnTable: {
    //left: "5px",
    top: "30px",
    padding: "1.4%",
    paddingTop: "5px",
    width: "50px",
    height: "37px",
    backgroundColor: "#0E1B3D",
    border: "1px solid #E4EBFF",
    color: "#FFFFFF",
    textAlign: "center",
    position: "relative",
    fontWeight: "bold",
    zIndex:2,
    right:"-15px"
   
   
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
  style: { width: "15rem", height: "6rem" },
  color: "black",
  textAlign: "center",
  border: "2px dashed #ccc",
};

function SettlementSummary() {
  const classes = useStyles();
  const location = useLocation();
  const settlementSummary = location.state.settlement;
  const [showUploadPopup,setShowUploadPopup]=useState(false);
  const popUpParams={uploadType:"invoice",referenceNumber:settlementSummary.referenceNumber,status:settlementSummary.invoice};
  
    let history=useHistory();


  const openPopup = () => {
    setShowUploadPopup(true);
    
};

const handleClose = () => {
  setShowUploadPopup(false);

};


  return (
    <>
      <div className="row">
      <Typography variant="h2" style={{ textAlign: "left" ,marginTop:"5px"}}>Settlement</Typography>
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
            <Grid container>
              <Grid item style={{ marginTop: "40px", marginRight: "-17px" }}>
                <img src="./location-pin-grey.svg"/>
              </Grid>
              <Grid item >
                <Box {...defaultProps1}>

                <Grid container style={{marginTop:"5px",fontSize:"13px"}} > 
                <Typography variant="body2" style={{color:'#000000'}}>
                 {settlementSummary.contactDetails}</Typography></Grid>
                </Box>
              </Grid>
              

              <Grid item style={{ marginTop: "40px", marginRight: "-6px" }}>
                <img src="./truck_black.svg" />
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
                    {/* <Box
                      style={{
                        height: "30px",
                        width: "150px",
                        border: "2px solid #ccc",
                        marginTop: "30px",
                        marginLeft: "30px",
                      }}
                    >
                     {settlementSummary.truckType}
                    </Box> */}
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
        
          
            <div className="col-md-5">
              {" "}
              <hr className={classes.vhrStyle}></hr>
            </div>
            <div className="col-md-7">
              <div className="row">
              <div className="col-md-2"> </div>
               
              <InputLabel style={{fontSize:'20px',fontColor:'black',fontStyle:'bold' ,alignSelf:"center"}}>PAYMENT BREAKUP</InputLabel> 
             
             
              <div className="col-md-2"> </div>
                <div className="col-md-5">
               
                  <Table
                    size="small"
                    className={classes.table}
                    //  style={{borderSpacing:"1px",marginTop:"100px",marginBottom:"200px"}}
                  >
                      <TableHead>
                        <TableCell style={{ width: 30 }}>
                          <InputLabel style={{fontStyle:'bold'}} >
                             Containers
                          </InputLabel>
                        </TableCell>
                        <TableCell style={{ width: 20 }}>
                          <InputLabel style={{fontStyle:'bold'}} >
                           Amount
                          </InputLabel>
                        </TableCell>
                        </TableHead>
                    <TableBody>
                    {settlementSummary.transporterCharges.map((transporterCharge, ind) => (
                      <TableRow>
                        <TableCell style={{ width: 30 }}>
                          <InputLabel >
                             {transporterCharge.containerZoneInfo}
                          </InputLabel>
                        </TableCell>
                        <TableCell style={{ width: 20 }}>
                          <InputLabel >
                          {transporterCharge.transporterCharge} AED
                          </InputLabel>
                        </TableCell>
                      </TableRow>
                   
                    ))}
         
                    </TableBody>
                  </Table>
                
                </div>
              </div>
             
              <div className="row">
              
                <div className="col-md-5">
               
                  <Table
                    size="small"
                    className={classes.table}
                    //  style={{borderSpacing:"1px",marginTop:"100px",marginBottom:"200px"}}
                  >
                    
                    <TableBody>
                  
                      <TableRow>
                        <TableCell style={{ width: 30 }}>
                          <InputLabel style={{fontStyle:'bold'}} > 
                            Total Amount
                          </InputLabel>
                        </TableCell>
                        <TableCell style={{ width: 20 }}>
                          <InputLabel >
                           {settlementSummary.settlementAmountDisplay} AED
                          </InputLabel>
                        </TableCell>
                      </TableRow>
                   
                  
         
                    </TableBody>
                  </Table>
                
                </div>

              </div>
                
              <div className="row">
                  <div className="col-md-2">
                     
                      <Box className={classes.boxOnTable}> AED</Box> 
                      </div>
                    <div className="col-md-10">
                    <>
                  <Card
                    variant="outlined"
                    style={{ background: '#FFFFFF 0% 0% no-repeat padding-box',
                      border: '1px solid #D3D3D3',
                      opacity: '1', height: "100px", width: "250px" }}
                  >
                    <CardContent>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item xs={7} style={{ marginTop: "25px" }}>
                          <InputLabel >
                            Amount Payable
                          </InputLabel>
                        </Grid>

                        <Grid item xs={5} style={{ marginTop: "25px" }}>
                          <InputLabel
                            style={{color: "#0568AE" }}
                          >
                             {settlementSummary.settlementAmountDisplay} AED
                          </InputLabel>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  </>
                  
               
              
                
                </div>
        
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="row">
    <div className="col-md-6">{settlementSummary.invoice?settlementSummary.invoice.fileName:""} </div>
      
        <div className="col-md-6">
          <Button
            variant="contained"
            color="primary"
            style={{ float: "right" }}
            onClick={openPopup}
          >
            Upload Invoice
          </Button>
        </div>
      </div>
   {settlementSummary.invoice &&   <div className="row">
      <div className="col-md-6">
      <InputLabel style={{ fontSize: "13px",color:"black",fontWeight:"bold"}}  >Comments by Admin : {settlementSummary.invoice.remarks}</InputLabel>
     
        </div>
        </div>}
      {showUploadPopup && <UploadDocumentPopup  popUpParams={popUpParams} onClose={()=>setShowUploadPopup(false)}
       redirectToClaim={(e)=>{history.push("/claimSummary",{ settlement: settlementSummary,fileName:e })}}/>}
      <hr></hr>
      <br></br>
    </>
  );
}

export default React.memo(SettlementSummary);
