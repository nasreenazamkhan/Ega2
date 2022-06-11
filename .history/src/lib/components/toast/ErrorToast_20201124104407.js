import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CloseIcon from '@material-ui/icons/Close';
import "./ErrorToast.css";


const ErrorToast = (props) => {
  const { title,message, icon, position,showToast } = props;



  return (
    <>

    
    
     <div className={`notification-container ${position}`}>
     
        <div className="info-box">
        
          <div className="icon bg-red">
            <i className="material-icons">{icon}</i>
          </div>
          <div className="content" >
            <div className="title">{title}</div>
            <div className="message">{message}</div>
          </div>
          <div className="col-md">
          <button style={{marginTop:"5px",fontSize:"25px"}} type="button"    onClick={() => {
                         showToast(false);
                            
                          }}    className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true"  >&times;</span>

    </button>
    </div>
         
        </div>
        </div>

    </>
  );
};

export default ErrorToast;
