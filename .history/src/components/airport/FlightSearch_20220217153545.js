import React, { useEffect, useState } from "react";
import * as endpointContants from "../../utils/ptmsEndpoints";


function FlightSearch() {

    const airportUrl = `${endpointContants.fetchTransporters}?transporter=""`;
    const airportKVmapping = { label: "label", value: "value" };

    return (
        <>
        <div className="row">
        <ApplnAutoCompleteAsync
                            name={"fromAirport"}
                            label="From"
                            style={{ marginTop: "2px" }}
                            kvMapping={airportKVmapping}
                            remoteUrl={airportUrl}
                            colour={'#848484'}
                    
                              helperText={containerData.transporterError ? 'Transporter Required' : ''}  
                           
                              options={[]}
                              
                              
                            onSelect={(e) => {
                              onTransporterSelect(e);
                            
                            }}
                          />
                      
                     


        </div>
        
        
        </>

    )


}
export default FlightSearch;