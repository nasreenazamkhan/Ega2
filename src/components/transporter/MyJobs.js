import React, { useEffect, useState } from "react";
import CustomTabs from "../../lib/components/tabs/CustomTabs";
import MyJobDetailsCard from "./MyJobDetailsCard";
import { getHttp } from '../../lib/common/HttpService';
import { useLocation } from "react-router-dom";
import ActiveJobCard from "./ActiveJobCard";
import * as endpointContants from '../../utils/ptmsEndpoints';
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";

function MyJobs() {
    const [tabLabels, setTabLabels] = useState([
        "NEW JOBS",
        "PENDING JOBS",
        "ACTIVE JOBS",
    ]);
   
   
  
    const location = useLocation();
    console.log("location",location)
    let tab="";
    
    if(location.state !== undefined)
    {
       tab=location.state.tabSelected;
  }
  
    else {
      tab = 2;
  }

    console.log("tabs",tab)
  
  const [tabSelected, setTabSelected] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [pstate, setPstate] = useState(0);
  const [columnsValues, setColumnsValues] = useState([]);
  const [rerender, setRerender] = useState(0);
  let remoteUrl = '/ptms/app/api/secure/trip/searchJobs';
  let history = useHistory();


useEffect(() => {
 

  const loadTabData = async () => {
    console.log("useEffect called",tab)
    if(tab)
    {
     let jobStatus="";
    if(tab===1)
    {
      jobStatus="PTOK";
      setTabSelected("PENDING JOBS");
    }
    else if(tab===2)
    {
      jobStatus="ACT";
      setTabSelected("ACTIVE JOBS")
    }
    
      let urlRemote = `${endpointContants.searchJobs}?jobStatus=${jobStatus}`;

    getHttp({ url: urlRemote }, false)
      .then(response => {
        if (response.isAxiosError) {
          setColumnsValues([]);
        }
        else
        setColumnsValues(response);
       
       

      })
      .catch(error => {
 
      })
  
    setSelectedRows([]);
    }
    
  };

  loadTabData();
}, [tab,rerender]);


// const updateJobList = (column) => {
//   column.open = !column.open;
// //setRender(render + 1);
// }

  const reRender = () => {
    setTabSelected("ACTIVE JOBS");
   
    setRerender(rerender + 1);
    
}

console.log("tabSelected",tabSelected)
    return (
        <>
            
      <div className="row">
          <div className="col-md-12">
            <Typography variant="h2" style={{ textAlign: "left" }}>My Jobs</Typography>
            <br></br>
          <CustomTabs
              labelList={tabLabels}
              defaultSelected={tab}
              onSelected={(e) => {
                console.log("selected", e);
                if (e === 0) {
               
                  setTabSelected("NEW JOBS");
                  setSelectedRows([]);
                  setPstate(pstate + 1);
                }
                if (e === 1) {
                  setColumnsValues([]);
                  remoteUrl = remoteUrl + "?jobStatus=PTOK"
                  getHttp({ url: remoteUrl }, false)
                    .then(response => {
                      if (response.isAxiosError) {
                        setColumnsValues([]);
                        console.log("axisoerror");
                      } else {
                        setColumnsValues(response);
                        console.log("response for pending jobs", response);
                      }
                    })
                    .catch(error => {
                      console.log("error axios");
                      setColumnsValues([]);
                    })
                  setTabSelected("PENDING JOBS");
                  setSelectedRows([]);
                  setPstate(pstate + 1);
                }
                if (e === 2) {
                  setColumnsValues([]);
                  remoteUrl = remoteUrl +"?jobStatus=ACT"
                  getHttp({ url: remoteUrl }, false)
                    .then(response => {
                      if (response.isAxiosError) {
                        setColumnsValues([]);
                        console.log("axisoerror");
                      }
                      else {
                        setColumnsValues(response);
                        console.log("response for Active jobs", response);
                      }
              })
              .catch(error => {
                console.log("error axios");
                setColumnsValues([]);
              })
                  setTabSelected("ACTIVE JOBS");
                  setSelectedRows([]);
                  setPstate(pstate + 1);
              
         
                }
              }}
          ></CustomTabs>
        </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {tabSelected === "NEW JOBS" &&  history.push("/searchRequests") }
            {tabSelected === "PENDING JOBS" && <MyJobDetailsCard tabSelected={tabSelected} columnsValues={columnsValues} />}
            {tabSelected === "ACTIVE JOBS" && <ActiveJobCard tabSelected={tabSelected} columnsValues={columnsValues} rerender={reRender} />}
          </div>
        </div>
            
            </>
    )
}

export default React.memo(MyJobs);