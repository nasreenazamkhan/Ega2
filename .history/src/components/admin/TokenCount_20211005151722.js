import React, { useEffect, useState } from "react";
import { InputLabel ,Grid,Link} from "@material-ui/core";

import CollapseDataTable from "../../lib/components/table/CollapseDataTable";
import {
  COLUMN_TYPE_NUMBER,
  COLUMN_TYPE_STRING,
} from "../../lib/common/Constants";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CustomizedDataTable from "../../lib/components/table/CustomizedDataTable";

const requestDetailsCol = [
  {
    name: "Booking Number",
    type: COLUMN_TYPE_STRING,
    key: "referenceNumber",
    id: 1,
  },

  {
    name: "Booked On",
    type: COLUMN_TYPE_STRING,
    key: "creationDate",
    id: 3,
  },
  {
    name: "Containers",
    type: COLUMN_TYPE_NUMBER,
    key: "noOfContainers",
    id: 3,
  },
  {
    name: "Trucks",
    type: COLUMN_TYPE_STRING,
    key: "truckNumber",
    id: 4,
  },
  {
    name: "FCL_OUT",
    type: COLUMN_TYPE_STRING,
    key: "fclCount",
    id: 4,
  },
  {
    name: "EMPTY_IN",
    type: COLUMN_TYPE_STRING,
    key: "emptyInCount",
    id: 4,
  },


 
 
];

let remoteRequestDetailsUrl =
  "/ptms/app/api/secure/requestDetails/fetchTokenCount";

function TokenCount() {

  const [requestDetailsUrl, setRequestDetailsUrl] = useState(
    remoteRequestDetailsUrl
  );


  const actions = [{ item: 0, tip: "view", color: "#C62926", icon: "add" ,icon1:"minimize"}];
  let fmk;

  let history = useHistory();



  
  return (
    <>
         <Grid container>
          <Grid item>
           
          <Link href="#" onClick={()=>{history.push("/adminDashBoard")}}>
     <span style={{ fontSize: "22px",color:'#5E5E5E' ,fontFamily:'Dubai Medium' }}>
                Home4&nbsp;
                </span>
                    
      </Link> 

          </Grid>
          <Grid item>
         
          <span style={{ fontSize: "22px",color:'#0E1B3D',fontFamily:'Dubai Medium' }}>
                  /Assign Token
                      </span>
                   

            </Grid>
            </Grid>

      <div className="row">
        
    
    

        <div className="col">
              <CustomizedDataTable
      
        tableKeys={requestDetailsCol}
        remote={true}
        remoteUrl={requestDetailsUrl}
        dataRootKey={"elements"}
        actions={actions}
        countData={(e)=>{}}
        handleClick={(row,index,action,element) => {
          history.push('/assignToken',{referenceNumber: row.referenceNumber,fclCount:row.fclCount,emptyInCount:row.emptyInCount })
        }}
      
      />
        </div>
      </div>
    </>
  );
}
export default React.memo(TokenCount);