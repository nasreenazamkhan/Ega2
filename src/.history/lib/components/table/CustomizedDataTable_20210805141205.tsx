import React, { Props, useState, useEffect } from "react";
import {
  makeStyles,
  withStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";
import {
  Button,
  IconButton,
  Icon,
  TablePagination,
  TableSortLabel,
  TextField,
  Tooltip,
  CircularProgress,
  Grid
} from "@material-ui/core";
import "./table.css";
import { TableProps } from "./tableProps";
import { COLUMN_TYPE_STRING } from "../../common/Constants";
import AlertDialog from "../dialog/alertDialog";
import { getHttp } from "../../common/HttpService";
import Avatar from '@material-ui/core/Avatar';
import Paper from "@material-ui/core/Paper";
import Popover from '@material-ui/core/Popover';
import { useHistory } from "react-router-dom";
import BookingService from "../../../service/BookingService";
import CommonService from "../../../service/CommonService";
import { MailOutline } from "@material-ui/icons";
const SpacedTable = withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderCollapse: 'separate',
      borderSpacing: '0 15px',
      size: 'small'

    }
  }
  )
)(Table);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      paddingTop: 0,
      paddingBottom: 0,
      color: '#0E1B3D',
      height: '62px',
      borderBottom: '2px solid #0E1B3D',
      borderTop: '2px solid #0E1B3D',
      fontSize: '16px',
      fontWeight: 600,
      //width:"1218px",
      // height:"76px"
    },
    body: {
      paddingTop: 0,
      paddingBottom: 0,
      height: '62px',
      "&:$last-child": { borderRight: '1px solid #E8E8E8' },
      "&:$first-child": { borderLeft: '1px solid #E8E8E8' },
      whiteSpace: 'nowrap',
      fontSize: '14px',
      color: '#808080',
      fontWeight: 600,
      fontFamily: 'Dubai Light',
      borderBottom: '1px solid #E8E8E8',
      borderTop: '1px solid #E8E8E8',
      overflow: 'hidden',
    },
  }),
)(TableCell);



const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "#FCFCFC 0% 0% no-repeat padding-box",
      boxShadow: '4px 4px 7px #0000002B',
      border: "1px solid #DCDCDC",
      borderRadius: "5px",
      opacity: 1,
      width: "1218px",
      height: "62px",
      fontWeight: 600,
      fontFamily: 'Dubai Light',
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const StyledFixedCell = withStyles((theme: Theme) =>
  createStyles({
    body: {
      paddingTop: 0,
      paddingBottom: 0,
      // maxHeight: '64px',
      fontSize: '14px',
      fontWeight: 600,
      fontFamily: 'Dubai Light',
      color: '#848484',
      borderBottom: '1px solid #E8E8E8',
      borderTop: '1px solid #E8E8E8',
      overflow: 'ellipsis',
      "&:$first-child": { borderLeft: '1px solid #E8E8E8', borderRadius: "5px" },
      "&:$last-child": { borderRight: '1px solid #E8E8E8', borderRadius: "5px" },
      whiteSpace: "nowrap"
    },
  }),
)(TableCell);



