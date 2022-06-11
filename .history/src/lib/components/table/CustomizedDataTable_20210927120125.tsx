import React, { useState, useEffect } from "react";
import {makeStyles,withStyles,createStyles,Theme} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Link, Typography } from "@material-ui/core";
import {IconButton,TablePagination,TableSortLabel,Tooltip,CircularProgress,Grid, ClickAwayListener} from "@material-ui/core";
import "./table.css";
import { TableProps } from "./tableProps";
import AlertDialog from "../dialog/alertDialog";
import { getHttp } from "../../common/HttpService";
import Avatar from '@material-ui/core/Avatar';
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import CommonService from "../../../service/CommonService";
import { Rating } from "@material-ui/lab";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { StarRate } from "@material-ui/icons";
import RequestDetailsPopUp from "../../../components/request/RequestDetailsPopUp";

const SpacedTable = withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderCollapse: 'separate',
      borderSpacing: '0 15px',
      size: 'small',
      marginTop: '-15px'
    },
  })
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
  pagination: {
    fontFamily: 'Dubai Light',
    fontWeight: 600
  },
  content: {
    padding: '20px 15px 20px 15px',
    width: '200px',
    height: '88px',
    verticalAlign: 'center'
  },
  link: {
    color: '#0E1B3D',
    fontSize: '15px',
    fontFamily: 'Dubai Light',
    fontWeight: 600
  },
  statusFilterContent: {
    padding: '20px 15px 20px 15px',
    width: '200px',
    height: '190px',
    verticalAlign: 'center'
  }
});

const WhiteToolTip = withStyles({
  tooltip: {
    color: "#0E1B3D",
    backgroundColor: "#FFFFFF",
    fontFamily: "Dubai Light",
    fontWeight: 600,
    padding: 0,
    pointerEvents: 'auto',
    boxShadow: '0px -1px 6px #0000009E'
  },
  arrow: {
    "&:before": {
      borderStyle: "none"
    },
    color: "#FFFFFF",
  }
})(Tooltip);

const BlueTooltip = withStyles({
  tooltip: {
    color: "#FFFFFF",
    backgroundColor: "#0E1B3DD3",
    fontFamily: "Dubai Light",
    fontWeight: 600,
    paddingLeft: '15px',
    paddingRight: '15px',
    maxWidth: '500px', 
    whiteSpace:'nowrap'
  },
  arrow: {
    "&:before": {
      borderStyle: "none"
    },
    color: "#0E1B3DD3",
  }
})(Tooltip);

const StyledFixedCell = withStyles((theme: Theme) =>
  createStyles({
    body: {
      paddingTop: 0,
      paddingBottom: 0,
      // maxHeight: '64px',
      fontSize: '14px',
      fontWeight: 600,
      fontFamily: 'Dubai Light',
      color: '#0E1B3D',
      borderBottom: '1px solid #E8E8E8',
      borderTop: '1px solid #E8E8E8',
      overflow: 'ellipsis',
      "&:$first-child": { borderLeft: '1px solid #E8E8E8', borderRadius: "5px" },
      "&:$last-child": { borderRight: '1px solid #E8E8E8', borderRadius: "5px" },
      whiteSpace: "nowrap"
    },
  }),
)(TableCell);

