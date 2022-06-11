import React, { useEffect, useState } from "react";
import * as endpointContants from "../../utils/ptmsEndpoints";
import ApplnAutoCompleteAsync from '../../lib/components/autocomplete/ApplnAutoCompleteAsync';


function FlightSearch() {

    const airportUrl = `${endpointContants.fetchAirports}?code=""`;
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
                            options={[]}
                     onSelect={(e) => {
                            
                            
                            }}
                          />
                      
                     


        </div>
        
        
        </>

    )


}
export default FlightSearch;