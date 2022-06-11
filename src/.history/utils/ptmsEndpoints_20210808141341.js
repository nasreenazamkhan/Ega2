const baseUrl = "http://sitcmsnewui.dubaitrade.ae/en/";
export const apiBaseUrl = "/ptms/app/api/secure/";
export const fetchDriversForTransporter =
  apiBaseUrl + "transporter/fetchDriver";
export const fetchTrucksForTransporter = apiBaseUrl + "transporter/fetchTruck";
export const fetchTruckByUserTypes =
  apiBaseUrl + "transporter/fetchTruckByUserTypes";
export const saveTruckAndDriverInfo =
  apiBaseUrl + "requestDetails/updateRequestForTransporter";
export const deleteTruckAggregrator = apiBaseUrl + "truckAggregator/delete";
export const updateDriver = apiBaseUrl + "driver/update";
export const createDriver = apiBaseUrl + "driver/create";
export const searchRequestBoesForTransporter = apiBaseUrl + "searchRequestBoes";
export const fetchRequestDetails =
  apiBaseUrl + "requestDetails/viewRequestContainers";
export const createVehicleTypes = apiBaseUrl + "vehicleType/create";
export const checkForExistingTrip = apiBaseUrl + "trip/checkForExistingTrip";
export const fetchContainerDetailsForTrip =
  apiBaseUrl + "trip/fetchContainerInfoForTrip";
export const updateToken = apiBaseUrl + "trip/updateToken";
export const updateVehcileTypes = apiBaseUrl + "vehicleType/update";
export const updateTrip = apiBaseUrl + "trip/updateTrip";
export const updateTruck = apiBaseUrl + "truck/update";
export const createTruck = apiBaseUrl + "truck/create";
export const updateRequestTruckType = apiBaseUrl + "requestTruckType/update";
export const fetchConfirmDetailsPage = apiBaseUrl + "fetchConfirmDetails";
export const fetchAddress = apiBaseUrl + "address/fetchDetails";
export const createAddress = apiBaseUrl + "address/create";
export const updateAddress = apiBaseUrl + "address/update";
export const deleteAddress = apiBaseUrl + "address/delete";
export const saveUserDetails = apiBaseUrl + "user/confirmDetails";

export const fetchVehicleType = apiBaseUrl + "vehicleType/fetchAll";

export const fetchContainerCount = apiBaseUrl + "boe/fetchContainerCount";
export const fetchAddressList = apiBaseUrl + "address/addressList";
export const fetchContainerSummaryAndPayment =
  apiBaseUrl + "boe/fetchContainerSummaryAndPayment";
export const saveRequest = apiBaseUrl + "requestDetails/saveRequestDetails";
export const fetchZone = apiBaseUrl + "zone/fetchAll";
export const countRequestDetailsByStatus =
  apiBaseUrl + "requestDetails/countRequestDetailsByStatus";
export const groupAndSendForApproval =
  apiBaseUrl + "transporter/groupAndSendForApproval";
export const sendJobsForApproval =
  apiBaseUrl + "transporter/sendJobsForApproval";
export const fetchConsigneeDetails =
  apiBaseUrl + "consignee/fetchConsigneeDetails";
export const countSettlements =
  apiBaseUrl + "transporter/countSettlementStatus";
export const fetchSettlements = apiBaseUrl + "trip/fetchSettlements";
export const countJobs = apiBaseUrl + "transporter/countJobStatus";
export const downloadReceipt =
  "/ptms/app/api/public/certificate/paymentReceipt";
export const fetchInvoice = apiBaseUrl + "trip/fetchInvoice";
export const fetchPendingTokenJobs =
  apiBaseUrl + "admin/fetchtokenInOutRecords";
export const fetchPendingPODJobs =
  apiBaseUrl + "trip/searchForDocVerify?containerStatus=PODUPL";
export const fetchPod = apiBaseUrl + "requestContainerDetails/fetchPod";
export const approvePod = apiBaseUrl + "requestContainerDetails/approvePod";
export const searchJobs = apiBaseUrl + "trip/searchJobs";
export const startJob = apiBaseUrl + "trip/startJob";
export const fetchEtoken = apiBaseUrl + "requestContainerDetails/fetchEtoken";
export const rejectPod = apiBaseUrl + "requestContainerDetails/rejectPod";
export const fetchInvoiceSubmittedJobs =
  apiBaseUrl + "trip/fetchInvoiceSubmittedJobs";
