import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { NO_DIALOG } from '../lib/common/Constants';
import { OTHER_POPUP } from './../lib/common/Constants';
import ConfirmDetailsPopUp from './ConfirmDetailsPopUp';
import { getUserDetails } from "../lib/common/storeAccess";
import { useSelector } from "react-redux";

function Home() {


  const [showPopup, setShowPopup] = useState(NO_DIALOG);
  const[userDetails,setUserDetails]=useState([]);
  const userData= useSelector(state => state.loginUser);

  
 
  let history = useHistory();


  useEffect(() => {
  
    if(getUserDetails().confirmDetails)
    {
      setUserDetails(getUserDetails());
      setShowPopup(OTHER_POPUP);
    
    }
    else
    {
      console.log("flag value",getUserDetails())
    }
  }, [userData]);

return(
<>
  <ConfirmDetailsPopUp isopen={showPopup === OTHER_POPUP} userDetails={userDetails}  onClose={(e) => {
    setShowPopup(NO_DIALOG);
  }} />
</>

)
}

export default Home;
