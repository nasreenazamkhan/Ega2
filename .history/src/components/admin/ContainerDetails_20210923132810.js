import React, { useState, useEffect } from "react";
import ContainerPopup from "../request/ContainerPopup";
import TruckDetailsPopup from "../transporter/TruckDetailsPopup";
import TrucknTokenDetailsPopup from "../transporter/TrucknTokenDetailsPopup";
import DownloadDocumentPopUp from "./DownloadDocumentPopup";
import RequestContainerService from "../../service/RequestContainerService";



function ContainerDetails(props) {

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
                </Table>}
      </Card>

  
            {containerPopup && (
              <ContainerPopup
                containers={selectedContainer}
                onClose={closeContainerPopup}
              />
            )}

{requestPopup && (
              <RequestDetailsPopUp 
                request={selectedBooking}
                onClose={()=>setRequestPopup(false)}
              />
            )}

{truckDetailsPopup && (
              <TruckDetailsPopup
                containers={selectedContainer}
                onClose={closeTruckDetailsPopup}
                bookingNumber={job.referenceNumber}
              />
            )}
      {trucknTokenDetailsPopup && (
            <TrucknTokenDetailsPopup
              containers={selectedContainer}
              onClose={ ()=>setTrucknTokenDetailsPopup(false)}
              bookingNumber={job.referenceNumber}            
              tokenType={tokenType}
            />
          )}


      }
      export default React.memo(ContainerDetails);