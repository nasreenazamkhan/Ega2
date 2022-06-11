
import React, {  useState } from "react";

import JobCard from "./JobCard";
import EmptyIn from "./EmptyIn";
import CustomTabs from "../../lib/components/tabs/CustomTabs";
import {  Grid,Link} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

function AssignToken() {

  const location = useLocation();
  const [referenceNumber, setReferenceNumber] = useState(location.state.referenceNumber);
  console.log("assign token ref",location.state.referenceNumber);

    const [jobs, setJobs] = useState([]);
    const [render, setRender] = useState(0);
    const [tabSelected, setTabSelected] = useState("FCL OUT");
    
    let history = useHistory();
    const [tabLabels, setTabLabels] = useState([
        "FCL OUT",
        "EMPTY IN",
       
    ]);


    // useEffect(() => {
    //   const loadPendingTokenJobs = async () => {
    //         setJobs([]);
    //         AssignTokenService.fetchPendingTokenJobs()
    //           .then((response) => {
    //             if (response.isAxiosError)
    //               setJobs([]);
    //             else {
    //               console.log("response in ::", response);
    //               setJobs(response);          
                 
    //             }
    //         })
    //         .catch((error) => {
    //           console.log("error");
    //           setJobs([]);
    //         });
    //     };
    
    //   loadPendingTokenJobs();
      
    // }, [rerender]);

    const updateJobList = (job) => {
        job.open = !job.open;
       setRender(render + 1);
  }
  
  // const reRender = () => {
  //   setRerender(rerender + 1);
  // }

  // const validate = (job) => {
  //   console.log("validate job:: ", job);
  //  // setContainersUnassigned(job.requestContainerList.length);
  //   var count = 0;
  //   job.requestContainerList.map((container, inx) => {
           
  //     if (container.tokenOut && container.tokenOutSlotFrom !== undefined && container.tokenOutSlotTo !== undefined
  //       && container.tokenOutDate && container.etokenDto) {
  //       if (container.valid !== true) {
  //         container.valid = true;
  //       //  setContainersUnassigned(containersUnassigned - 1);
       
  //       }
  //     }
  //     else {
  //       if (container.valid === true) {
  //         container.valid = false;
  //        // setContainersUnassigned(containersUnassigned + 1)
        
  //       }
  //       else
  //         container.valid = false;
      
  //     }
  //   }
      
  //   )
  //   job.requestContainerList.map((container, inx) => {
  //     if (container.valid === true)
  //       count++;
  //   })
  //   if (count === job.requestContainerList.length) {
  //     job.disable = false;
  //     setRender(render + 1);
  //   }
  // }
    return (
        <>
            
        <div className="row">
          
      
        <Grid container>
          <Grid item>
          <Link href="#" onClick={()=>{history.push("/adminDashBoard")}}>
     <span style={{ fontSize: "22px",color:'#5E5E5E' ,fontFamily:'Dubai Medium' }}>
                    Home
                      </span>
      </Link> 

          </Grid>
          <Grid item>
          <Link href="#" onClick={()=>{history.push("/tokenCount")}}>
          <span style={{ fontSize: "22px",color:'#0E1B3D',fontFamily:'Dubai Medium' }}>
                  /Assign Token
                      </span>
                      </Link>


            </Grid>
            </Grid>
            <Grid container alignItems="flex-end">
            <Grid item>
            <img src="./information-button.svg" height="18px" />
              </Grid>
            <Grid item>
            <p style={{ fontSize: "18px",color:'#0E1B3D',fontFamily:'Dubai Medium' }}>Please note:All fields are mandatory! Incomplete token details will not be updated for the container in the system</p>
            </Grid>
            </Grid>
      <br></br>
            <br></br>
          <CustomTabs
              labelList={tabLabels}
             
              onSelected={(e) => {
                console.log("selected", e);
                if (e === 0) {
               
                  setTabSelected("FCL OUT");
                 
                 
                }
                if (e === 1) {
                 
                    setTabSelected("EMPTY IN");
                  
                  
                }
                
              }}
          ></CustomTabs>
      
            </div>  
            <div className="row">
          <div className="col-md-12">
           {tabSelected==="FCL OUT" && <JobCard referenceNumber={referenceNumber}
              fclCount={location.state.fclCount}
              
                ></JobCard> }
                 {tabSelected==="EMPTY IN" && <EmptyIn
                 referenceNumber={referenceNumber}
                 emptyInCount={location.state.emptyInCount}
               
                ></EmptyIn> }
                 </div>
            </div>  
            </>
    )
    
}
export default React.memo(AssignToken);