import React, { useEffect, useState } from "react";
import { InputLabel } from "@material-ui/core";


 function Trucks() {
    return (
        <> 
         <InputLabel style={{ fontSize: "13px", color: "red" }}>
                  Trucks Available
         </InputLabel>
      </>
    )

 }

 export default React.memo(Trucks)