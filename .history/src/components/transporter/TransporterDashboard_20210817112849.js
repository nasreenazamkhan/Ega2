import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowRight from "@material-ui/icons/ArrowRight";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { InputLabel,Paper,Typography } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import TransporterService from "../../service/TransporterService";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { getUserDetails } from "../../lib/common/storeAccess";  

const useStyles = makeStyles((theme) => ({
  splitScreen: {
    display: "flex",
    flexDirection: "row",
  },
  leftPane: {
    width: "50%",
  },
  rightPane: {
    width: "50%",
  },

  dot: {
    height: "40px",
    width: "40px",
    backgroundColor: "#bbb",
    borderRadius: "50%",
    display: "inline-block",
  },

  margin: {
    margin: theme.spacing(1),
  },
  label: {
    fontSize: "30px",
    color: "#545454",
    opacity: 1,
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: "20px",
    marginTop:"-50px"
  },
  media: {
    display: "flex",
    height: "156px",
    objectFit: "contain",
    marginTop: "28px",
  },
  hrStyle: {
    width: "80px",
    marginLeft: "35% !important",
    marginRight: "25% !important",
    background: "#FF6F6F",
    height: "7px",
    border: "0px",
    marginLeft: "202px",
    background: "#FF6F6F 0% 0% no-repeat padding-box",
  },
  vhrStyle: {
    marginTop: "25px",
    display: "inlineBlock",
    width: "8px",
    height: "88px",
    background: "#FF6F6F 0% 0% no-repeat padding-box",
  },
  vhrStyle1: {
    marginTop: "5px",
    display: "inlineBlock",
    width: "5px",
    height: "100px",
    background: "red",
  },
  cardStyle: {
    width: "497px",
    height: "445px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 2px 12px #00000030",
    borderRadius: "15px",
    //opacity: "0.64",
    marginTop: 87.82,
  },
  truckCardStyle: {
    width: "250px",
    height: "214px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 2px 12px #00000030",
    borderRadius: "15px",
  },
  statusCardStyle: {
    width: "406px",
    height: "214px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 2px 12px #00000030",
    borderRadius: "15px",
  },
  countStyle: {
    color: "#646464",
    textAlign: "center",
    fontSize: "50px",
    fontWeight: "bold",
  },
  settlementLabel: {
    fontSize: 33,
    fontWeight: "bold",
    color: "#545454",
    opacity: 1,
    textAlign: "center",
  },
  statusLabel: {
    fontSize: 33,
    fontWeight: "bold",
    color: "#545454",
    opacity: 1,
    textAlign: "left",
  },

  iconButtonStyle: {
    textAlign: "left",
    marginLeft: "-30px",
    backgroundColor: theme.palette.background.paper,
  },
}));