function GetTableRow({ dk, row, index }: any) {

  const [anchorElDoc, setAnchorElDoc] = React.useState(null);
  const handleDocImgClick = (event: any) => {
    setAnchorElDoc(event.currentTarget);
  };
  const handleDocImgClose = () => {
    setAnchorElDoc(null);
  };

  const popOverOpen = Boolean(anchorElDoc);
  const id = popOverOpen ? 'simple-popover' : undefined;
  let rd = "row." + dk.key;
  let datastr = eval(rd);
  if (dk.key === "noOfContainers" || dk.key === "noOfTrucks" || dk.key === 'truckNumber') {
    return (
      <StyledFixedCell key={index} align="center">
        <Avatar style={{ height: '25px', width: '25px', backgroundColor: '#36A4F8', fontSize: '14px', marginLeft: "40%" }} > {datastr}</Avatar>
      </StyledFixedCell>)
  }
  if (dk.key === "statusCode") {
    if (datastr === "FPAY") {
      return (
        <>
          <StyledFixedCell key={index} align="center">
            <img src="./payment_failed.svg" style={{ marginRight: "5%" }} />

            Payment Failed
          </StyledFixedCell>
        </>)
    }
    if (datastr === "PPAY") {
      return (
        <>
          <StyledFixedCell key={index} align="center">
            <img src="./payment_unconfirmed.svg" style={{ marginRight: "5%" }} />

            Payment unconfirmed
          </StyledFixedCell>
        </>)
    }
    if (datastr === "SUCC") {
      return (
        <>
          <StyledFixedCell key={index} align="center">
            <img src="./payment_unconfirmed.svg" style={{ marginRight: "5%" }} />
            Transporter Pending
          </StyledFixedCell>
        </>)
    }
    if (datastr === "EXP") {
      return (
        <>
          <StyledFixedCell key={index} align="center">
            <img src="./payment_unconfirmed.svg" style={{ marginRight: "5%" }} />
            Transporter Pending
          </StyledFixedCell>
        </>)
    }
    if (datastr === "COMPL") {
      return (
        <>
          <StyledFixedCell key={index} align="center">
            <img src="./transporter_confirmed.svg" style={{ marginRight: "5%" }} />

            MT IN Delivered
          </StyledFixedCell>
        </>)
    }
    if (datastr === "TRANSCONF") {
      return (
        <>
          <StyledFixedCell key={index} align="center">
            <img src="./transporter_confirmed.svg" style={{ marginRight: "5%" }} />

            Transporter Confirmed
          </StyledFixedCell>
        </>)
    }
    if (datastr === "STARTED") {
      if(remoteUrl.indexOf("INVAPPR")!==-1)
      {
        
      }
      return (
        <>
          <StyledFixedCell key={index} align="center">
            <img src="./transporter_confirmed.svg" style={{ marginRight: "5%" }} />

            Transporter Confirmed
          </StyledFixedCell>
        </>)
    }
    if (datastr === "CNCL") {
      return (
        <>
          <StyledFixedCell key={index} align="center">
            <img src="./payment_failed.svg" style={{ marginRight: "5%" }} />

            Booking Cancelled
          </StyledFixedCell>
        </>)
    }
    else {
      return (
        <StyledFixedCell key={index} align="center">

        </StyledFixedCell>)
    }
  }
  if (dk.key === "receipt") {
    if (datastr === "true") {
      return (
        <>
          <StyledFixedCell key={index} align="center">
            <IconButton onClick={handleDocImgClick}><img src="./booking_receipt.svg" ></img></IconButton>
          </StyledFixedCell>
          <Popover style={{ width: '600px', height: '200px' }}
            id={id}
            open={popOverOpen}
            anchorEl={anchorElDoc}
            onClose={handleDocImgClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            PaperProps={{
              style: { width: '200px', height: '80px', boxShadow: 'none', border: '1px solid', borderColor: '#CCCCCC' },
            }}
          >
            <div>{" "}</div>
            <div style={{ marginTop: '8px', fontSize: '15px', fontWeight: 'bold', color: '#2E8BE9', textAlign: 'center', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => CommonService.downloadInvoice(row.bookingNumber)}>Download Tax Receipt</div>
            <hr></hr>
            <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#2E8BE9', textAlign: 'center', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => CommonService.downloadReceipt(row.bookingNumber)}>Download booking Receipt</div>

          </Popover>
        </>)
    } else {
      return (
        <StyledFixedCell key={index} align="center">

        </StyledFixedCell>)
    }
  }
  if (dk.key === "amountPaid") {
    return (
      <StyledFixedCell key={index} align="center">
        {datastr} AED
      </StyledFixedCell>)
  }
  else {
    return (
      <StyledFixedCell key={index} align="center">
        {datastr}
      </StyledFixedCell>)
  }

};

const CustomizedDataTable: React.FC<TableProps> = ({
  tableData,
  tableKeys,
  handleClick,
  actions = [],
  remote,
  remoteUrl,
  refresh,
  dataRootKey,
  countData,
  screen,
  onFilterSelected
}) => {
  const [dtstate, setdtstate] = useState({
    rowsPerPage: 10,
    page: 0,
    sortColumn: null,
    currentPageRows: [],
    currentPageKey: [],
    count: 0,
  });
  const [alertOpen, setAlertOpen] = useState({ isopen: false, errorMsg: "" });
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [paymentSummary, setPaymentSummary] = useState();

  const handleFilterImgClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };



  const handleFilterImgClose = () => {
    setAnchorEl(null);
  };

  const popOverOpen = Boolean(anchorEl);
  const id = popOverOpen ? 'simple-popover' : undefined;

  let history = useHistory();

  useEffect(() => {
    loadDatTable();
  }, []);
  useEffect(() => {
    loadDatTable();
  }, [refresh]);


  const updateAlertState = (status: boolean, msg: string) => {
    setAlertOpen({
      isopen: status,
      errorMsg: msg,
    });
  };

  const setCurrentSortColumn = () => {
    let sortEle = tableKeys.filter((tk) => {
      return tk.sort === true;
    });

    setdtstate((prevState) => ({
      ...prevState,
      sortColumn: sortEle,
      IsbuttonClick: false,
    }));
  };

  const loadDatTable = () => {
    setCurrentSortColumn();
    if (remote !== true) {
      setdtstate((prevState) => ({
        ...prevState,
        currentPageKey: tableKeys,
        refresh: refresh,
        page: 0,
        rowsPerPage: 10,
        currentPageRows: getPageData(0, 1, 10),
      }));
    } else {
      if (remoteUrl === "" || remoteUrl.trim() === "")
        return;
      loadHttp(remoteUrl, 0);
    }
  };

  const loadHttp = (remoteUrl: any, pageNumber?: number, pageSize = dtstate.rowsPerPage) => {
    setLoading(true);
    let fnUrl = '';
    let pageNo = pageNumber;
    if (remoteUrl.indexOf('?') === -1) {
      fnUrl = remoteUrl + '?pgNo=' + pageNo + '&pgSize=' + pageSize;
    } else {
      fnUrl = remoteUrl + '&pgNo=' + pageNo + '&pgSize=' + pageSize;
    }
    getHttp({ url: fnUrl }, false).then(e => {
      let remoteData = e;
      countData(remoteData.totalElements);
      if (dataRootKey && dataRootKey !== "") {
        let keyEle = "e." + dataRootKey;
        remoteData = eval(keyEle);
      }
      setdtstate((prevState) => ({
        ...prevState,
        currentPageKey: tableKeys,
        refresh: refresh,
        page: pageNo,
        rowsPerPage: 10,
        currentPageRows: remoteData,
        count: e.totalElements
      }));
      setLoading(false);
    }).catch(error => {
      updateAlertState(true, error);
      setLoading(false);
    });
  };

  const handleSort = (scol: any) => {
    // if (scol.id === dtstate.sortColumn.id) {
    var currentSortColum = dtstate.sortColumn.find((y: any) => y.id === scol.id);
    if (scol.dir === "asc") scol.dir = "desc";
    else scol.dir = "asc";
    //} else {
    // scol.dir = "asc";
    // }
    currentSortColum.dir = scol.dir;
    // setdtstate((prevState) => ({
    //     ...prevState,
    //     sortColumn: scol
    // }));
    let fnlUrl = null;
    if (remoteUrl.indexOf("?") === -1)
      fnlUrl = remoteUrl + "?sortCol=" + scol.id + "&sortOrder=" + scol.dir;
    else fnlUrl = remoteUrl + "&sortCol=" + scol.id + "&sortOrder=" + scol.dir;

    loadHttp(fnlUrl, 0, 10);
  };

  const getTableHeadRow = ({ dk, index }: any) => {
    var i = dk.id;
    const filterClicked = (e: any) => {
      onFilterSelected(e);
      handleFilterImgClose();
    }
    const DropdownIndicator = () => (
      <div style={{ paddingLeft: '10px' }}>
        <img src="./Sort1.png" height="12px" />
      </div>
    );
    return (
      <>
        <StyledTableCell key={index} align="center">
          {dk.name}
          {dk.name === 'Status' && <img src="./filter.svg" style={{ cursor: "pointer" }} onClick={handleFilterImgClick} />}
          {dk.sort === true && dtstate.sortColumn[i] && (
            <TableSortLabel
              key={index + 1}
              className="table-sort-icon"
              // active={dtstate.sortColumn.id === dk.id}
              active={true}
              // direction={
              //   dtstate.sortColumn.id === dk.id ? dtstate.sortColumn.dir : "asc"
              // }
              direction={dtstate.sortColumn[i].dir === 'asc' ? 'desc' : 'asc'}
              onClick={() => {
                handleSort(dk);
              }}
            />
          )}
        </StyledTableCell>
        <Popover style={{ width: '550px', height: '400px' }}
          id={id}
          open={popOverOpen}
          anchorEl={anchorEl}
          onClose={handleFilterImgClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          PaperProps={{
            style: { width: '150px', height: '100px', boxShadow: 'none', border: '1px solid', borderColor: '#CCCCCC' },
          }}
        >
          <div>{" "}</div>
          <div style={{ marginTop: '8px', fontSize: '15px', fontWeight: 'bold', color: '#2E8BE9', textAlign: 'center', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => filterClicked('PPAY')}>Payment Unconfirmed</div>
          <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#2E8BE9', textAlign: 'center', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => filterClicked('FPAY')}>Payment Failed</div>
          <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#2E8BE9', textAlign: 'center', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => filterClicked('SUCC')}>Transporter Pending</div>
          <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#2E8BE9', textAlign: 'center', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => filterClicked('COMPL')}>MT IN Delivered</div>
          <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#2E8BE9', textAlign: 'center', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => filterClicked('TRANSCONF')}>Transporter Confirmed</div>
        </Popover>
      </>
    );
  };

  const getPageData = (
    currentPage: number,
    nextPage: number,
    rowsPerPage: number
  ) => {
    return tableData.slice(currentPage * rowsPerPage, nextPage * rowsPerPage);
  };
  const handleChangePage = (event: any, newpage: number) => {
    if (remote !== true) {
      setdtstate((prevState) => ({
        ...prevState,
        page: newpage,
        currentPageRows: getPageData(newpage, newpage + 1, dtstate.rowsPerPage),
      }));
    } else {
      setdtstate((prevState) => ({
        ...prevState,
        page: newpage,
      }));
      loadHttp(remoteUrl, newpage);
    }
  };

  const handleChangeRowsPerPage = (event: any) => {
    if (remote !== true) {
      setdtstate((prevState) => ({
        ...prevState,
        refresh: refresh,
        page: 0,
        rowsPerPage: event.target.value,
        currentPageRows: getPageData(0, 1, event.target.value),
      }));
    } else {
      let fnlUrl = remoteUrl + "?pageNo=1&pageSize=" + event.target.value;
      loadHttp(fnlUrl);
    }
  };

  const classes = useStyles();
  return (
    <>
      <AlertDialog
        isopen={alertOpen.isopen}
        message={alertOpen.errorMsg}
        onClose={(e: any) => {
          updateAlertState(false, "");
        }}
      />

      {loading ||
        (dtstate.currentPageRows && dtstate.currentPageRows.length > 0) ? (
        <>
          {loading && <CircularProgress className="dtable-loader" />}
          {loading && <div className="dtable-overlay"></div>}
          <SpacedTable>
            <TableHead>
              <TableRow>
                {dtstate.currentPageKey.map((dk: any, index) =>
                  getTableHeadRow({ dk, index })
                )}
                {actions.length > 0 ? (
                  <StyledTableCell
                    style={{ width: "120px" }}
                  ></StyledTableCell>
                ) : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {dtstate.currentPageRows.map((row, extIndex) => (
                <StyledTableRow key={extIndex}>
                  {dtstate.currentPageKey.map((dk, index) =>
                    <GetTableRow dk={dk} row={row} index={index} />
                  )}
                  {actions.length > 0 ? (
                    <StyledFixedCell
                      align="right"
                      style={{ width: "120px" }}
                    >
                      {actions.map((act, x) => (
                        <Tooltip
                          key={x}
                          title={act.tip}
                          placement="top"
                          arrow
                        >
                          <>
                            {screen !== "Transporter" && <IconButton
                              key={x}
                              style={{ padding: "0px" }}
                              onClick={() => {
                                handleClick(row, null, null, null);

                                // BookingService.fetchPaymentSummary(
                                //   row.bookingNumber
                                // ).then((response) => {
                                //   console.log("response in payment summary ::", response);
                                //   history.push('./paymentSummary',{statusData: row ,paymentSummary:response, url:remoteUrl});
                                // });

                              }}
                            >
                              {
                                <img src="./next_page.svg" />
                              }
                            </IconButton>}

                            {screen === "Transporter" && <IconButton
                              key={x}
                              style={{ padding: "0px" }}
                              onClick={() => {
                                BookingService.fetchPaymentSummary(
                                  row.bookingNumber
                                ).then((response) => {
                                  history.push('./transporterStatusDetails', { statusData: row, paymentSummary: response, url: remoteUrl });
                                });

                              }}
                            >
                              {
                                <img src="./next_page.svg" />
                              }
                            </IconButton>}
                          </>
                        </Tooltip>
                      ))}
                    </StyledFixedCell>
                  ) : null}
                </StyledTableRow>
              ))}
            </TableBody>
          </  SpacedTable>

          <TablePagination
            rowsPerPageOptions={[]}
            colSpan={3}
            component="div"
            count={dtstate.count}
            rowsPerPage={dtstate.rowsPerPage}
            page={dtstate.page}
            backIconButtonProps={{ id: "backId" }}
            onChangePage={handleChangePage}
            nextIconButtonProps={{ id: "nextId" }}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />

        </>
      ) : (<Paper elevation={5} style={{ borderRadius: 8, padding: '30px', marginTop: 20, minWidth: '760px', minHeight: '100px', color: '#FF7171' }}>
        <Grid container direction="row" spacing={5}>
          <Grid item sm={12} xs={12}>
            <Typography variant="subtitle1" style={{ fontSize: '16px', textAlign: 'center' }}>
              <b>{'No records found'}</b></Typography>
          </Grid>
        </Grid>
      </Paper>)}
    </>
  );
};

export default React.memo(CustomizedDataTable);
