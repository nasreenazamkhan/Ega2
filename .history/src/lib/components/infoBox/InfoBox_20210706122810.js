import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CloseIcon from '@material-ui/icons/Close';
import "./InfoBox.css";
import { IconButton } from "@material-ui/core";
import Button  from '@material-ui/core/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  

} from "@material-ui/core";




const InfoBox = (props) => {


  const renderButtons=(button)=>
{
  return(
    
         <Button style={{marginLeft:'5px'}}
variant="contained"
color="secondary"  
onClick={(e)=>{props.onSelect({button})}} 
>{button}</Button>

 
  )
}
  
 

  return (
    <>

     <div className="notification-success">
     
        <div className="info-boxSuccess">
         
          <div className="icon bg-green">
            <i className="material-icons">{props.icon}</i>
          </div>
           <div className="content" >
            {/* <div className="message">{message}
          </div>
         
          <div className="col-md-12" >
          <div className="col-md-9" ></div>
          <div className="col-md-3" >
          <Button
            variant="contained"
            color="secondary"   style={{float:"right",marginTop:"25px",minWidth: '100px', minHeight: '41px',maxWidth: '100px', maxHeight: '41px'}}     
             >My Jobs</Button>
              <Button
            variant="contained"
            color="secondary"   style={{float:"right",marginTop:"25px",minWidth: '100px', minHeight: '41px',maxWidth: '100px', maxHeight: '41px'}}     
             >Assign Trucks</Button>
               </div>
               </div> */}
               <Table size="small" style={{width:'100%'}}>
                 <TableBody>
                   <TableRow>
                     <TableCell colspan={8} style={{borderBottom:'0px'}}>
                       {props.message}
                     </TableCell>
                   </TableRow>
                   <TableRow>
    <TableCell  colspan={5}>

    </TableCell>
    <TableCell style={{borderBottom:'0px'}}>
                   {props.buttonNames.forEach(button=>{
                        renderButtons(button);
                   })}

                   </TableCell>



                
                 </TableBody>
               </Table>
               </div>
            

      

    </div>
         
    </div>
          
   
    

    </>
  );
};

export default InfoBox;
