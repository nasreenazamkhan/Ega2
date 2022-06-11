import React, { useEffect } from 'react';
import { Container, LinearProgress } from '@material-ui/core';
import Spinner from './lib/components/spinner/spinner';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import AppBreadCrumb from './lib/components/breadcrumb/appBreadCrumb';
import lazyComponentLoad from './lib/common/lazyComponentLoad';
import AuthUser from './lib/common/AuthUser';
import { useSelector } from 'react-redux';
import AppSkeleton from './lib/components/spinner/AppSkeleton';
import './App.css';
import Home from './components/Home';


const homeAsync = lazyComponentLoad(() => {
  return import('./components/Home');
});

const adminHomeAsync = lazyComponentLoad(() => {
  return import('./components/AdminHome');
});


const transporterHomeAsync = lazyComponentLoad(() => {
  return import('./components/TransporterHome');
});

const importerHomeAsync = lazyComponentLoad(() => {
  return import('./components/ImporterHome');
});

const tripAsync = lazyComponentLoad(() => {
  return import('./components/Trip');
});

const requestMainAsync = lazyComponentLoad(() => {
  return import('./components/request/RequestMain');
});

const assignTruckAndDriverAsync = lazyComponentLoad(() => {
  return import('./components/AssignTruckAndDriver');
});

const manageVehicleTypes = lazyComponentLoad(() => {
  return import('./components/masters/ManageVehicleTypes');
});


// const addVehicles = lazyComponentLoad(() => {
//   return import('./components/masters/AddVehicle');
// });

const transporterAsync = lazyComponentLoad(() => {
  return import('./components/masters/Transporter');
});


const manageTruckAggregatorAsync = lazyComponentLoad(() => {
  return import('./components/masters/ManageTruckAggregator');
});

const manageDriverAsync = lazyComponentLoad(() => {
  return import('./components/masters/ManageDriver');
});


const viewRequestsForTransporter = lazyComponentLoad(() => {
  return import('./components/ViewRequestsForTransporter');
});

const testComponent = lazyComponentLoad(() => {
  return import('./components/ContainerTest');
});


const manageTrip = lazyComponentLoad(() => {
  return import('./components/ManageTrip');
});

const updateToken = lazyComponentLoad(() => {
  return import('./components/masters/UpdateToken');
});

const booking = lazyComponentLoad(() => {
  return import('./components/request/Booking');
});

const manageTruckAsync = lazyComponentLoad(() => {
  return import('./components/masters/ManageTruck');
});

const confirmDetails = lazyComponentLoad(() => {
  return import('./components/ConfirmDetailsPopUp');
});

const home = lazyComponentLoad(() => {
  return import('./components/Home');
});

const manageAddressAsync = lazyComponentLoad(() => {
  return import('./components/address/AddAddress');
});

const saveRequestAsync = lazyComponentLoad(() => {
  return import('./components/request/SaveRequest');
});

const confirmationAsync = lazyComponentLoad(() => {
  return import('./components/request/Confirmation');
});

const failConfirmationAsync = lazyComponentLoad(() => {
  return import('./components/request/FailConfirm');
});

const stepperAsync = lazyComponentLoad(() => {
  return import('./components/request/RequestMain');
});

const deliverContainerAsync = lazyComponentLoad(() => {
  return import('./components/request/DeliverContainer');
});

const selectLocationsAsync = lazyComponentLoad(() => {
  return import('./components/request/SelectLocations');
});

const testingAsync = lazyComponentLoad(() => {
  return import('./components/request/Testing');
});

const truckTypeAsync = lazyComponentLoad(() => {
  return import('./components/request/TruckType');
});

const transporterDashBoard = lazyComponentLoad(() => {
  return import('./components/transporter/TransporterDashboard');
});

const viewRequest = lazyComponentLoad(() => {
  return import('./components/request/ViewRequest');
});
const searchRequests = lazyComponentLoad(() => {
  return import('./components/transporter/SearchRequests');
});


const assignTrucks = lazyComponentLoad(() => {
  return import('./components/transporter/AssignTrucks');
});