export const fetchInvoiceApprovedJobs =
  apiBaseUrl + "trip/fetchInvoiceApprovedJobs";
export const approveInvoice = apiBaseUrl + "trip/approveInvoice";
export const rejectInvoice = apiBaseUrl + "trip/rejectInvoice";
export const requestForToken =
  apiBaseUrl + "requestContainerDetails/requestForToken";
export const markJobAsPaid = apiBaseUrl + "trip/markJobAsPaid";
export const loadEmptyInContainers = apiBaseUrl + "trip/loadEmptyInContainers";
export const searchContainerAndJob = apiBaseUrl + "trip/searchContainerAndJob";
export const updateTokenInDetails = apiBaseUrl + "trip/updateTokenInDetails";
export const reInitialise = apiBaseUrl + "requestDetails";
export const countExpiredRequests = apiBaseUrl + "trip/countExpiredRequests";
export const countPendingTokenJobs = apiBaseUrl + "trip/countPendingTokenJobs";
export const countTrucks = apiBaseUrl + "transporter/countTrucks";
export const cancelContainer = apiBaseUrl + "requestContainerDetails/cancel";
export const updateRequestContainerDetails =
  apiBaseUrl + "requestContainerDetails/updateRequestContainerDetails";
export const searchContainer =
  apiBaseUrl + "requestDetails/fetchAllRequestDetails";
export const fetchTransporters = apiBaseUrl + "transporter/fetchTransporters";
export const termsAndConditionUrl = baseUrl + "lm-terms-conditions";
export const downloadInvoice = "/ptms/app/api/public/certificate/paymentInvoice";
export const addToMyJobs = apiBaseUrl+"/transporter/addToJobs";
export const fetchPaymentSummary = "/ptms/app/api/secure/requestDetails/paymentSummary";
export const fetchContainerList = "/ptms/app/api/secure/requestContainerDetails/containerList";
export const updateRequestContainer = "/ptms/app/api/secure/requestContainerDetails/updateRequestContainerDetails";
export const fetchContainerTypes = apiBaseUrl+"/boe/fetchContainerTypes";
export const fetchSupportingFiles =  apiBaseUrl + "requestDetails/supportingFiles";
export const updateSingleLocationForAdmin =  apiBaseUrl + "requestDetails/updateSingleLocationByAdmin";
export const fetchPendingJobs = apiBaseUrl + "requestDetails/pendingJobs";
export const saveAsDraft = apiBaseUrl + "boe/saveAsDraft";
export const fetchDraftCount = apiBaseUrl + "boe/fetchDraftCount";
export const fetchAllDrafts = apiBaseUrl + "boe/fetchAllDrafts";
export const fetchOnBoardedTransporters = apiBaseUrl + "transporter/fetchOnBoardedTransporters";
export const assignTruckAndTokenAdmin = apiBaseUrl + "transporter/assignTruckAndTokenAdmin";
export const reAssigntruck = apiBaseUrl + "transporter/reAssign";
export const cancelRequestByAdmin = apiBaseUrl + "requestDetails/cancelRequestByAdmin";
export const updateRequestForAdmin = apiBaseUrl + "requestDetails/updateRequestForAdmin";
export const deleteDraft=apiBaseUrl+"boe/deleteDraft";
export const uploadInvoices=apiBaseUrl+"transporter/uploadInvoices";
export const fetchAllInvoices=apiBaseUrl+"requestDetails/fetchInvoices";
export const fetchRequestDetailsWithDocuments=apiBaseUrl+"requestDetails/fetchRequestDetailsWithDocuments";
export const approveRejectInvoice=apiBaseUrl+"requestDetails/approveRejectInvoice";
export const ratingAndFeedback=apiBaseUrl+"/requestContainerDetails/ratingAndFeedback";
export const containerSearchUrl = apiBaseUrl + 'requestDetails/byContainer';
export const declarationSearchUrl = apiBaseUrl + 'requestDetails/byDeclaration';
export const haulierSearchUrl = apiBaseUrl + 'requestDetails/byHaulier';
export const assignTruckAdmin = apiBaseUrl + 'requestContainerDetails/assignTruckAdmin';
export const updateSettledOnDate=apiBaseUrl+"/requestDetails/updateSettledOnDate";
export const fetchInvoicesForPayment=apiBaseUrl+"/requestDetails/fetchInvoicesForPayment";
export const makePaymentForInvoices=apiBaseUrl+"/requestDetails/makePaymentForInvoices";