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
import Paper from "@material-ui/core/Paper";
import {
  Button,
  IconButton,
  Icon,
  TablePagination,
  TableSortLabel,
  TextField,
  Tooltip,
  CircularProgress,
} from "@material-ui/core";
import "./table.css";
import { TableProps } from "./tableProps";
import { COLUMN_TYPE_STRING } from "../../common/Constants";
import AlertDialog from "../dialog/alertDialog";
import { getHttp } from "../../common/HttpService";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const getTableRow = ({ dk, row, index }: any) => {
  let rd = "row." + dk.key;
  let datastr = eval(rd);
  if (dk.type === COLUMN_TYPE_STRING)
    return (
      <StyledTableCell key={index} align="center">
        {datastr}
      </StyledTableCell>
    );
  else
    return (
      <StyledTableCell align="center" key={index}>
        {datastr}
      </StyledTableCell>
    );
};

const DataTable: React.FC<TableProps> = ({
  tableData,
  tableKeys,
  handleClick,
  actions = [],
  remote,
  remoteUrl,
  refresh,
  dataRootKey,
}) => {
  const [dtstate, setdtstate] = useState({
    rowsPerPage: 10,
    page: 0,
    sortColumn: null,
    currentPageRows: [],
    currentPageKey: [],
    refresh: 0,
  });
  const [alertOpen, setAlertOpen] = useState({ isopen: false, errorMsg: "" });
  const [loading, setLoading] = useState(false);

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
      return tk.sort === true && tk.sortActive === true;
    });

    setdtstate((prevState) => ({
      ...prevState,
      sortColumn: sortEle[0],
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
      // 'https://jsonplaceholder.typicode.com/users'

      if (remoteUrl === "" || remoteUrl.trim() === "") return;

      loadHttp(remoteUrl);
    }
  };

  const loadHttp = (
    remoteUrl: any,
    pageNo = dtstate.page,
    pageSize = dtstate.rowsPerPage
  ) => {
    setLoading(true);
    let fnUrl = "";
    if (remoteUrl.indexOf("?") === -1) {
      fnUrl = remoteUrl + "?pgNo=" + pageNo + "&pgSize=" + pageSize;
    } else {
      fnUrl = remoteUrl + "&pgNo=" + pageNo + "&pgSize=" + pageSize;
    }

    getHttp({ url: fnUrl }, false)
      .then((e) => {
        let remoteData = e;
        if (dataRootKey && dataRootKey !== "") {
          let keyEle = "e." + dataRootKey;
          remoteData = eval(keyEle);
          console.log(remoteData);
        }
        setdtstate((prevState) => ({
          ...prevState,
          currentPageKey: tableKeys,
          refresh: refresh,
          page: 0,
          rowsPerPage: 10,
          currentPageRows: remoteData,
        }));
        setLoading(false);
      })
      .catch((error) => {
        updateAlertState(true, error);
        setLoading(false);
      });
  };

  const handleSort = (scol: any) => {
    if (scol.id === dtstate.sortColumn.id) {
      if (scol.dir === "asc") scol.dir = "desc";
      else scol.dir = "asc";
    } else {
      scol.dir = "asc";
    }
    // setdtstate((prevState) => ({
    //     ...prevState,
    //     sortColumn: scol
    // }));
    let fnlUrl = null;
    if (remoteUrl.indexOf("?") === -1)
      fnlUrl = remoteUrl + "?sortCol=" + scol.id + "&sortOrder=" + scol.dir;
    else fnlUrl = remoteUrl + "&sortCol=" + scol.id + "&sortOrder=" + scol.dir;

    loadHttp(fnlUrl, 1, 10);
  };

  const getTableHeadRow = ({ dk, index }: any) => {
    // if (dk.type === COLUMN_TYPE_STRING)
    return (
      <StyledTableCell key={index} align="center">
        {dk.name}
        {dk.sort === true && (
          <TableSortLabel
            key={index + 1}
            className="table-sort-icon"
            active={dtstate.sortColumn.id === dk.id}
            direction={
              dtstate.sortColumn.id === dk.id ? dtstate.sortColumn.dir : "asc"
            }
            onClick={() => {
              handleSort(dk);
            }}
          />
        )}
      </StyledTableCell>
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
        <div className="main-table-div">
          {loading && <CircularProgress className="dtable-loader" />}
          {loading && <div className="dtable-overlay"></div>}
          <Paper style={{ padding: "20px", marginBottom: "20px" }}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
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
                        getTableRow({ dk, row, index })
                      )}
                      {actions.length > 0 ? (
                        <StyledTableCell
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
                              <IconButton
                                key={x}
                                style={{ padding: "0px" }}
                                onClick={() => {
                                  handleClick(row, extIndex, x, act);
                                }}
                              >
                                {
                                  <Icon style={{ color: act.color }}>
                                    {act.icon}
                                  </Icon>
                                }
                              </IconButton>
                            </Tooltip>
                          ))}
                        </StyledTableCell>
                      ) : null}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              colSpan={3}
              component="div"
              count={dtstate.currentPageRows.length}
              rowsPerPage={dtstate.rowsPerPage}
              page={dtstate.page}
              backIconButtonProps={{ id: "backId" }}
              onChangePage={handleChangePage}
              nextIconButtonProps={{ id: "nextId" }}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      ) : null}
    </>
  );
};

export default React.memo(DataTable);
