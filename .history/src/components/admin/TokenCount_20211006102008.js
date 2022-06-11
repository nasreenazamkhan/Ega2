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
import { withStyles, makeStyles, createStyles } from "@material-ui/core/styles";
import { IconButton, Icon, InputAdornment, OutlinedInput } from "@material-ui/core";

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
    id: 2,
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
    id: 5,
  },
  {
    name: "EMPTY_IN",
    type: COLUMN_TYPE_STRING,
    key: "emptyInCount",
    id: 6,
  },


 
 
];


const useOutlinedInputStyles = makeStyles(theme => ({
  root: {
    "& $notchedOutline": {
      borderColor: "#BDBDBD",
      color: "#686868",
      borderRadius: '3px',
      boxShadow: '0px 0px 5px #00000029',
    },
    '&$focused $notchedOutline': {
      borderColor: "#BDBDBD",
      borderWidth: 1.5,
      boxShadow: '0px 0px 5px #00000029',
    },
    '&:hover $notchedOutline':{
      borderColor: "#BDBDBD !important",
      boxShadow: '0px 0px 5px #00000029',
    },
    "& .MuiInputBase-input": {
      fontFamily: 'Dubai Light',
      fontSize: '14px',
      fontWeight: 600,
    },
    "& .MuiOutlinedInput-input": {
      paddingLeft: '10px',
      paddingRight: '10px',
    },
  },
  focused: {},
  notchedOutline: {},
}));

let remoteRequestDetailsUrl =
  "/ptms/app/api/secure/requestDetails/fetchTokenCount";

function TokenCount() {

  const [requestDetailsUrl, setRequestDetailsUrl] = useState(
    remoteRequestDetailsUrl
  );
  const outlinedInputClasses = useOutlinedInputStyles();
  const [searchValue, setSearchValue] = useState("");
  const [pstate, setPstate] = useState(0);


  const actions = [{ item: 0, tip: "view", color: "#C62926", icon: "add" ,icon1:"minimize"}];
  let fmk;

  let history = useHistory();

  
  const handleSearchClick = async () => {

    let finalURL =
    "/ptms/app/api/secure/requestDetails/fetchTokenCount"+
      
      "?bookingNumber=" +
      searchValue;
    console.log("url", finalURL);
    setRequestDetailsUrl(finalURL);
    setPstate(pstate + 1);
  }




  
  return (
    <>
         <Grid container>

  
        <Grid item xs={10} sm={8}>
          <OutlinedInput
            style={{ width: '1000px', height: '46px' }}
            placeholder="Search with Booking Number"
            classes={outlinedInputClasses}
            variant="outlined"
            fullWidth
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            color="secondary"
           
           
            startAdornment= {
              <InputAdornment position="start">
                <IconButton onClick={handleSearchClick}>
                  <Icon >search</Icon>
                </IconButton>
              </InputAdornment>
            }
            endAdornment= {
              <InputAdornment >
                <IconButton onClick={()=>{
                  setSearchValue("");
                  setRequestDetailsUrl("/ptms/app/api/secure/requestDetails/fetchTokenCount");
                  setPstate(pstate + 1);}}>
                <Icon >clear</Icon>
                </IconButton>
              </InputAdornment>
                }
              
          />
        </Grid>
        </Grid>
       

        <Grid container>
          <Grid item>
           
          <Link href="#" onClick={()=>{history.push("/adminDashBoard")}}>
     <span style={{ fontSize: "22px",color:'#5E5E5E' ,fontFamily:'Dubai Medium' }}>
                Home&nbsp;
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
         refresh={pstate}
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