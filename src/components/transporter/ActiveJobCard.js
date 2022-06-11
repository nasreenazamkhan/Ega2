import React, { useState, useEffect } from "react";
import { Card, CardHeader } from "@material-ui/core/";
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
  TextField,
  Button,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { InputLabel } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MinimizeIcon from "@material-ui/icons/Minimize";
import { postHttp } from "../../lib/common/HttpService";
import * as endpointContants from "../../utils/ptmsEndpoints";
import StartJobPopup from "./StartJobPopup";
import Link from "@material-ui/core/Link";
import RequestContainerService from "../../service/RequestContainerService";

function ActiveJobCard(props) {
  const [hide, setHide] = useState(true);
  const [render, setRender] = useState(0);
  const [dateTime, setDateTime] = useState("");
  const [jobNumber, setJobNumber] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    console.log("props in ActivejobCard", props);
  });

  const updateDisableValue = (value) => {
    if (value.driverName && value.driverContactNo) {
      if (value.driverName != "" && value.driverContactNo != "" && value.driverContactNo.length===10)
        value.disabled = false;
    } else {
      value.disabled = true;
    }
    setRender(render + 1);
    console.log("column", value);
  };

  const handleClose = () => {
    setShowPopup(false);
    props.rerender();
  };

  const onFileDownload = (jobRefNo, containerNumber) => {
    RequestContainerService.fetchEtoken(jobRefNo, containerNumber,"FCL OUT")
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
      {props.columnsValues && props.columnsValues.length > 0 ? (
        props.columnsValues.map((column, inx) => (
          <Card style={{ width: "1221px", marginTop: "20px",background: "#FFFFFF 0% 0% no-repeat padding-box",
          boxShadow: "0px 3px 6px #00000029",
          border: "1px solid #E2E2E2",
          borderRadius: "16px",
            opacity: 1,
            
         
           }}>
            <div className="row">
              <div
                className="col"
                style={{  marginTop: "20px" }}
              >
                <InputLabel style={{fontSize:"26px",color:"#BABABA"}}>Job# {column.referenceNumber}</InputLabel>
              </div>
              <div className="col" style={{ marginLeft: "800px" }}>
                {column.disabled && (
                  <Button
                    style={{ textTransform: "none" ,  height: "31px",
                    fontSize: "17px",
                    whiteSpace:'nowrap'}}
                    backgroundColor="#6ABA5D"
                    variant="contained"
                    disabled={column.disabled}
                  >
                    Start Job
                  </Button>
                )}

                {!column.disabled && (
                  <Button
                    style={{
                      textTransform: "none",
                      backgroundColor: "#6ABA5D",
                      color: "white",
                      width: "87px",
                      height: "31px",
                      fontSize: "17px",
                      whiteSpace:'nowrap'
                    }}
                    variant="contained"
                    disabled={column.disabled}
                    onClick={() => {
                      let obj = {
                        url: endpointContants.start,
                        body: column,
                      };
                      postHttp(obj, true)
                        .then((response) => {
                          console.log("startted", response.createdDate);
                          setDateTime(response.createdDate);
                          setJobNumber(response.referenceNumber);
                          setShowPopup(true);
                        })
                        .catch((error) => {
                          const errMsg = error.message;
                          console.log(errMsg);
                          //dispatch(fetchUserFailure(errMsg));
                        });
                    }}
                  >
                    Start Job
                  </Button>
                )}
                {showPopup && (
                  <StartJobPopup
                    onClose={handleClose}
                    time={dateTime}
                    jobNumber={jobNumber}
                  />
                )}
                <IconButton
                  style={{ color: "black" }}
                  onClick={() => {
                    //  props.onExpandClicked(column);
                    column.open = !column.open;
                    setRender(render + 1);
                  }}
                >
                  {" "}
                  {column.open ? <MinimizeIcon /> : <AddIcon />}{" "}
                </IconButton>
              </div>
            </div>
            <Grid item container xs={12}>
              <Grid item xs={6} sm={2}>
                <InputLabel
                  style={{
                   fontWeight:"bold",
                    color: "#434343",
                    
                  }}
                >
                  Consignee Name
                </InputLabel>

                <InputLabel
                  style={{
                   paddingLeft:"8px",
                    color: "black",
                   
                  }}
                >
                  {column.consigneeName}
                </InputLabel>
              </Grid>

              <Grid item xs={6} sm={2}>
                <InputLabel style={{  color: "#434343",fontWeight:"bold" }}>
                  Drop Date & Time
                </InputLabel>

                <InputLabel style={{ color: "black" }}>
                  {column.dateAndTime}
                </InputLabel>
              </Grid>

              <Grid item xs={6} sm={1}>
                <InputLabel style={{  color: "#434343",fontWeight:"bold" }}>
                  Truck Number
                </InputLabel>

                <InputLabel style={{  color: "black" }}>
                  {column.vehicleRegNo}
                </InputLabel>
              </Grid>

              {/* <Grid item xs={6} sm={1}>
              <InputLabel style={{ fontSize: "13px", color: "black" }}>
                Truck Type
              </InputLabel>

              <InputLabel style={{ fontSize: "13px", color: "black" }}>
                {column.vehicleType}
              </InputLabel>
            </Grid> */}
              <Grid item xs={6} sm={2}>
                <InputLabel style={{  color: "#434343",fontWeight:"bold" }}>
                  Driver Name
                </InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  style={{ width: "114px" ,height:"26px"}}
                  onChange={(e) => {
                    column.driverName = e.target.value;
                    console.log("blurred", column.driverName);
                    updateDisableValue(column);
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <InputLabel style={{  color: "#434343" ,fontWeight:"bold"}}>
                  Driver Number
                </InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  style={{ width: "114px" ,height:"26px" }}
                  onChange={(e) => {
                    column.driverContactNo = e.target.value;
                    console.log("blurred", column.driverNumber);
                    updateDisableValue(column);
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <InputLabel style={{  color: "black" }}>
                  <img src="./location-pin.svg" /> {column.dropAddress}
                </InputLabel>
              </Grid>
            </Grid>
            {column.open && (
              <>
                <Table>
                  <TableBody>
                    <TableRow style={{ borderTop:"1px solid #DCDCDC"}}>
                      <TableCell style={{ borderBottom: "none" }}>
                        <InputLabel style={{ color: "#777777" ,borderBottom:"none"}}>
                          Container Number
                        </InputLabel>
                      </TableCell>

                      <TableCell style={{ borderBottom: "none" }}>
                        <InputLabel style={{  color: "#777777" }}>
                          ISO Code
                        </InputLabel>
                      </TableCell>

                      <TableCell style={{ borderBottom: "none" }}>
                        <InputLabel style={{  color: "#777777" }}>
                          Pickup
                        </InputLabel>
                      </TableCell>

                      <TableCell style={{ borderBottom: "none" }}>
                        <InputLabel style={{  color: "#777777" }}>
                          Token Number
                        </InputLabel>
                      </TableCell>

                      <TableCell style={{ borderBottom: "none" }}>
                        <InputLabel style={{  color: "#777777" }}>
                          Token Slot
                        </InputLabel>
                      </TableCell>
                      <TableCell style={{ borderBottom: "none" }}>
                        <InputLabel style={{  color: "#777777" }}>
                          eToken
                        </InputLabel>
                      </TableCell > 
                    </TableRow>

                    {column.requestContainerList.map((container, inx) => (
                      <TableRow>
                        <TableCell>
                          <InputLabel
                            style={{  color: "#000000" }}
                          >
                            {container.container_number}
                          </InputLabel>
                        </TableCell>

                        <TableCell>
                          <InputLabel
                            style={{ color: "#848484" }}
                          >
                            {container.iso_code}
                          </InputLabel>
                        </TableCell>

                        <TableCell>
                          <InputLabel
                            style={{  color: "black" }}
                          >
                            {container.pickupLocation}
                          </InputLabel>
                        </TableCell>

                        <TableCell>
                          <InputLabel
                            style={{  color: "black" }}
                          >
                            {container.tokenOut}
                          </InputLabel>
                        </TableCell>

                        <TableCell>
                          <InputLabel
                            style={{  color: "black" }}
                          >
                            {container.tokenOutDate}{" "}
                            {container.tokenOutSlotFrom}-
                            {container.tokenOutSlotTo}
                          </InputLabel>
                        </TableCell>
                        <TableCell>
                          <img
                            src="./download_doc.svg"
                            onClick={() => {
                              onFileDownload(
                                column.referenceNumber,
                                container.container_number
                              );
                            }}
                          />
                          <Link
                             style={{textDecoration:"underline",fontSize:"16px"}}
                            onClick={() => {
                              onFileDownload(
                                column.referenceNumber,
                                container.container_number
                              );
                            }}
                          >
                            FCL OUT eToken
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </Card>
        ))
      ) : (
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

export default React.memo(ActiveJobCard);