const jobDetails = lazyComponentLoad(() => {
  return import('./components/transporter/JobDetails');
});
const assignDriver = lazyComponentLoad(() => {
  return import('./components/transporter/AssignDriver');
});

const jobDetailsCard = lazyComponentLoad(() => {
  return import('./components/transporter/JobDetailsCard');
});
const assignDriverSubForm = lazyComponentLoad(() => {
  return import('./components/transporter/AssignDriverSubForm');
});

const uploadDocument = lazyComponentLoad(() => {
  return import('./components/transporter/UploadDocument');
});


const myJobs = lazyComponentLoad(() => {
  return import('./components/transporter/MyJobs');
});

const settlements = lazyComponentLoad(() => {
  return import('./components/transporter/Settlement');
});

const settlementSummary = lazyComponentLoad(() => {
  return import('./components/transporter/SettlementSummary');
});

const claimSummary = lazyComponentLoad(() => {
  return import('./components/transporter/ClaimSummary');
});

const fileUpload = lazyComponentLoad(() => {
  return import('./components/transporter/FileUpload');
});

const assignTokentoJob = lazyComponentLoad(() => {
  return import('./components/admin/AssignTokentoJob');
});

const jobCard = lazyComponentLoad(() => {
  return import('./components/admin/JobCard');
});



const assignToken = lazyComponentLoad(() => {
  return import('./components/admin/AssignToken');
});

const adminDashBoard = lazyComponentLoad(() => {
  return import('./components/admin/AdminDashBoard');
});

const expiredJobs = lazyComponentLoad(() => {
  return import('./components/admin/ExpiredJobs');
});
const SearchDetails = lazyComponentLoad(() => {
  return import('./components/admin/SearchDetails');
});

const verifyDocument = lazyComponentLoad(() => {
  return import('./components/admin/VerifyDocument');
});
const assignTrucksForAdmin = lazyComponentLoad(() => {
  return import('./components/admin/AssignTruckAdmin');
});

const trucksAvailable = lazyComponentLoad(() => {
  return import('./components/transporter/TrucksAvailable');
});

const test = lazyComponentLoad(() => {
  return import('./components/transporter/test');
});

const status = lazyComponentLoad(()=>{
  return import('./components/request/Status');
  
})

const paymentSummary =  lazyComponentLoad(()=>{
  return import('./components/request/PaymentSummary');
  
})

const newJobs = lazyComponentLoad(() => {
  return import('./components/transporter/NewJobs');
});

const transporterStatus =  lazyComponentLoad(() => {
  return import('./components/transporter/TransporterStatus');
});

const verifyDocumentsAll = lazyComponentLoad(() => {
  return import('./components/admin/VerifyDocumentsAll');
});
const transporterStatusDetails =  lazyComponentLoad(() => {
  return import('./components/transporter/TransporterStatusDetails');
});

const drafts =  lazyComponentLoad(() => {
  return import('./components/request/Drafts');
});

const miscellaneousInvoices =  lazyComponentLoad(() => {
  return import('./components/transporter/miscellaneousInvoices');
});


