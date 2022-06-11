import { postHttp } from '../lib/common/HttpService';
import * as endpointContants from '../utils/ptmsEndpoints';
import { getHttp, getHttpAsync } from '../lib/common/HttpService';
import { checkForExistingTrip,updateRequestTruckType } from './../utils/ptmsEndpoints';



class BookingService {

    fetchContainerCount() {

        const remoteUrl = endpointContants.fetchContainerCount;
        let obj = { url: remoteUrl };
        return getHttp(obj, false);


    }

    fetchContainerSummaryAndPayment(containerData) {

        const remoteUrl = endpointContants.fetchContainerSummaryAndPayment;
        let obj = {
            url: remoteUrl,
            body: containerData
        };

        return postHttp(obj, true).catch(error => {

            return error;
        });


    }

    saveRequest(data) {

        const remoteUrl = endpointContants.saveRequest;

        let obj = {
            url: remoteUrl,
            body: data
        };

        return postHttp(obj, true).catch(error => {

            return error;
        });

    }

    reInitialise(data) {
        const remoteUrl = `${endpointContants.reInitialise}/${data}`;

        let obj = {
            url: remoteUrl,
           
        };

        return postHttp(obj, true).catch(error => {

            return error;
        });

    }

    getBookingByNumber(bookingNumber,expiry) {
        const remoteUrl = `${endpointContants.apiBaseUrl}requestDetails/booking/${bookingNumber}?expiry=${expiry}`;
        let obj = { url: remoteUrl };
        return getHttpAsync(obj, true);
    }

    getRequestByDeclaration(declaration) {
        const remoteUrl = `${endpointContants.apiBaseUrl}requestDetails/bookingByDeclaration/${declaration}`;
        let obj = { url: remoteUrl };
        return getHttpAsync(obj, true);
    }

    getContainerRequest(containerNumber) {
        const remoteUrl = `${endpointContants.containerSearchUrl}${containerNumber}`;
        let obj = { url: remoteUrl };
        return getHttpAsync(obj, true);
    }

    cancellationRequest = (data) => {
        let remoteUrl = `${endpointContants.apiBaseUrl}requestContainerDetails/cancel`;
        let obj = { url: remoteUrl, body: data };

        return postHttp(obj, true).catch(error => {
            return error;
        });

    };

    updateRequestTruckType = (reference,data) => {
        let remoteUrl = `${updateRequestTruckType}/${reference}`;
        let obj = { url: remoteUrl, body: data };

        return postHttp(obj, true).catch(error => {
            return error;
        });

    };

    fetchPaymentSummary(referenceNumber){
        
        const remoteUrl = `${endpointContants.fetchPaymentSummary}/?refNo=${referenceNumber}`;
        let obj = { url: remoteUrl };
        return getHttp(obj, false);
    };

    fetchContainerList(referenceNumber){
        const remoteUrl = `${endpointContants.fetchContainerList}/?reqNumber=${referenceNumber}`;
        let obj = { url: remoteUrl };
        return getHttp(obj, false);
    }

    saveAsDraft(requestDetails)
    {
        let remoteUrl = `${endpointContants.saveAsDraft}`;
        let obj = { url: remoteUrl, body: requestDetails };

        return postHttp(obj, true).catch(error => {
            return error;
        });
    }

    fetchDraftCount()
    {
        let remoteUrl = `${endpointContants.fetchDraftCount}`;
        let obj = { url: remoteUrl};

        return getHttp(obj, false);
    }

    fetchAllDrafts()
    {
        let remoteUrl = `${endpointContants.fetchAllDrafts}`;
        let obj = { url: remoteUrl};

        return getHttp(obj, false);
    }

    deleteDraft(encryptedDraftId)
    {
        let remoteUrl = `${endpointContants.deleteDraft}`;
        let obj = { url: remoteUrl, body: encryptedDraftId };

        return postHttp(obj, true).catch(error => {
            return error;
        });
    }

    approveRejectInvoice(invoice)
    {
        let remoteUrl = `${endpointContants.approveRejectInvoice}`;
        let obj = { url: remoteUrl, body: invoice};

        return postHttp(obj, true).catch(error => {
            return error;
        });
    }

    updateSettledOnDate(invoice)
    {
        let remoteUrl = `${endpointContants.updateSettledOnDate}`;
        let obj = { url: remoteUrl, body: invoice};

        return postHttp(obj, true).catch(error => {
            return error;
        });
    }

    fetchRequestDetails(searchValue)
    {
        let remoteUrl= "/ptms/app/api/secure/requestDetails/search?option=MISCELLANEOUS INVOICES" +
        "&bookingNumber=" +
        searchValue +
        "&statusCode=INVAPPR&pageNo=1&pageSize=10";

        let obj = { url: remoteUrl};

        return getHttp(obj, false);
    }


}

export default new BookingService()