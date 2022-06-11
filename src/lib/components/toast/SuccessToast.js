import React, {  } from "react";
import "./SuccessToast.css";

const SuccessToast = (props) => {
  const { title, message, icon, position, showToast } = props;

  return (
    <>
      <div className={`notification-success ${position}`}>
        <div className="info-boxSuccess">
          <div className="icon bg-green">
            <i className="material-icons">{icon}</i>
          </div>
          <div className="content" >
            <div className="title">{title}</div>
            <div className="message">{message}</div>
          </div>
          <div className="col-md">
            <button style={{ marginTop: "5px", fontSize: "25px" }} type="button" onClick={() => {
              showToast(false);
            }} className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true"  >&times;</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessToast;
