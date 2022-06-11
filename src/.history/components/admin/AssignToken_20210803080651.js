
import React, {  useState } from "react";

import JobCard from "./JobCard";
import EmptyIn from "./EmptyIn";
import CustomTabs from "../../lib/components/tabs/CustomTabs";
import { InputLabel } from "@material-ui/core";
import { useLocation } from "react-router-dom";

function AssignToken() {

  const location = useLocation();
  const [referenceNumber, setReferenceNumber] = useState(location.state.referenceNumber);

    const [jobs, setJobs] = useState([]);
    const [render, setRender] = useState(0);
    const [tabSelected, setTabSelected] = useState("FCL OUT");
    const [selectedRows, setSelectedRows] = useState([]);
    const [pstate, setPstate] = useState(0);
  const [containersUnassigned, setContainersUnassigned] = useState(0);
  const[rerender,setRerender] = useState(0);
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

  const validate = (job) => {
    console.log("validate job:: ", job);
   // setContainersUnassigned(job.requestContainerList.length);
    var count = 0;
    job.requestContainerList.map((container, inx) => {
           
      if (container.tokenOut && container.tokenOutSlotFrom !== undefined && container.tokenOutSlotTo !== undefined
        && container.tokenOutDate && container.etokenDto) {
        if (container.valid !== true) {
          container.valid = true;
        //  setContainersUnassigned(containersUnassigned - 1);
       
        }
      }
      else {
        if (container.valid === true) {
          container.valid = false;
         // setContainersUnassigned(containersUnassigned + 1)
        
        }
        else
          container.valid = false;
      
      }
    }
      
    )
    job.requestContainerList.map((container, inx) => {
      if (container.valid === true)
        count++;
    })
    if (count === job.requestContainerList.length) {
      job.disable = false;
      setRender(render + 1);
    }
  }
    return (
        <>
            
        <div className="row">
          
          <div className="col-md-12">
           <InputLabel style={{color:'#0E1B3D',fontFamily:'Dubai Medium',fontSize:'20px'}}>Assign Token </InputLabel>
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
            </div>  
            <div className="row">
          <div className="col-md-12">
           {tabSelected==="FCL OUT" && <JobCard referenceNumber={referenceNumber}
              fclCount={location.state.fclCount}
              //  onExpandClicked={(job) => { updateJobList(job) }}
           //   validate={(job) => { validate(job) }}
           //   reRender={reRender}
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