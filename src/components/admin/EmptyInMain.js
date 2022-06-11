import React, { useState, useEffect } from "react";
import JobService from "../../service/JobService";
import EmptyIn from "./EmptyIn";
import Button from "@material-ui/core/Button";
import SuccessToast from "../../lib/components/toast/SuccessToast";
import {Paper,Grid,Typography} from "@material-ui/core";


function EmptyInMain() {
  const [jobs, setJobs] = useState([]);
  const [enableUpdate, setEnableUpdate] = useState(false);
  const [updateList, setUpdateList] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [showToaster, setShowToaster] = useState(null);

  useEffect(() => {
    const loadEmptyInContainers = async () => {
      JobService.loadEmptyInContainers()
        .then((response) => {
          if (response.status==='fail') setJobs([]);
          else {
            setJobs(response.data.dataItems);
          }
        })
        .catch(() => {
          console.log("error");
        });
    };

    loadEmptyInContainers();
  }, []);

  const updateJobs = (job) => {
    var jobExists=jobList.some((x)=>x.referenceNumber===job.referenceNumber);
  
     if(!jobExists)
     {
      jobList.push(job);
     }
     else
     {
      jobList.map(x => (x.referenceNumber === job.referenceNumber ? { ...x, valid: job.valid } : x));
     }

     console.log("jobList",jobList);
    
  setEnableUpdate(!jobList.some((x)=>x.valid!==true));
  
    }
  

  const update = () => {
    console.log("jobList to be saved",jobList);
      
    JobService.updateTokenInDetails(jobList)
      .then((response) => {
        if (response.isAxiosError)
          console.log("error occured during processing request");
        else {
          console.log("jobs original",jobs);
          setEnableUpdate(false);

          jobList.forEach(function (item, index) {
            var found = jobs.find((x) => {
              return x.referenceNumber === item.referenceNumber;
            });

            item.requestContainerList.forEach( function(container, index)
            {
              var ind1 =   found.requestContainerList.findIndex((x)=>
              {return x.container_number ===container.container_number }
             
              );
              found.requestContainerList.splice(
                ind1,1
              );
              found.noOfContainers = found.noOfContainers - 1;
             
            }
            
            
          )

          var ind = jobs.findIndex(
            (x) =>{ return x.referenceNumber === item.referenceNumber}
          );

          if(found.noOfContainers===0)
          {
            jobs.splice(
              ind,1
            );
          }
          else
          {
          jobs[ind] = found;
          }
          setShowToaster("APPROVE");

            

          });
        }
      })
      .catch(() => {
        console.log("error");
       });
  }

  return (
    <>
      <div className="row">
        <div className="col-md-6"> </div>
        <div className="col-md-6">
          <Button
            variant="contained"
            color="secondary"
            style={{ float: "right" }}
            disabled={!enableUpdate}
            onClick={() => {
              update();
            }}
          >
            Update
          </Button>
        </div>
      </div>

      {jobs && jobs.length>0?
        (jobs.map((job, indx) => (
          <EmptyIn
            job={job}
            key={job.referenceNumber}
            index={indx}
            updateJobList={(job) => {
              updateJobs(job);
            }}
          ></EmptyIn>
        ))):(<Paper elevation={5} style={{ borderRadius: 8, padding: '30px', marginTop: 20, minWidth: '760px', minHeight: '100px', color: '#FF7171' }}>
        <Grid container direction="row" spacing={5}>
          <Grid item sm={12} xs={12}>
            <Typography variant="subtitle1" style={{ fontSize: '16px', textAlign: 'center' }}>
              <b>{'No records found'}</b></Typography>
          </Grid>
        </Grid>
      </Paper>)}


{showToaster==='APPROVE' && 
          <SuccessToast
          icon="check_circle"
          title="Token assigned successfully"
          message="*Item moved to transporter active job pool"
          showToast={()=>{setShowToaster(false)}}
          position="top-right"
        />}

    </>
  );
}

export default React.memo(EmptyInMain);