const CustomizedDataTable: React.FC<TableProps> = ({
tableData,tableKeys,handleClick,actions = [],remote,remoteUrl,refresh,dataRootKey,countData,screen,onFilterSelected}) => {
  const [dtstate, setdtstate] = useState({
    rowsPerPage: 10,
    page: 0,
    sortColumn: null,
    sortOrder: null,
    currentPageRows: [],
    currentPageKey: [],
    count: 0,
  });
  const [alertOpen, setAlertOpen] = useState({ isopen: false, errorMsg: "" });
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [paymentSummary, setPaymentSummary] = useState();

  const [requestPopup, setRequestPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState("");

  const handleFilterImgClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const classes = useStyles();
  const handleFilterImgClose = () => {
    setAnchorEl(null);
  };

  const popOverOpen = Boolean(anchorEl);
  const id = popOverOpen ? 'simple-popover' : undefined;

  let history = useHistory();

  useEffect(() => {
    // alert('test')
    loadDatTable();
  }, [refresh]);



  function GetTableRow({ dk, row, index, handleClick }: any) {
    const [anchorElDoc, setAnchorElDoc] = useState(null);
    const [popupType, setPopupType] = useState(null);
    const classes = useStyles();

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

    if (dk.key === "noOfContainers" || dk.key === "noOfTrucks" || dk.key === 'truckNumber' || dk.key === "noOfBookings") {
      return (
        <StyledFixedCell key={index} align="center">
          <Avatar style={{ height: '25px', width: '25px', backgroundColor: '#36A4F8', fontSize: '14px', marginLeft: "40%", fontFamily: 'Dubai Light' }} > {datastr}</Avatar>
        </StyledFixedCell>)
    }

    if (dk.key === "rateCard") {
      return (
        <StyledFixedCell key={index} align="center">
          <Link
            style={{ textDecoration: 'underline', color: '#3A88D5' }} onClick={() => handleClick(row, index, null, null)}>View</Link>
        </StyledFixedCell>)
    }

    if (dk.key === "ratings") {
      return (
        <StyledFixedCell key={index} align="center">
          <Rating
            name="read-only"
            value={datastr}
            size={'small'}
            readOnly
            precision={0.5}
            icon={<StarRate fontSize="inherit" style={{ fill: '#FFD607', stroke: '#FFD607', strokeWidth: '1.2px' }} />}
            emptyIcon={<StarBorderIcon fontSize="inherit" style={{ fill: '#848484' }} />} />
        </StyledFixedCell>)
    }
    if (dk.key === 'referenceNumber') {
      return (
        <StyledFixedCell key={index} align="center">
          <Link
            style={{ textDecoration: "underline" }}
            onClick={() => {
              setSelectedBooking(row);
              setRequestPopup(true);
            }}
          >
            {datastr}
          </Link>
        </StyledFixedCell>
      )
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
      if (datastr === "COMPL" || datastr === 'MT_DEL') {
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
      const renderReceiptTooltip = () => {
        return (
          <ClickAwayListener onClickAway={handleDocImgClose}>
            <div className={classes.content}>
              <Grid item xs={12} style={{ borderBottom: '1px solid #C7C7C7', paddingBottom: '8px', marginBottom: '8px' }}>
                <Link className={classes.link} onClick={() => CommonService.downloadInvoice(row.bookingNumber)}>
                  Downlaod Tax Receipt
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link className={classes.link} onClick={() => CommonService.downloadReceipt(row.bookingNumber)}>
                  Downlaod Booking Receipt
                </Link>
              </Grid>
            </div>
          </ClickAwayListener>
        );
      }
      if (datastr) {
        return (
          <>
            <StyledFixedCell key={index} align="center">
              <WhiteToolTip arrow title={renderReceiptTooltip()} open={popOverOpen} placement={"bottom-end"}>
                <IconButton onClick={handleDocImgClick}><img src="./booking_receipt.svg" style={{ height: '30px', width: '30px' }}></img></IconButton>
              </WhiteToolTip>
            </StyledFixedCell>
          </>)
      } else {
        return (
          <StyledFixedCell key={index} align="center">
          </StyledFixedCell>)
      }
    }
    if (dk.key.toLowerCase().includes("amount")) {
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
      countData(e.totalElements);
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
      if (screen === 'Haulier' && remoteData.length == 0) {
        handleClick(null, null, null, { noTransporter: true })
      }
    }).catch(error => {
      updateAlertState(true, error);
      setLoading(false);
    });
  };

  const handleSort = (scol: any) => {
    var currentSortColum = dtstate.sortColumn.find((y: any) => y.id === scol.id);
    if (scol.dir === "asc") scol.dir = "desc";
    else scol.dir = "asc";
    currentSortColum.dir = scol.dir;
    currentSortColum.sorted = true;
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
        <IconButton>
          <img src="./Sort1.png" height="14px" />
        </IconButton>
      </div>
    );

    const renderStatusTooltip = () => {
      return (
        <ClickAwayListener onClickAway={handleFilterImgClose}>
          <div className={classes.statusFilterContent}>
            <Grid item xs={12} style={{ borderBottom: '1px solid #C7C7C7', paddingBottom: '8px', marginBottom: '8px' }}>
              <Link className={classes.link} onClick={() => filterClicked('PPAY')}>
                Payment Unconfirmed
              </Link>
            </Grid>
            <Grid item xs={12} style={{ borderBottom: '1px solid #C7C7C7', paddingBottom: '8px', marginBottom: '8px' }}>
              <Link className={classes.link} onClick={() => filterClicked('FPAY')}>
                Payment Failed
              </Link>
            </Grid>
            <Grid item xs={12} style={{ borderBottom: '1px solid #C7C7C7', paddingBottom: '8px', marginBottom: '8px' }}>
              <Link className={classes.link} onClick={() => filterClicked('SUCC')}>
                Transporter Pending
              </Link>
            </Grid>
            <Grid item xs={12} style={{ borderBottom: '1px solid #C7C7C7', paddingBottom: '8px', marginBottom: '8px' }}>
              <Link className={classes.link} onClick={() => filterClicked(['TRANSCONF', 'STARTED'])}>
                Transporter Confirmed
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link className={classes.link} onClick={() => filterClicked(['COMPL','MT_DEL'])}>
                MT IN Delivered
              </Link>
            </Grid>
          </div>
        </ClickAwayListener>
      );
    }

    return (
      <>
        <StyledTableCell key={index} align="center">
          {dk.name}
          {(dk.name === 'Status' && remoteUrl.includes("ALL")) &&
            <WhiteToolTip open={popOverOpen} title={renderStatusTooltip()} arrow placement="bottom">
              <IconButton onClick={handleFilterImgClick} >
                <img src="./filter.svg" height="13px" />
              </IconButton>
            </WhiteToolTip>}
          {dk.sortActive === true && dtstate.sortColumn[i] && (
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
              IconComponent={DropdownIndicator}
            />
          )}
        </StyledTableCell>
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
      var currentSortColum = dtstate.sortColumn.find((y: any) => y.sorted === true);
      let fnlUrl;
      if (currentSortColum !== undefined) {
        if (remoteUrl.indexOf("?") === -1)
          fnlUrl = remoteUrl + "?sortCol=" + currentSortColum.id + "&sortOrder=" + currentSortColum.dir;
        else
          fnlUrl = remoteUrl + "&sortCol=" + currentSortColum.id + "&sortOrder=" + currentSortColum.dir;
      } else
        fnlUrl = remoteUrl;

      loadHttp(fnlUrl, newpage);
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
          {screen === 'Haulier' && <Grid item xs={12} style={{ color: '#F68C00', fontSize: '14px', fontWeight: 600, paddingTop: '20px', paddingBottom: 0 }}>
            {`Displaying ${dtstate.currentPageRows.length} Hauliers`}
          </Grid>}
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
                    <GetTableRow dk={dk} row={row} index={index} handleClick={handleClick} />
                  )}
                  {actions.length > 0 ? (
                    <StyledFixedCell align="right" style={{ width: "120px" }} >
                      {actions.map((act, x) => (
                        <BlueTooltip key={x} title={act.tip} placement="top" arrow>
                          <IconButton key={x} style={{padding:'10px 14px 10px 14px'}} onClick={() => { handleClick(row, null, null, null) }}>
                              <img src="./next_page.svg" height="20px"/>
                          {/* <>
                            {screen !== "Transporter" && <IconButton
                              key={x}
                              style={{ padding: "8px" }}
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
                              {<img src="./next_page.svg" />}
                            </IconButton>}
                            {screen === "Transporter" && <IconButton
                              key={x}
                              style={{ padding: "8px" }}
                              onClick={() => {
                                handleClick(row, null, null, null);
                              }}
                            >
                              {<img src="./next_page.svg" />}
                            </IconButton>}
                          </> */}
                          </IconButton>
                        </BlueTooltip>
                      ))}
                    </StyledFixedCell>
                  ) : null}
                </StyledTableRow>
              ))}
            </TableBody>
          </SpacedTable>

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
            classes={{ caption: classes.pagination }}
          />

        </>
      ) : (<Paper elevation={5} style={{ borderRadius: 8, padding: '30px', marginTop: 20, minWidth: '760px', minHeight: '100px', color: '#FF7171' }}>
        <Grid container direction="row" spacing={5}>
          <Grid item sm={12} xs={12}>
            <Typography variant="subtitle1" style={{ fontSize: '16px', textAlign: 'center', fontWeight: 600 }}>
              {'No records found'}
            </Typography>
          </Grid>
          {remoteUrl.includes("status=") && <Grid item sm={12} xs={12} style={{ padding: 0, textAlign: 'center', fontFamily: 'Dubai Light', fontWeight: 600, textDecoration: 'underline' }}>
            <Link onClick={() => {
              //  let url;
              // if(remoteUrl.includes("VERIFY POD"))
              //   url ="/ptms/app/api/secure/requestDetails/search?option=VERIFY POD" +
              //   "&statusCode=PODUPL";
              // else if(remoteUrl.includes("MISCELLANEOUS INVOICES"))
              //   url = "/ptms/app/api/secure/requestDetails/search?option=MISCELLANEOUS INVOICES" +
              //   "&statusCode=INVAPPR";
              // else 
                let  url = "/ptms/app/api/secure/requestDetails/search?option=ALL";
                loadHttp(url, 0)
            }}>Reset</Link>
          </Grid>}
        </Grid>
      </Paper>)}

      {requestPopup && <RequestDetailsPopUp
        request={selectedBooking}
        onClose={() => setRequestPopup(false)}
      />}
    </>
  );
};

export default React.memo(CustomizedDataTable);
