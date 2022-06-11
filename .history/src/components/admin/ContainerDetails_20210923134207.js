import React, { useState, useEffect } from "react";
import ContainerPopup from "../request/ContainerPopup";
import TruckDetailsPopup from "../transporter/TruckDetailsPopup";
import TrucknTokenDetailsPopup from "../transporter/TrucknTokenDetailsPopup";
import DownloadDocumentPopUp from "./DownloadDocumentPopup";
import RequestContainerService from "../../service/RequestContainerService";
import {
    makeStyles,
    Table,
    TableBody,
    TableRow,
    TableCell,
  
    InputLabel,
    Box,
    Grid,
    Link,
  
    withStyles,
    Typography,
    Paper
  } from "@material-ui/core";



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

        <Table>
          <TableBody>

           <TableRow>
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    Container Number
                  </InputLabel>
                </TableCell>
             
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>Completed on</InputLabel>
                </TableCell>
          
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    Drop Details
                  </InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>FCL Out</InputLabel>
                </TableCell>
            
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    Token
                  </InputLabel>
                </TableCell>
               <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    POD
                  </InputLabel>
                </TableCell>
             <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    MT IN
                  </InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                  Token
                  </InputLabel>
                </TableCell>
               
              
              </TableRow>
              {props.job.containerList.map((container, inx) => (
                <TableRow>
                  <TableCell>
                    <Link
                      style={{ textDecoration: "underline" }}
                      onClick={() => {
                        setSelectedContainer(container);
                        openContainerPopup();
                      }}
                    >
                      {container.container_number} 
                    </Link>
                    <span> {container.iso_code} </span>
                  </TableCell>
            
                 <TableCell>
                  <InputLabel style={{ color: "#848484" }}>{container.mtDeliveredOn}</InputLabel>
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
                    <Link style={{ textDecoration: "underline" }}  onClick={() => {
                        setSelectedContainer(container);
                        setTokenType("FCL_OUT");
                        setTrucknTokenDetailsPopup(true);
                      }}>
                      {container.assignedTruck}
                    </Link>
                  </TableCell>
                  <TableCell>
                  <img
        src="./doc_download.svg" alt="Not available"
        onClick={()=>onEtokenDownload(job.referenceNumber, 
         container.container_number, "FCL_OUT")}
       
              />
              </TableCell>
               
                  <TableCell>
                  {container.tokenOut &&  <img src="./pod_approved.svg" onClick={(e) => {
                    setDownloadPopup(true);
                    setSelectedContainer(container);
                  }} />}
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
                {container.tokenIn &&  <img
        src="./doc_download.svg" alt="Not available"
        onClick={()=>onEtokenDownload(job.referenceNumber, 
         container.container_number, "MT_IN")}
       
              />}
              </TableCell>
                


                </TableRow>))}
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
              onClose={ ()=>setTrucknTokenDetailsPopup(false)}
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