function TransporterDashBoard() {
  const classes = useStyles();
  const [availableJobs, setAvailableJobs] = useState("0");
  const [truckCount, setTruckCount] = useState("0");
  // const [settlements, setSettlements] = useState("0");
  const [activeJobs, setActiveJobs] = useState("0");
  const [inProgress, setInProgress] = useState("0");
  const [delivered, setDelivered] = useState("0");
  const [completed, setCompleted] = useState("0");
  const [bookingInvs, setBookingInvs] = useState("0");
  const [miscInvs, setMiscInvs] = useState("0");
  let history = useHistory();
  const isOnboarded=getUserDetails().isOnBoarded;

  useEffect(() => {
    const loadContainerCount = async () => {
      TransporterService.fetchCountForDashBoard()
        .then((response) => {
          console.log("dataItems::", response.data.dataItems);
          console.log(response.data.dataItems[0].SUCC);
          setAvailableJobs(response.data.dataItems[0].SUCC);
        })
        .catch((error) => {
          console.log("error");
        });
    };

    loadContainerCount();
  }, []);  

  useEffect(() => {
    const settlementCount = async () => {
      TransporterService.countSettlements()
        .then((response) => {
          console.log("response::", response.data.dataItems[0]);               
          if (response.data.dataItems[0].MT_DEL !== null)
            setBookingInvs(response.data.dataItems[0].MT_DEL);
          if (response.data.dataItems[0].MISC !== null)
            setMiscInvs(response.data.dataItems[0].MISC);
          
        })

        .catch((error) => {
          console.log("error");
        });
    };

    settlementCount();
  }, []);

  useEffect(() => {
    const statusCount = async () => {
      TransporterService.countjobs()
        .then((response) => {
          console.log("response::", response.data.dataItems[0]);
          console.log(response.data.dataItems[0].TRANSCONF);
          setActiveJobs(response.data.dataItems[0].TRANSCONF);
          if (response.data.dataItems[0].INPRO !== null)
            setInProgress(response.data.dataItems[0].INPRO);
          if (response.data.dataItems[0].DEL !== null)
            setDelivered(response.data.dataItems[0].DEL);
          if (response.data.dataItems[0].COMPL !== null)
            setCompleted(response.data.dataItems[0].COMPL);
        })

        .catch((error) => {
          console.log("error");
        });
    };

    statusCount();
  }, []);

  useEffect(() => {
    const truckCount = async () => {
      TransporterService.countTrucks()
        .then((response) => {
          console.log("response::", response.data.dataItems[0]);

          setTruckCount(response.data.dataItems[0].COUNT);
        })

        .catch((error) => {
          console.log("error");
        });
    };

    truckCount();
  }, []);

  return (
    <>
    {isOnboarded && isOnboarded==='Y' ?  <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={5}>
          <Card className={classes.cardStyle}>
            <CardContent>
              <CardMedia
                component="img"
                className={classes.media}
                image="./progressBar.svg"
              />
              <div
                style={{
                  position: "relative",
                  color: "#646464",
                  top: -120,
                  left: 35,
                  textAlign: "center",
                  fontSize: "72px",
                  fontWeight: "bold",
                }}
              >
               {(availableJobs + "").padStart(2, "0")}
              </div>

              <InputLabel className={classes.label} >Available Jobs</InputLabel>
              <hr className={classes.hrStyle} />
              <InputLabel style={{fontSize:"22px",color:"#646464",textAlign:"center",marginTop:"20px"}}>Click to view all jobs currently available </InputLabel>
            </CardContent>
          </Card>
          <div style={{ textAlign: "center", marginTop: "-53px" }}>
            <IconButton
              onClick={() => {
                history.push("/searchRequests");
              }}
            >
              <img src="./arrow.svg" />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={5} style={{ marginLeft: "93px" }}>
          <Card className={classes.cardStyle}>
            <CardContent>
              <CardMedia
                component="img"
                className={classes.media}
                image="./progressBar.svg"
              />
              <div
                style={{
                  position: "relative",
                  color: "#646464",
                  top: -120,
                  left: 35,
                  textAlign: "center",
                  fontSize: "72px",
                  fontWeight: "bold",
                }}
              >
                {(activeJobs + "").padStart(2, "0")}
              </div>

              <InputLabel className={classes.label}>My Jobs</InputLabel>
              <hr className={classes.hrStyle} />
              <InputLabel style={{fontSize:"22px",color:"#646464",textAlign:"center",marginTop:"20px"}}>Click to view your ongoing jobs</InputLabel>
            </CardContent>
          </Card>
          <div style={{ textAlign: "center", marginTop: "-53px" }}>
            <IconButton
              onClick={() => {
                history.push("/newJobs", { tabSelected: 2 });
              }}
            >
              <img src="./arrow.svg" />
            </IconButton>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">       

        <Grid item style={{ marginTop: "50px" }}>
          <Card className={classes.statusCardStyle}>
            <CardContent>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={2}>
                  <hr className={classes.vhrStyle} />
                </Grid>

                <Grid item xs={4}>
                  <br></br>
                  <InputLabel className={classes.statusLabel}>
                  Settlements
                  </InputLabel>
                </Grid>
                <Grid item xs={5} style={{ marginTop: "20px" }}>
                  <br></br>
                  <div className="row">
                    <div className="col-md-1">
                      <InputLabel
                        style={{
                          color: "#F19832",
                          fontSize: "26px",
                          fontWeight: "bold",
                          marginRight: "60px",
                        }}
                      >
                        {(bookingInvs + "").padStart(2, "0")}
                      </InputLabel>
                    </div>
                    <div className="col-md-1">
                      <InputLabel
                        style={{
                          color: "#646464",
                          fontSize: "22px",
                          whiteSpace: "nowrap",
                          marginLeft: "10px",
                        }}
                      >
                         Booking Invoices
                      </InputLabel>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-1">
                      <InputLabel
                        style={{
                          color: "#63BB7A",
                          fontSize: "26px",
                          fontWeight: "bold",
                        }}
                      >
                        {(miscInvs + "").padStart(2, "0")}
                      </InputLabel>
                    </div>
                    <div className="col-md-1">
                      <InputLabel
                        style={{
                          color: "#646464",
                          fontSize: "22px",
                          marginLeft: "10px",
                        }}
                      >
                        Miscellaneous Invoices
                      </InputLabel>
                    </div>
                  </div>
                  
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        

        <Grid item style={{ marginLeft: "-50px", marginTop: "50px" }}>
          <img
            src="./red_arrow.svg"
            style={{ width: "70px", cursor: "pointer" }}
            alt="click here"
            onClick={() => {
              history.push("/settlements");
            }}
          />
        </Grid>
        <Grid item style={{ marginTop: "50px" }}>
          <Card className={classes.truckCardStyle}>
            <CardContent>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={2} style={{ marginTop: "30px" }}>
                  <hr className={classes.vhrStyle} />
                </Grid>

                <Grid item xs={5}>
                  <InputLabel
                    style={{
                      color: "#646464",
                      textAlign: "right",
                      fontSize: "50px",
                      fontWeight: "bold",
                    }}
                  >
                    {(truckCount + "").padStart(2, "0")}
                  </InputLabel>
                  <br></br>
                  <InputLabel
                    style={{
                      fontSize: 33,
                      fontWeight: "bold",
                      color: "#545454",
                      opacity: 1,
                      textAlign: "right",
                      marginLeft: "40px",
                    }}
                  >
                    Trucks
                  </InputLabel>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item style={{ marginLeft: "-50px", marginTop: "50px" }}>
          <img
            src="./red_arrow.svg"
            style={{ width: "70px", cursor: "pointer" }}
            alt="click here"
            onClick={() => {
              history.push("/trucks");
            }}
          />
        </Grid>
        <Grid item style={{ marginTop: "50px" }}>
          <Card className={classes.statusCardStyle}>
            <CardContent>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={2}>
                  <hr className={classes.vhrStyle} />
                </Grid>

                <Grid item xs={4}>
                  <br></br>
                  <InputLabel className={classes.statusLabel}>
                    Status
                  </InputLabel>
                </Grid>
                <Grid item xs={5} style={{ marginTop: "20px" }}>
                  <br></br>
                  <div className="row">
                    <div className="col-md-1">
                      <InputLabel
                        style={{
                          color: "#F19832",
                          fontSize: "26px",
                          fontWeight: "bold",
                          marginRight: "60px",
                        }}
                      >
                        {(inProgress + "").padStart(2, "0")}
                      </InputLabel>
                    </div>
                    <div className="col-md-1">
                      <InputLabel
                        style={{
                          color: "#646464",
                          fontSize: "22px",
                          whiteSpace: "nowrap",
                          marginLeft: "10px",
                        }}
                      >
                        In Progress
                      </InputLabel>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-1">
                      <InputLabel
                        style={{
                          color: "#63BB7A",
                          fontSize: "26px",
                          fontWeight: "bold",
                        }}
                      >
                        {(delivered + "").padStart(2, "0")}
                      </InputLabel>
                    </div>
                    <div className="col-md-1">
                      <InputLabel
                        style={{
                          color: "#646464",
                          fontSize: "22px",
                          marginLeft: "10px",
                        }}
                      >
                        Delivered
                      </InputLabel>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-1">
                      <InputLabel
                        style={{
                          color: "#086B08",
                          fontSize: "26px",
                          fontWeight: "bold",
                        }}
                      >
                        {(completed + "").padStart(2, "0")}
                      </InputLabel>
                    </div>
                    <div className="col-md-1">
                      <InputLabel
                        style={{
                          color: "#646464",
                          fontSize: "22px",
                          marginLeft: "10px",
                        }}
                      >
                        Completed
                      </InputLabel>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item style={{ marginLeft: "-50px", marginTop: "50px" }}>
          <img
            src="./red_arrow.svg"
            style={{ width: "70px", cursor: "pointer" }}
            alt="click here"
            onClick={() => {
              history.push("/transporterStatus");
            }}
          />
        </Grid>

        
      </Grid></>:(<Paper elevation={5} style={{ borderRadius: 8, padding: '30px', marginTop: 20, minWidth: '760px', minHeight: '100px', color: '#FF7171' }}>
        <Grid container direction="row" spacing={5}>
          <Grid item sm={12} xs={12}>
            <Typography variant="subtitle1" style={{ fontSize: '16px', textAlign: 'center' }}>
              <b>{'No rate card found for transporter'}</b></Typography>
          </Grid>
        </Grid>
      </Paper>)}
    </>
  );
}
export default React.memo(TransporterDashBoard);
