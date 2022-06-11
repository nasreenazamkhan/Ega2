import React, { useState, useEffect } from "react";
import ContainerPopup from "../request/ContainerPopup";
import TruckDetailsPopup from "../transporter/TruckDetailsPopup";
import TrucknTokenDetailsPopup from "../transporter/TrucknTokenDetailsPopup";
import DownloadDocumentPopUp from "./DownloadDocumentPopup";
import RequestContainerService from "../../service/RequestContainerService";
import {
  makeStyles,
  createStyles,
  Table,
  TableBody,
  InputLabel,
  TableRow,
  Box,
  Grid,
  Link,
  withStyles,
  Typography,
  Paper,
  TableHead,
  IconButton
} from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import MuiTableRow from "@material-ui/core/TableRow";

const TableCell = withStyles(() =>
    createStyles({
        head: {
            fontSize: '0.9rem',
            whiteSpace: 'nowrap',
            padding: '5px',
            fontFamily: 'Dubai Light',
            fontWeight: 600,
            color: '#848484',
            width: '160px'
        },
        body: {
            fontSize: '0.9rem',
            fontFamily: 'Dubai Light',
            fontWeight: 600,
            color: '#434343',
            padding: '8px',
        },
    }),
)(MuiTableCell);

const StyledTableRow = withStyles(() =>
  createStyles({
    root:{
    '&:nth-of-type(even)': {
      backgroundColor: '#E4E4E44D',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    }
    }
  }),
)(MuiTableRow);

function ContainerDetails(props) {
  const [containerPopup, setContainerPopup] = useState(false);
  const [trucknTokenDetailsPopup, setTrucknTokenDetailsPopup] = useState(false);
  const [downloadPopup, setDownloadPopup] = useState(false);
  const [truckDetailsPopup, setTruckDetailsPopup] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState();
  const [tokenType, setTokenType] = useState("");

  const openContainerPopup = () => {
    setContainerPopup(true);
  };

  const closeContainerPopup = () => {
    setContainerPopup(false);
  };

  const openTruckDetailsPopup = () => {
    setTruckDetailsPopup(true);
  };

  const closeTruckDetailsPopup = () => {
    setTruckDetailsPopup(false);
  };

  const onEtokenDownload = (jobRefNo, containerNumber, tokenType) => {
    RequestContainerService.fetchEtoken(jobRefNo, containerNumber, tokenType)
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
  }

  return (
    <>
      <Table style={{marginLeft:'20px', width:'96%'}}>
        <TableHead>
          <TableRow>
            <TableCell>
                Container Number
            </TableCell>
            <TableCell>
              Completed on
            </TableCell>
            <TableCell>
                Drop Details
            </TableCell>
            <TableCell>
              FCL Out
            </TableCell>
            <TableCell>
                Token
            </TableCell>
            <TableCell>
                POD
            </TableCell>
            <TableCell>
                MT IN
            </TableCell>
            <TableCell>
                Token
            </TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {props.job.containerList.map((container, inx) => (
            <StyledTableRow>
              <TableCell style={{minWidth:'220px'}}>
                <Link
                  style={{ textDecoration: "underline" }}
                  onClick={() => {
                    setSelectedContainer(container);
                    openContainerPopup();
                  }}
                >
                  {container.container_number}
                </Link>
                <span style={{ color: '#848484'}}> {" -"} {container.iso_code} </span>
              </TableCell>
              <TableCell>
                {container.mtDeliveredOn}
              </TableCell>
              <TableCell>
                <Link
                  style={{ textDecoration: "underline" }}
                  onClick={() => {
                    setSelectedContainer(container);
                    openContainerPopup();
                  }}
                >
                  {container.dropZoneLabel}
                </Link>
              </TableCell>
              <TableCell>
                <Link style={{ textDecoration: "underline" }} onClick={() => {
                  setSelectedContainer(container);
                  setTokenType("FCL_OUT");
                  setTrucknTokenDetailsPopup(true);
                }}>
                  {container.assignedTruck}
                </Link>
              </TableCell>
              <TableCell>
                <IconButton style={{padding:7}} onClick={() => onEtokenDownload(props.job.referenceNumber,
                    container.container_number, "FCL_OUT")}>
                <img src="./doc_download.svg" alt="Not available" height="26px"/>
                </IconButton>
              </TableCell>
              <TableCell>
                {container.tokenOut && 
                <IconButton style={{padding:7}} onClick={(e) => {
                  setDownloadPopup(true);
                  setSelectedContainer(container);
                }} >
                  <img src="./pod_approved.svg" height="26px"/>
                </IconButton>}
              </TableCell>
              <TableCell>
                <Link style={{ textDecoration: "underline" }} onClick={() => {
                  setSelectedContainer(container);
                  setTokenType("MT_IN");
                  setTrucknTokenDetailsPopup(true);
                }}>
                  {container.mtTruck}
                </Link>
              </TableCell>
              <TableCell>
                {container.tokenIn && 
                <IconButton style={{padding:7}} onClick={() => onEtokenDownload(props.job.referenceNumber,
                  container.container_number, "MT_IN")}>
                  <img src="./doc_download.svg" alt="Not available" height="26px"/> 
                </IconButton>}
              </TableCell>
            </StyledTableRow>))}
        </TableBody>
      </Table>
      {containerPopup && (
        <ContainerPopup
          containers={selectedContainer}
          onClose={closeContainerPopup}
        />
      )}

      {truckDetailsPopup && (
        <TruckDetailsPopup
          containers={selectedContainer}
          onClose={closeTruckDetailsPopup}
          bookingNumber={props.job.referenceNumber}
        />
      )}
      {trucknTokenDetailsPopup && (
        <TrucknTokenDetailsPopup
          containers={selectedContainer}
          onClose={() => setTrucknTokenDetailsPopup(false)}
          bookingNumber={props.job.referenceNumber}
          tokenType={tokenType}
        />
      )}

      {downloadPopup && <DownloadDocumentPopUp
        canApprove={false}
        isopen={downloadPopup}
        fileList={selectedContainer.proofOfDelivery}
        container={selectedContainer}
        onClose={() => {
          setDownloadPopup(false);
        }}
      />}
    </>
  );
}
export default React.memo(ContainerDetails);