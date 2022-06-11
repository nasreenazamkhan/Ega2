import React, { useEffect, useState } from "react";
import { Card } from "@material-ui/core/";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ApplnFileUpload from "../../lib/components/fileupload/ApplnFileUpload";
import { OTHER_POPUP, NO_DIALOG } from "../../lib/common/Constants";
import UploadDocumentPopup from "./UploadDocumentPopup";
import Box from "@material-ui/core/Box";
import { InputLabel } from "@material-ui/core";
import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import TableHead from "@material-ui/core/TableHead";
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

const useStyles = makeStyles({
  leftPane: {
    width: "60%",
  },
  rightPane: {
    width: "40%",
  },
  matCell: {
    fontSize: "14px",
    height: "160px",
    textAlign: "center",
    borderRight: "1px solid grey",
    width: "500px",
  },
  matCell1: {
    fontSize: "14px",
    height: "160px",
    textAlign: "center",
    borderRight: "1px  grey",
    width: "500px",
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
  style: { width: "12rem", height: "6rem" },
  color: "black",
  textAlign: "center",
  align: "right",
  marginTop: "5px",
  border: "2px dashed #ccc",
};

const defaultProps2 = {
  m: 1,
  style: { width: "10rem", height: "2rem"},
  color: "Black",
  textAlign: "center",
  align: "right",
  marginTop: "2px",
  border: "2px  #ccc",
  bgcolor: "warning.main"
  
};

export default function JobDetailsCard(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [render, setRender] = useState(0);
  const classes = useStyles();
  const [viewPopup, setViewPopup] = useState(false);
  const [containerList, setContainerList] = useState([]);


  useEffect(() => { }, [render]);
  
  const list = (anchor,requestContainerList) => (
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
      <br></br>
      <Divider></Divider>
      <br></br>
      <Table size="small" style={{ width: "320px", marginLeft: "12px" }}>
        <TableHead>
          <Paper elevation={0} style={{ marginTop: "5px" }}>
            <TableRow>
              <TableCell style={{ fontSize: "13px", color: "grey" }}>
                Container Number
              </TableCell>
              <TableCell style={{ fontSize: "13px", color: "grey" }}>
                ISO Code
              </TableCell>
            </TableRow>
          </Paper>
        </TableHead>
        <TableBody>
          {requestContainerList.map((container, ind) => (
            <TableRow>
              <Paper variant="outlined" style={{ marginTop: "5px" }}>
                <TableCell style={{ fontSize: "13px", color: "grey" }}>
                  {container.container_number}
                </TableCell>
                <TableCell style={{ fontSize: "13px", color: "black" }}>
                  {container.iso_code}
                </TableCell>
              </Paper>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const openPopup = () => {
    console.log("Delivered clicked");
    setShowPopup(true);
    setRender(render + 1);
  };

  

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      {props.columnsValues.map((value, inx) => (
      <Card style={{ width: "1000px", height: "200px" }}>
        <Table>
          <TableBody>
            <TableRow>
              {props.tabSelected === "In Progress" && (
                <TableCell>
                  <Grid item xs={5}>
                    <InputLabel style={{ fontSize: "13px", color: "grey" }}>
                      Job Start Date
                    </InputLabel>
                  </Grid>
                  <Grid item xs={5}>
                    <InputLabel style={{ fontSize: "13px", color: "black" }}>
                      {value.createdDate}
                    </InputLabel>
                  </Grid>
                </TableCell>
              )}
              {props.tabSelected === "Delivered" && (
                <TableCell>
                  <Grid item xs={5}>
                    <InputLabel style={{ fontSize: "13px", color: "grey" }}>
                      Delivered on
                    </InputLabel>
                  </Grid>
                  <Grid item xs={5}>
                    <InputLabel style={{ fontSize: "13px", color: "black" }}>
                      10/20/2020
                    </InputLabel>
                  </Grid>
                </TableCell>
              )}
              {props.tabSelected === "Completed" && (
                <TableCell>
                  <Grid item xs={5}>
                    <InputLabel style={{ fontSize: "13px", color: "grey" }}>
                      Completed Date
                    </InputLabel>
                  </Grid>
                  <Grid item xs={5}>
                    <InputLabel style={{ fontSize: "13px", color: "black" }}>
                      10/20/2020
                    </InputLabel>
                  </Grid>
                </TableCell>
              )}
              <TableCell>
                <Grid item xs={5}>
                  <InputLabel style={{ fontSize: "13px", color: "grey" }}>
                    Job Number
                  </InputLabel>
                </Grid>
                <Grid item xs={5}>
                  <InputLabel style={{ fontSize: "13px", color: "black" }}>
                  {value.referenceNumber}
                  </InputLabel>
                </Grid>
              </TableCell>
              {props.tabSelected === "Delivered" && (
                <TableCell>
                  <Grid item xs={5}>
                    <InputLabel style={{ fontSize: "13px", color: "grey" }}>
                      order Number
                    </InputLabel>
                  </Grid>
                  <Grid item xs={5}>
                    <InputLabel style={{ fontSize: "13px", color: "black" }}>
                      #12345
                    </InputLabel>
                  </Grid>
                </TableCell>
              )}
              <TableCell>
                <Grid item xs={2}>
                  <InputLabel style={{ fontSize: "13px", color: "grey" }}>
                    Token#
                  </InputLabel>
                </Grid>
                <Grid item xs={2}>
                  <InputLabel style={{ fontSize: "13px", color: "black" }}>
                  {value.tokenNo}
                  </InputLabel>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid item xs={7}>
                  <InputLabel style={{ fontSize: "13px", color: "grey" }}>
                    Number of containers
                  </InputLabel>
                </Grid>
                <Grid item xs={7}>
                    <Link
                      style={{ color: "red" }}
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
        {list('right',containerList)}
      </SwipeableDrawer>
              </TableCell>
              <TableCell>
                <Link
                  style={{ color: "red" }}
                  component="button"
                  variant="body2"
                >
                  Track
                </Link>
              </TableCell>
              {props.tabSelected === "In Progress" && (
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ textTransform: "none" }}
                    onClick={openPopup}
                  >
                    Delivered?
                  </Button>
                </TableCell>
              )}
              {props.tabSelected === "Delivered" && (
                <TableCell>
                  <Box {...defaultProps2}>POD not verified</Box>
                </TableCell>
              )}
              {props.tabSelected === "Completed" && (
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ textTransform: "none" }}
                  >
                    Claim Amount
                  </Button>
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
        <TableRow>
          <TableCell className={classes.matCell}>
            <div className="row">
              <Box {...defaultProps}></Box>

              <img src="../from_to.svg" style={{ marginTop: "7px" }} />
              <Box {...defaultProps1}></Box>
              <img src="../from_to.svg" style={{ marginTop: "7px" }} />
              <Box {...defaultProps}></Box>
            </div>

            <Divider orientation="vertical" flexItem />
          </TableCell>
          <TableCell className={classes.matCell1}>
            <Box
              style={{
                border: "2px dashed #ccc",
                height: "90px",
                width: "500px",
                marginBottom: "25px",
              }}
            >
              <div className="row">
              <Box style={{ height: '30px', width: '200px', border: "2px solid #ccc", marginTop: "30px", marginLeft: "30px" }}>
              {value.vehicleRegNo}
              </Box>
              <Box style={{ height: '30px', width: '200px', border: "2px solid #ccc", marginTop: "30px", marginLeft: "30px" }}>
              {value.vehicleType}
              </Box>
              </div>
              </Box>
           
          </TableCell>
        </TableRow>
        </Card>
        ))}
      {showPopup && <UploadDocumentPopup onClose={handleClose} />}
    </>
  );
}
