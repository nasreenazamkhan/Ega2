import React from "react";
import { Link } from "react-router-dom";
import { getLoginUserAccessToken } from "./../lib/common/storeAccess";

function TransporterHome() {

    return (
        <div>

        <li>Transporter Admin</li>
        <ul>
        <Link to="/manageDriver">
          <li>Manage Driver (LP)</li>
          </Link>
           <Link to="/manageTruck">
          <li>Manage Truck (LP)</li>
          </Link>
         
          <Link to="/createTrip">
            {" "}
            <li> Manage Trip</li>
          </Link>
          <Link to="/transporterTasks">
            {" "}
            <li>Accept Booking</li>
          </Link>
        </ul>
        </div>
    );


}

export default TransporterHome;