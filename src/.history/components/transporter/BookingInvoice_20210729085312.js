import React, { useEffect ,useState} from "react";


import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  CardContent,
  Typography,
  Paper,
  IconButton,
  Icon,
  Grid,
  TextField,
  Button,
  InputLabel,
  withStyles
} from "@material-ui/core";
import ApplnDatePicker from "../../lib/components/datepicker/ApplnDatePicker";
import { FormProvider, useForm } from "react-hook-form";
import TransporterService from "../../service/TransporterService";
import { useLocation } from "react-router-dom";
import TransporterStatusDetails from  './TransporterStatusDetails';
import RequestBoeService from "../../service/RequestBoeService";
import SuccessToast from "../../lib/components/toast/SuccessToast";
import Link from "@material-ui/core/Link";


function BookingInvoice(props) {
    const location = useLocation();
    const [bookingReferenceNumber,setBookingReferenceNumber] = useState(location.state.bookingReferenceNumber);
    const [requestDetailsData,setRequestDetailsData] = useState(location.state.bookingData?location.state.bookingData:props.bookingData);
    const[invoiceNumber,setInvoiceNumber]=useState(1);
    const[submittedInvoices,setSubmittedInvoices]=useState([]);
    const[showToaster,setShowToaster]=useState("NO TOASTER");
    const[fetchList,setFetchList]=useState(0);
    const[invoiceList,setInvoiceList]=useState([]);

}
export default React.memo(BookingInvoice);
  