function App() {
  const userLogin = useSelector(state => state.loginUser.login);


  useEffect(() => {

  }, [])
  return (

    <Router basename={"/ptms"}>
      <div className="App">

        <AuthUser />
        {userLogin === true ?
          <Container>
            <Home />
            {/* <AppBreadCrumb /> */}
            <Spinner />
            <Switch>

              <Route path="/adminHome" exact component={adminHomeAsync} />
              <Route path="/transporterHome" exact component={transporterHomeAsync} />
              <Route path="/importerHome" exact component={importerHomeAsync} />

              <Route path="/createTrip" exact component={tripAsync} />
              <Route path="/manageTransporter" exact component={transporterAsync} />
              <Route path="/requestMain" exact component={requestMainAsync} />
              <Route path="/addVehicleTypes" exact component={manageVehicleTypes} />
              <Route path="/assignTruckAndDriver" exact component={assignTruckAndDriverAsync} />
              <Route path="/manageTruckAggregator" exact component={manageTruckAggregatorAsync} />
              <Route path="/manageDriver" exact component={manageDriverAsync} />
              <Route path="/transporterTasks" exact component={viewRequestsForTransporter} />
              <Route path="/manageTrip" exact component={manageTrip} />
              <Route path="/myRequests" exact component={booking} />
              <Route path="/updateToken" exact component={updateToken} />
              <Route path="/manageTruck" exact component={manageTruckAsync} />
              <Route path="/confirmUserDetails" exact component={confirmDetails} />

              <Route path="/addAddress" exact component={manageAddressAsync} />
              <Route path="/saveRequest" exact component={saveRequestAsync} />
              <Route path="/confirmation/:referenceNumber" exact component={confirmationAsync} />
              <Route path="/failConfirm/:referenceNumber" exact component={failConfirmationAsync} />
              <Route path="/createRequest" exact component={stepperAsync} />
              <Route path="/deliverContainer" exact component={deliverContainerAsync} />
              <Route path="/selectLocations" exact component={selectLocationsAsync} />
              <Route path="/testing" exact component={testingAsync} />
              <Route path="/truckType" exact component={truckTypeAsync} />
              <Route path="/transporterDashboard" exact component={transporterDashBoard} />
              <Route path="/jobDetails" exact component={jobDetails} />
              <Route path="/viewRequest" exact component={viewRequest} />
              <Route path="/jobDetailsCard" exact component={jobDetailsCard} />
              <Route path="/jobDetails" exact component={jobDetails} />
              <Route path="/viewRequest" exact component={viewRequest} />
              <Route path="/jobDetailsCard" exact component={jobDetailsCard} />
              <Route path="/assignTrucks" exact component={assignTrucks} />
              <Route path="/uploadDocument" exact component={uploadDocument} />
              <Route path="/myJobs" exact component={myJobs} />
              <Route path="/assignTrucks" exact component={assignTrucks} />
              <Route path="/uploadDocument" exact component={uploadDocument} />
              <Route path="/myJobs" exact component={myJobs} />
              <Route path="/assignTrucks" exact component={assignTrucks} />
              <Route path="/searchRequests" exact component={searchRequests} />
              <Route path="/assignDriver" exact component={assignDriver} />
              <Route path="/assignDriverSubForm" exact component={assignDriverSubForm} />
              <Route path="/settlements" exact component={settlements} />
              <Route path="/settlementSummary" exact component={settlementSummary} />
              <Route path="/claimSummary" exact component={claimSummary} />
              <Route path="/fileUpload" exact component={fileUpload} />
              <Route path="/assignTokentoJob" exact component={assignTokentoJob} />
              <Route path="/jobCard" exact component={jobCard} />

              <Route path="/assignToken" exact component={assignToken} />
              <Route path="/fileUpload" exact component={fileUpload} />
              <Route path="/assignToken" exact component={assignToken} />

            
              <Route path="/expiredJobs" exact component={expiredJobs} />
              <Route path="/verifyDocument" exact component={verifyDocument} />
              <Route path="/adminDashBoard" exact component={adminDashBoard} />
              <Route path="/expiredJobs" exact component={expiredJobs} />
              <Route path="/assignTruckAdmin" exact component={assignTrucksForAdmin} />
              <Route  path="/search-by-service"  exact  render={(routeProps) => <SearchDetails {...routeProps} />} />
              <Route path="/trucks" exact component={trucksAvailable} />
               <Route path="/test" exact component={test} /> 
              <Route path="/status" exact component={status} />
              <Route path="/paymentSummary" exact component={paymentSummary} />
              <Route path="/newJobs" exact component ={newJobs}/>
              <Route path="/transporterStatus" exact component ={transporterStatus}/>
              <Route path="/transporterStatusDetails" exact component ={transporterStatusDetails}/>
              <Route path="/verifyDocumentsAll" exact component ={verifyDocumentsAll}/>
              <Route path="/drafts" exact component ={drafts}/>
              <Route path="/miscellaneousInvoices" exact component ={miscellaneousInvoices}/>
            </Switch>
          </Container >
          : <AppSkeleton />}
      </div>
    </Router>
  );
}

export default App;
