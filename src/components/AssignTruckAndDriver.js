import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import RequestBoeService from '../service/RequestBoeService';
import Container from './Container';

let updateTruckAndDriverForm = {
    vehicleRegistrationNo: '',
    driverCode: '',
    boeNumber: '',
    containerNo: '',
    consigneeCode: '',
    sourceToDestination: ''
};

function AssignTruckAndDriver() {
    const [formvalues, setValues] = useState([]);
    const [containerDetails, setContainerDetails] = useState([]);
    //  let {transactionCode,refVehicleType ,containerNo} = useParams();
    const location = useLocation();
    let referenceNumber = location.state.transactionCode;
    let refVehicleType = location.state.refVehicleTypeCode;
    let containerNo = location.state.containerNo;

    const [orderId, setOrderIdState] = useState(referenceNumber);
    const [vehicleType, setVehicleTypeState] = useState(refVehicleType);
    const [containerNumber, setContainerNoState] = useState(containerNo);

    useEffect(() => {
        const loadRequestBoeDetails = async () => {
            RequestBoeService.fetchRequestDetails(orderId, containerNumber)
                .then(response => {
                    console.log("response", response.data.dataItems);
                    setContainerDetails(response.data.dataItems);
                })
                .catch(error => {
                    console.log("error");
                });
        };
        loadRequestBoeDetails();
    }, [orderId, containerNumber]);

    return (
        <div className="col-md">
            {containerDetails.map(container => (
                <Container containerData={container}
                    refVehicleType={vehicleType}
                    orderId={orderId}
                    key={container.container_number}>
                </Container>
            ))}
        </div>
    )
}

export default AssignTruckAndDriver;
