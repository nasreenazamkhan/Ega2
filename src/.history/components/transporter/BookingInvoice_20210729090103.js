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
    const [bookingReferenceNumber,setBookingReferenceNumber] = useState(props.bookingReferenceNumber);
    const [requestDetailsData,setRequestDetailsData] = useState(props.bookingData);
   
}
export default React.memo(BookingInvoice);
  