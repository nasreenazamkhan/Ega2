import React, { useState ,useEffect} from "react";
import { FormProvider, useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import { InputLabel, Paper,TextBox } from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import { withStyles ,createStyles} from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import moment from "moment";
import Button from "@material-ui/core/Button";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers";
const ContainerSummary = (props) => {

  console.log("container summary,",props.containerSummary);


  const [viewLocation, setViewLocation] = useState(false);
  const [showColumns]=useState(!props.containerSummary.containers.multiLocAndTime);

  let schema = Yup.object().shape({
    requesterName: Yup.string().required("Requester name is required"),
    requesterContactNumber: Yup.string()
    .required("Requester Contact  Number is Required")
    .matches(
      /^[0-9]\d{11,11}$/,
      "Format must be 971xxxxxxxxx"
    ),
  });

  const { register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema),
	mode: "onSubmit",
	reValidateMode: "onChange",

  });

  const onSubmit = (values) => {
    console.log(values);

    // ${process.env.REACT_APP_API_BASE}/api/v1/users/login/
  

  }

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });



  const TableCell = withStyles({
    root: {
      borderBottom: "none",
    },
  })(MuiTableCell);


  const renderFormattedDate=(date)=>
  {
    return moment(date, "YYYY-MM-DDThh:mm").format(
      "YYYY-MM-DD HH:mm" )
  }



  const hiddenFileInput = React.useRef(null);
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = e => {
    const file = e.target.files[0];
    let promiseData = new Promise(
      (resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          resolve(event.target.result);
        };

        reader.onerror = (err) => {
          reject(err);
        };

        reader.readAsDataURL(file);
      }
    );

    promiseData.then((result) => {
      const contentArr = result.split(",");
      const fileType = contentArr[0]
        .replace("data:", "")
        .replace(";base64", "");
     
   
        props.containerSummary.containers.fileContent = contentArr[1];
        props.containerSummary.containers.fileType = fileType;
         props.containerSummary.containers.fileName = file.name;
         
        
  });
}


 

  return (
    <>
     
        <form onSubmit={handleSubmit(onSubmit)}>
   
         
            <Table size="small" style={{ marginLeft: "12px" }}>
    
    <TableBody>
    
        <TableRow>
             <TableCell colSpan={2}>
            <Grid container spacing={4}>
            <Grid item >
            <InputLabel style={{ fontSize: "18px", color: "#000000" ,fontFamily:'Dubai Regular'}}  >    
             Total Containers
            </InputLabel>
            </Grid>
            <Grid item >
            <InputLabel style={{ fontSize: "18px", color: "#000000" ,fontFamily:'Dubai Regular'}}  >    
            {props.containerSummary.containers.containerList.length}
            </InputLabel>
            </Grid>
            <Grid item >
            <InputLabel style={{ fontSize: "18px", color: "#000000" ,fontFamily:'Dubai Regular'}}  >    
             Total Trucks
            </InputLabel>
            </Grid>
            <Grid item >
            <InputLabel style={{ fontSize: "18px", color: "#000000" ,fontFamily:'Dubai Regular'}}  >    
            {props.containerSummary.containers.truckNumber}
            </InputLabel>
            </Grid>
            </Grid>
              </TableCell> 
</TableRow>
        {showColumns && 
        <>
        <TableRow>
        <TableCell  style={{fontSize: "18px", color: "#000000" ,fontFamily:'Dubai Regular'}}>
          Drop Details
          </TableCell>
          <TableCell  colSpan={3} style={{ fontSize: "16px", color: "#686868" ,fontFamily:'Dubai Regular'}}>
          {props.containerSummary.containers.containerList[0].dropAddress}
          </TableCell>
          </TableRow>
          <TableRow> 
          <TableCell style={{ fontSize: "18px", color: "#000000" ,fontFamily:'Dubai Regular'}}>
          Drop Date and Time
          </TableCell>
          <TableCell   colSpan={3} style={{ fontSize: "16px", color: "#686868" ,fontFamily:'Dubai Regular'}}>
           {props.containerSummary.containers.date_time}
          </TableCell>
          </TableRow>
          <TableRow>
          <TableCell   style={{ fontSize: "18px", color: "#000000" ,fontFamily:'Dubai Regular'}}>
          Drop Interval
          </TableCell>
       
          <TableCell  colSpan={3}  style={{ fontSize: "16px", color: "#686868" ,fontFamily:'Dubai Regular'}}>
                   {props.containerSummary.containers.dropInterval }   
          </TableCell>
          </TableRow>
          
          </>}
          <TableRow>
          <TableCell>
          <Grid container spacing={1} >
                       <Grid item >
                       <InputLabel style={{fontSize:'16px',color:'#626262',marginTop:'15px',textAlign:"left" }}>Requester Name</InputLabel>
                       </Grid> 
                       <Grid item >
                       <TextField
                  name="requesterName"
                  inputRef={register}
                  defaultValue=""
                  margin="normal"
                  variant="outlined"
              
                  error={errors.requesterName ? true : false}
				  helperText={errors.requesterName?.message}
          size="small" 
          onChange={(e)=>{
            console.log(e.target.value);
          }}

          
                        ></TextField> 
                      
                        </Grid>
                      
                       </Grid>
                       </TableCell>
                       <TableCell>
                      
          <Grid container spacing={2}>
                       <Grid item >
                       <InputLabel style={{fontSize:'16px',color:'#626262',marginTop:'15px',textAlign:"left" }}>Requester Contact</InputLabel>
                       </Grid> 
                       <Grid item >
                       <TextField
                  name="requesterContactNumber"
                  inputRef={register}
                  defaultValue=""
                  error={errors.requesterContactNumber ? true : false}
				  helperText={errors.requesterContactNumber?.message}
          variant="outlined" size="small" 
          onChange={(e)=>{
         console.log(e.target.value);
          }}
                    
                        
                        >
                        </TextField>
                        </Grid>
                      
                       </Grid>
                       </TableCell>
                       <TableCell colSpan={2} ></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} >
    
          <InputLabel style={{fontSize:'16px',color:'#626262',marginTop:'15px',textAlign:"left" }}>Importer Comments (if any)</InputLabel>
        
         </TableCell>
           </TableRow>
          <TableRow>
          <TableCell  colSpan={3} >
          <TextField  inputRef={register}   defaultValue=""  name="importerComments" variant="outlined" style ={{width: '100%'}} multiline="true"
          onBlur={(e)=>{
            props.containerSummary.containers.importerComments=e.target.value;
          }}
          ></TextField>
            </TableCell>       
       
          </TableRow>
          <TableRow>
          <TableCell  colSpan={4} >
          <Grid container spacing={1}>
          <Grid item >
          <InputLabel style={{fontSize:'16px',color:'#626262',marginTop:'15px',textAlign:"left" }}>Supporting documents (if any)</InputLabel>
          </Grid>
          <Grid item >
          <Button   variant="contained"
              color="primary" onClick={handleClick}>
        Upload
      </Button>
      <input type="file"
             ref={hiddenFileInput}
             onChange={handleChange}
             style={{display:'none'}} 
      /> 
          
            </Grid>
          </Grid>
            </TableCell>     
          </TableRow>
        
     
    </TableBody>
  </Table>

  <Button  type="submit" variant="outlined" aria-label="delete" color="primary" >
                  Continue
                </Button>
 
  </form>   

    </>
  );
};
export default ContainerSummary;
