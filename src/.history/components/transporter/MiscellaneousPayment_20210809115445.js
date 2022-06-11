import React, { useEffect ,useState} from "react";


import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  CardContent,
  Typography,
  Paper,
  IconButton,
  Icon,
  Grid,
  TextField,
  Button,
  InputLabel,
  Card,
  withStyles
} from "@material-ui/core";

import RequestBoeService from "../../service/RequestBoeService";
import CommonService from "../../service/CommonService";
import CustomTabs from "../../lib/components/tabs/CustomTabs";
import RequestContainerService from "../../service/RequestContainerService";
import { NO_DIALOG, ALERT_DIALOG, OTHER_POPUP } from "../../lib/common/Constants";





function MiscellaneousPayment(props) {

  const [request,setRequest]=useState();
  const [tabLabels, setTabLabels] = useState([
    "In Progress",
    "Delivered",
    "Completed",
  ]);
  const [allContainerList, setAllContainerList] = useState(null);
  const [tabSelected, setTabSelected] = useState("In Progress");
  const [containerList, setContainerList] = useState([]);
  const [pstate, setPstate] = useState(0);
  const [selectedContainer, setSelectedContainer] = useState();
  const [fileList, setFileList] = useState([]);
  const [showPopup, setShowPopup] = useState(NO_DIALOG);

  const TableHeader = withStyles((theme) => ({
    root: {
           fontSize:'18px',
           color:'#434343',
           fontFamily: "Dubai Medium",
    
  
    },
    
   })
  )(InputLabel);

  const StyledTableCell = withStyles((theme) => ({
    root: {
          borderBottom:'0px'
    
  
    },
    
   })
  )(TableCell);


  const TableData = withStyles((theme) => ({
    root: {
           fontSize:'16px',
           color:'#434343',
           fontFamily: "Dubai Regular",
    
  
    },
    
   })
  )(InputLabel);

  
const ContainerTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: "#E4E4E426",
      },
    },
  }))(TableRow);

  const onFileDownload = (refernceNumber, container) => {
    console.log("calling file download ::",refernceNumber);
    RequestContainerService.fetchPod(refernceNumber, container.container_number)
      .then((response) => {
        if (response.isAxiosError) throw new Error(response.status);
        else {
          console.log("calling pod list api ::",response.data.dataItems);
          setSelectedContainer(container);        
          setFileList(response.data.dataItems);
          setShowPopup(OTHER_POPUP);
         
        }
      })

      .catch(() => {
        console.log("error");
      });
  };


  const onInvoiceDownload = (invoice) => {
   
          const linkSource = `data:${invoice.filetype};base64,${invoice.fileContent}`;
          const downloadLink = document.createElement("a");
  
          downloadLink.href = linkSource;
          downloadLink.download = invoice.fileName;
          downloadLink.target = "_blank";
          // alert(downloadLink);
          downloadLink.click();
        }
 




    


    useEffect(() => {
        console.log("useEffect MiscellaneousPayment ")
        RequestBoeService.fetchInvoicesForPayment(props.statusData.bookingNumber).then((response) => {
        if (response.isAxiosError)
        setRequest();
        else{
          console.log(response);
          setRequest(response.data.dataItems[0]);
          setAllContainerList(response.data.dataItems[0].containerList)
        }
        
        
        })
        .catch(() => {
          console.log("error");
          setRequest();
        });

  

  }, [props.statusData.bookingNumber]);

  return (
    <>
    {request &&  <Card>
      <CardContent>

      <Grid container>
      <Grid item  xs={10}>
      <InputLabel
        style={{
          marginTop: "13px",
       
          fontFamily: "Dubai medium",
          fontSize: "22px",
          whiteSpace: "nowrap",
        }}
      >
        Booking # {props.statusData.bookingNumber}
      </InputLabel>

          </Grid>
          <Grid item  xs={2}>
      <Button
            variant="contained"
            style={{marginTop:'10px',float:'right'}}
            color="primary"
            onClick={() => RequestBoeService.makePaymentForInvoices(request).then((res) => {
                if (res.isAxiosError)
                console.log("error occured during payment");
                else
                { 
              
                const dataVal = {
                 serviceOwnerID: res.data.dataItems[0].serviceOwnerID,
                 serviceID: res.data.dataItems[0].serviceID,
                 serviceChannel: res.data.dataItems[0].serviceChannel,
                 licenseKey: res.data.dataItems[0].licenseKey,
                 customerReferenceNumber:
                 res.data.dataItems[0].customerReferenceNumber,
                 serviceDescription: res.data.dataItems[0].serviceDescription,
                 responseURL: res.data.dataItems[0].responseURL,
                serviceCost: res.data.dataItems[0].serviceCost,
                soTransactionID: res.data.dataItems[0].soTransactionID,
                documentationCharges: res.data.dataItems[0].documentationCharges,
                signature: res.data.dataItems[0].signature,
                popup: res.data.dataItems[0].popup,
                buEncryptionMode: res.data.dataItems[0].buEncryptionMode,
             };
             
             CommonService.postToExternalSite(
               dataVal,
               res.data.dataItems[0].gatewayUrl
             );
                }
                
                
                })
                .catch(() => {
                  console.log("error");
                  setRequest();
                })
        
            }>
            Pay Amount
          </Button>
          </Grid>
          </Grid>
      <br></br>


      
    
      <Grid container>
             <Grid item xs={4}>
             <InputLabel style={{fontSize:'26px',color:'#0E1B3D',fontFamily:'Dubai Medium'}}> Invoice Details</InputLabel>
                 </Grid>
                 <Grid item  xs={2}>
                     <InputLabel style={{fontSize:'20px',color:'#000000',fontFamily:'Dubai Medium'}}> Total Amount Paid</InputLabel>
                     </Grid>
                     <Grid item xs={2}> 
                         <InputLabel style={{fontSize:'20px',color:'#0568AE',fontFamily:'Dubai Medium'}}> {request.paidAmount}  AED</InputLabel>
                         </Grid>
                   
                    
                         <Grid item  xs={2}>
                     <InputLabel style={{fontSize:'20px',color:'#000000',fontFamily:'Dubai Medium'}}> Amount to be Paid</InputLabel>
                     </Grid>
                     <Grid item  xs={2}>
                        
                         <InputLabel style={{fontSize:'20px',color:'#0568AE',fontFamily:'Dubai Medium'}}> {request.unpaidAmount} AED</InputLabel>
                         </Grid>
                     </Grid>
                  
     <Table>
         <TableBody>
           
             <TableRow>
             <TableCell>
                 <TableHeader>Invoice Number</TableHeader>

             </TableCell>
             <TableCell>
                 <TableHeader>Invoice Date</TableHeader>

             </TableCell>
             <TableCell>
                 <TableHeader>Vat Amount</TableHeader>

             </TableCell>
             <TableCell>
                 <TableHeader>Invoice Amount</TableHeader>

             </TableCell>
             <TableCell>
                 <TableHeader>Description</TableHeader>

             </TableCell>
             <TableCell>
                 <TableHeader>Invoice</TableHeader>

             </TableCell>
             <TableCell>
                 <TableHeader>Payment Status</TableHeader>

             </TableCell>

             </TableRow>
             
             {request.invoiceList.map((invoice)=>(
               <TableRow>
                    <StyledTableCell>
                 <TableHeader>{invoice.invoiceNumber}</TableHeader>

             </StyledTableCell>
             <StyledTableCell>
                 <TableHeader>{invoice.invoiceDate}</TableHeader>

             </StyledTableCell>
             <StyledTableCell>
                 <TableHeader>{invoice.vatAmount}</TableHeader>

             </StyledTableCell>
             <StyledTableCell>
                 <TableHeader>{invoice.invoiceAmount}</TableHeader>

             </StyledTableCell>
             <StyledTableCell>
                 <TableHeader>{invoice.description}</TableHeader>

             </StyledTableCell>
             <StyledTableCell>
            <img src="./Invoice_icon.svg"  onClick={() => onInvoiceDownload(invoice)}></img>
                
             </StyledTableCell>
             <StyledTableCell>
                 <TableHeader>{invoice.paymentStatus}</TableHeader>

             </StyledTableCell>

                    </TableRow>

             ))}
            

         </TableBody>


     </Table>

      </CardContent>
      </Card> }

      <CustomTabs
            labelList={tabLabels}
            onSelected={(e) => {
              if (e === 0) {
              setContainerList(allContainerList.filter(
                  (container) =>
                    container.refStatus.code === "PEND" ||
                    container.refStatus.code === "PENTRUCK" ||
                    container.refStatus.code ==="PODUPL" ||
              container.refStatus.code ==="INPRO"
                ));
              
                setTabSelected("In Progress");
                setPstate(pstate + 1);
              }
              if (e === 1) {
                setContainerList(allContainerList.filter(
                  (container) =>
                    container.refStatus.code === "FCL_DEL" ||
                    container.refStatus.code === "PMTTOK" ||
                    container.refStatus.code === "MTTOKASGN"
                ));
             
                setTabSelected("Delivered");
                setPstate(pstate + 1);
              }
              if (e === 2) {
                setContainerList( allContainerList.filter(
                  (container) =>
                    container.refStatus.code === "MT_DEL" ||
                    container.refStatus.code === "COMPL"
                ));
              
                setTabSelected("Completed");
                setPstate(pstate + 1);
              }
            }}
          ></CustomTabs>
          {containerList.length >0 ? (<>
        <Grid item xs={12} style={{ marginLeft: "15px", marginTop: "34px" }}>
        <span
          style={{ fontSize: "18px", fontWeight: "bold", marginRight: "20px" }}
        >
          Displaying{" "}
          {(containerList.length + "").padStart(
            2,
            "0"
          )}{" "}
          containers
        </span>
      </Grid>
      <div style={{ marginTop: "23px" }}>
        <Table >
          <TableHead
            style={{
              width: "1246px",
              height: "60px",
              background: "#696F83 0% 0% no-repeat padding-box",
              border: "1px solid #DCDCDC",
              borderRadius: "10px 10px 0px 0px",
              opacity: 1,
            }}
          >
            <TableRow>
              <TableCell>
                <InputLabel style={{ color: "white" }}>
                  Container Number
                </InputLabel>
              </TableCell>

              <TableCell>
                <InputLabel style={{ color: "white" }}>
                  Container Type
                </InputLabel>
              </TableCell>

              <TableCell>
              {(tabSelected === "In Progress" || tabSelected === "Delivered")
                 && (
                <InputLabel style={{ color: "white" }}>Pickup</InputLabel>
                 )}
                {tabSelected === "Completed"
                 && (
                <InputLabel style={{ color: "white" }}>Delivered On</InputLabel>
                 )}
              </TableCell>

              <TableCell>
              {tabSelected === "In Progress"
                 && (
                <InputLabel style={{ color: "white" }}>Drop Date & Time</InputLabel>
                 )}
                 {tabSelected === "Delivered"
                 && (
                <InputLabel style={{ color: "white" }}>Delivered On</InputLabel>
                 )}
                {tabSelected === "Completed"
                 && (
                <InputLabel style={{ color: "white" }}>Completed On</InputLabel>
                 )}
              </TableCell>

              <TableCell>
                <InputLabel style={{ color: "white" }}>Drop Details</InputLabel>
              </TableCell>
             {(request.statusCode === "TRANSCONF"  ||
            request.statusCode === "STARTED") && <TableCell>
                <InputLabel style={{ color: "white" }}>POD</InputLabel>
              </TableCell>}
              {(request.statusCode === "TRANSCONF"  ||
            request.statusCode === "STARTED") && <TableCell>
                <InputLabel style={{ color: "white" }}>Track</InputLabel>
              </TableCell>}
              {(request.statusCode === "SUCC"  ||
           request.statusCode === "EXP") && (
                <TableCell>&nbsp;</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {
             containerList.map((containers, inx) => (
                <ContainerTableRow key={containers.container_number}>
                  <TableCell>
                    <div
                      style={{
                        display: "inline-flex",
                        boxSizing: "inherit",
                        textAlign: "center",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Avatar
                        style={{
                          height: "25px",
                          width: "25px",
                          backgroundColor: "#FF7F7B",
                          fontSize: "14px",
                          marginLeft: "10%",
                        }}
                      >
                        {" "}
                        {containers.initials}
                      </Avatar>

                      <InputLabel
                        style={{
                          color: "#0568AE",
                          fontWeight: "bold",
                          paddingTop: "15px",
                          textDecoration: "underline",
                        }}
                        onClick={() => {
                          openContainerPopup();
                          setSelectedContainers(containers);
                          console.log("inputLabel clicked ::");
                        }}
                      >
                        {containers.container_number}
                      </InputLabel>
                    </div>
                  </TableCell>

                  <TableCell>
                    <InputLabel
                      style={{
                        color: "#686868",
                        fontWeight: "bold",
                        paddingTop: "15px",
                      }}
                    >
                      {containers.containerType}
                    </InputLabel>
                  </TableCell>

                  <TableCell>
                  {(tabSelected === "In Progress" || tabSelected === "Delivered")
                 && (
                  <InputLabel
                  style={{
                    color: "#686868",
                    fontWeight: "bold",
                    paddingTop: "15px",
                  }}
                >
                  {containers.pickupLocation}
                  

                </InputLabel>
                 )}
                {tabSelected === "Completed"
                 && (
                  <InputLabel
                  style={{
                    color: "#686868",
                    fontWeight: "bold",
                    paddingTop: "15px",
                  }}
                >
                  {containers.fclDeliveredOn}
                  

                </InputLabel>
                 )}
                    
                  </TableCell>

                  <TableCell>
                    {tabSelected === "In Progress"
                 && (
                  <InputLabel style={{color: "#686868", fontWeight: "bold", paddingTop: "15px",}}>
                  {containers.date_time}
                </InputLabel>
                 )}
                 {tabSelected === "Delivered"
                 && (
                  <InputLabel style={{color: "#686868", fontWeight: "bold", paddingTop: "15px",}}>
                  {containers.fclDeliveredOn}
                </InputLabel>
                 )}
                {tabSelected === "Completed"
                 && (
                  <InputLabel style={{color: "#686868", fontWeight: "bold", paddingTop: "15px",}}>
                  {containers.mtDeliveredOn}
                </InputLabel>
                 )}
                  </TableCell>

                  <TableCell>
                    <img src="./location.svg" />

                    <Link
                      style={{
                        textDecoration: "underline",
                        marginLeft: "8px",
                      }}
                      onClick={() => {
                        openContainerPopup();
                        setSelectedContainers(containers);
                      }}
                    >
                      {containers.dropZoneLabel}
                    </Link>

                  </TableCell>
                  {((request.statusCode === "TRANSCONF" ||
                   request.statusCode === "STARTED" ) &&<TableCell>{containers.refStatus.code === "PODUPL" && 
                <img src="./pod_pending.svg"  onClick={(e) => {
                  setSelectedContainers(containers);
                              onFileDownload(
                                location.state.statusData.bookingNumber,
                                containers
                              );
                            
                            }}/>}
                            {(containers.refStatus.code === "PODIMPAPPR" || containers.refStatus.code === "FCL_DEL")&& 
                <img src="./pod_approved.svg"  onClick={(e) => {
                  setSelectedContainers(containers);
                              onFileDownload(
                                location.state.statusData.bookingNumber,
                                containers
                              );
                            
                            }}/>}
              </TableCell>)}
              {(request.statusCode === "TRANSCONF" ||
                  request.statusCode === "STARTED" ) &&<TableCell>
                   {(containers.refStatus.code === "INPRO" ||
                     containers.refStatus.code === "PODUPL" ||
                     containers.refStatus.code === "PODREJ" ||
                     containers.refStatus.code === "PODIMPAPPR") && 
                     <img src="./truck_track.svg"  onClick={(e) => {
                       setSelectedContainers(containers);
                                   onFileDownload(
                                     location.state.statusData.bookingNumber,
                                     containers
                                   );
                                 
                                 }}/>}
                   {(containers.refStatus.code === "PEND" ||
                     containers.refStatus.code === "PTOK" ||
                     containers.refStatus.code === "PENTRUCK" ||
                     containers.refStatus.code === "TRUCK_ASGN")&& 
                     <img src="./in_yard.svg"  onClick={(e) => {
                       setSelectedContainers(containers);
                                   onFileDownload(
                                     location.state.statusData.bookingNumber,
                                     containers
                                   );
                                 
                                 }}/>}
                   </TableCell>
}
                  
                    {containers.isActive == 0 && (
                      <TableCell><InputLabel style={{ color: "#EA2428" }}>
                        Cancelled
                      </InputLabel></TableCell>)}
                    
                  
                  {containers.isActive == 1 &&
                    (request.statusCode === "SUCC"||
                   request.statusCode === "EXP" )&& (
                      <TableCell> <img
                        src="./delete.svg"
                        onClick={() => {
                          setSelectedContainers(containers);
                          openDeleteContainerPopup();
                        }}
                      /></TableCell>
                   )}
                </ContainerTableRow>
              ))}
          </TableBody>
        </Table>
          }



      
         

     
        

    )




}
export default MiscellaneousPayment;