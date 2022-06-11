import React, { useEffect, useState } from "react";
import { InputLabel, Table, TableBody, TableHead, TableRow, Paper, Grid, Link, Breadcrumbs } from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import CollapseDataTable from "../../lib/components/table/CollapseDataTable";
import {
  COLUMN_TYPE_STRING
} from "../../lib/common/Constants";
import { useHistory } from "react-router";

const truckDetailsCol = [
  {
    name: "Truck Number",
    type: COLUMN_TYPE_STRING,
    key: "truckNo",
    id: 1,
  },
  {
    name: "Plate Category",
    type: COLUMN_TYPE_STRING,
    key: "plateCategory",
    id: 1,
  },
  {
    name: "Plate Code",
    type: COLUMN_TYPE_STRING,
    key: "plateCode",
    id: 1,
  },
  {
    name: "Traffic File No",
    type: COLUMN_TYPE_STRING,
    key: "trafficFileNo",
    id: 1,
  },
  {
    name: "Passive RFID",
    type: COLUMN_TYPE_STRING,
    key: "passiveRFID",
    id: 1,
  },
  {
    name: "City Code",
    type: COLUMN_TYPE_STRING,
    key: "regPlace",
    id: 1,
  },
  {
    name: "Remarks",
    type: COLUMN_TYPE_STRING,
    key: "remarks",
    id: 1,
  },


]

const useStyles = makeStyles((theme) => ({
  separator: {
    color: '#EA2428'
  },
  breadCrumRoot: {
    fontWeight: 600,
    fontSize: '17px'
  },
}));


let truckDetailsUrl = "/ptms/app/api/secure/transporter/fetchTruckTabularData";

function TrucksAvailable() {
  const classes = useStyles();
  const [pstate, setPstate] = useState(0);
  let history = useHistory();
  return (
    <>
      <Grid item xs={12} style={{ marginBottom: '20px', marginTop: '20px' }}>
        <Breadcrumbs aria-label="breadcrumb" classes={{
          root: classes.breadCrumRoot,
          separator: classes.separator,
        }}>
          <Link onClick={() => history.push("/transporterDashboard")} style={{ color: '#848484' }}>
            Home
          </Link>
          <span style={{ color: '#0E1B3D' }}>
          Trucks Available
          </span>
        </Breadcrumbs>
      </Grid>
      <InputLabel style={{ fontSize: "25px", color: "red", marginTop: "15px" }}>Trucks Available</InputLabel>
      <div className="row">
        <div className="col">
          <CollapseDataTable
            refresh={pstate}
            tableKeys={truckDetailsCol}
            remote={true}
            remoteUrl={truckDetailsUrl}
            dataRootKey={"elements"}
            chkbox={false}
            collapseChkBox={false}
            countData={(e) => { }}
          />
        </div>
      </div>
    </>

  )

}

export default React.memo(TrucksAvailable)