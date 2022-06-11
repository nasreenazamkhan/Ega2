import React, {useEffect, useState } from "react";
import {
  makeStyles,

  Button
} from "@material-ui/core";


import { useLocation } from "react-router-dom";
import { InputLabel } from "@material-ui/core";
import AssignTruckAndDriverService from "../../service/AssignTruckAndDriverService";
import AssignDriverSubForm from './AssignDriverSubForm';
import { useHistory } from "react-router-dom";
import JobConfirmationPopUp from './JobConfirmationPopUp';

const useStyles = makeStyles({
  leftPane: {
    width: "60%",
  },
  rightPane: {
    width: "40%",
  },
  splitScreen: {
    display: "flex",
    flexDirection: "row",
  },



 
});



function AssignDriver() {

  const location = useLocation();
  let containerParam="";
  const[jobList,setJobList]=useState([]);
  const [disableSend,setDisableSend]=useState(true);
  const [showConfirmation,setShowConfirmation]=useState(false);
  const [savedJobs,setSavedJobs]=useState([]);
  let history = useHistory();
  
  if(location.state !== undefined)
  {
     containerParam=location.state.containerData;
  }

  const [containerList,setContainerList] = useState(
    containerParam
      
  );

  const updateJobList=(driverInfo)=>
  {
    var job=jobList.find(x=>{return x.jobKey===driverInfo.jobKey})
    
    job.driverName=driverInfo.driverName;
    job.driverContactNo=driverInfo.driverContactNo;
    if(job.driverName!==undefined && job.driverContactNo!==undefined)
    {
    job.valid=true;
    }
    var ind=jobList.findIndex(x=>x.jobKey===driverInfo.jobKey)
    jobList[ind]=job;
    let e=jobList.some( job =>job.valid===undefined);
    setDisableSend(jobList.some( job =>job.valid===undefined));
    
  }

 
 
  

 

  const [trucksGrouped,setTrucksGrouped] = useState([]);


    useEffect(() => {
      console.log("inside load trucks grp");
    

      const loadGroupingByTrucks = async () => {
      
        var job={requestContainerList: containerList}
        console.log("job",job);
        AssignTruckAndDriverService.fetchGroupingByTrucks(job)
          .then((response) => {
            if (response.isAxiosError) throw new Error(response.status);
            else
            {
              console.log("printing",response);
              setTrucksGrouped(response.data.dataItems);
              setJobList(response.data.dataItems);

            } 
           
          })
           
         
          .catch(() => {
            console.log("error");
          });
      };

      loadGroupingByTrucks();
    }, [containerList]);

  return (
    <>
      <div className="row">
    
        <div className="col-md-4">
          <InputLabel
            style={{ fontSize: "20px", marginTop: "30px", color: "black" }}
          >
            Confirm Details
          </InputLabel>
        </div>
        <div className="col-md-6">
          <Button
            variant="contained"
            color="secondary"
            style={{ float: "right", marginTop: "20px" }}
             disabled={disableSend}
            className="float-right"
            onClick={() => {
              AssignTruckAndDriverService.sendJobForApproval({jobList})
              .then((response) => {
                if (response.isAxiosError) throw new Error(response.status);
                else
                {
                   setSavedJobs(response.data.dataItems);
                   setShowConfirmation(true);
                }
                 
                  //history.push("/jobConfirmation",{jobList:response.data.dataItems});
              })
              .catch(() => {
                console.log("error");
              });
          }
    
            //   console.log("assign trucks containers is ", containerList);
            //   history.push("/assignDriver", { containerData: containerList });
            }
          >
           Send For Approval
          </Button>
        </div>
        <div className="col-md-2">
            </div>
      </div>

      {
      trucksGrouped.map(job => (
            <AssignDriverSubForm job={job}
             key={job.jobKey} 
             onDriverDetailsEntered={(driverInfo)=>{updateJobList(driverInfo)}}
             >
             </AssignDriverSubForm>

        ))}

        {showConfirmation && <JobConfirmationPopUp jobList={savedJobs} 
        onClose={()=>history.push("/myJobs",{tabSelected:1})}/>}

     
    </>
  );
}
export default React.memo(AssignDriver);
