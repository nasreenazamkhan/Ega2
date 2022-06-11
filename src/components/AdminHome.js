import React from "react";
import { Link } from "react-router-dom";
import { getLoginUserAccessToken } from "./../lib/common/storeAccess";

function AdminHome() {

    return (
        <div>

        <li>Dubai Trade Admin</li>
        <ul>
          <li>Manage Container Booking</li>
          {/* <li>Assign Container Booking to Truck Aggregator / Transporter </li> */}
          <Link to="/addVehicleTypes">
            {" "}
            <li> Manage Vehicle Types (LP)</li>
          </Link>
          <Link to="/manageTruckAggregator">
            <li>Manage Truck Aggregator (LP)</li>
          </Link>
          <Link to="/manageTransporter">
            {" "}
            <li> Manage Transporter (LP)</li>
          </Link>
          <Link to="/updateToken">
          <li>Update Token</li>
          </Link>
          <Link to="/manageDriver">
            <li>Manage Driver (LP)</li>
          </Link>

          <li>Manage Truck (LP)</li>
        </ul>
        </div>
    );


}

export default AdminHome;