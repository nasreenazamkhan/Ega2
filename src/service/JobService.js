import * as endpointContants from "../utils/ptmsEndpoints";
import { getHttp, postHttp } from "../lib/common/HttpService";

class JobService {
  fetchSettlements(fromDate,toDate) {
    const remoteUrl = `${endpointContants.fetchSettlements}?fromDate=${fromDate}&toDate=${toDate}`;

    let obj = { url: remoteUrl };

    return getHttp(obj, false);
  }

  fetchInvoice(jobRefNo) {
    const remoteUrl = `${endpointContants.fetchInvoice}?jobRefNo=${jobRefNo}`;

    let obj = { url: remoteUrl };

    return getHttp(obj, false);
  }

  fetchInvoiceSubmittedJobs() {
    const remoteUrl = `${endpointContants.fetchInvoiceSubmittedJobs}`;

    let obj = { url: remoteUrl };

    return getHttp(obj, false);
  }

  approveInvoice(jobRefNo) {
    const remoteUrl = endpointContants.approveInvoice;

    let obj = { url: remoteUrl, body: { jobRefNo: jobRefNo } };

    return postHttp(obj, true).catch((error) => {
      return error;
    });
  }

  rejectInvoice(jobRefNo, remarks) {
    const remoteUrl = endpointContants.rejectInvoice;

    let obj = {
      url: remoteUrl,
      body: { jobRefNo: jobRefNo, remarks: remarks },
    };

    return postHttp(obj, true).catch((error) => {
      return error;
    });
  }

  fetchInvoiceApprovedJobs(fromDate, toDate) {
    const remoteUrl = `${endpointContants.fetchInvoiceApprovedJobs}?fromDate=${fromDate}&toDate=${toDate}`;

    let obj = { url: remoteUrl };

    return getHttp(obj, false);
  }

  markJobAsPaid(jobRefNo,refNo) {
    const remoteUrl = endpointContants.markJobAsPaid;

    let obj = { url: remoteUrl, body: { jobRefNo: jobRefNo,paymentRefNo:refNo } };

    return postHttp(obj, true).catch((error) => {
      return error;
    });
  }

  loadEmptyInContainers() {
    const remoteUrl = endpointContants.loadEmptyInContainers;

    let obj = { url: remoteUrl };

    return getHttp(obj, false);
  }

  updateTokenInDetails(jobList) {
    const remoteUrl = endpointContants.updateTokenInDetails;

    let obj = { url: remoteUrl, body: jobList };

    return postHttp(obj, true).catch((error) => {
      return error;
    });
  }

  fetchExpiredCountForDashBoard() {

    const remoteUrl = endpointContants.countExpiredRequests ;
     let obj = { url: remoteUrl };
     return getHttp(obj, false);
         
           
  }
  
  fetchPendingTokenJobCount() {
    const remoteUrl = endpointContants.countPendingTokenJobs ;
     let obj = { url: remoteUrl };
     return getHttp(obj, false);
  }

  fetchHauliersCountForDTAdmin() {
    const remoteUrl = endpointContants.fetchHauliersCountForDTAdmin ;
     let obj = { url: remoteUrl };
     return getHttp(obj, false);
  }


}

export default new JobService();
