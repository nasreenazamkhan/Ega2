import React from "react";
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
import { Button, IconButton, Icon, Tooltip, Checkbox } from "@material-ui/core";
import { TableProps } from "./tableProps";

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
  if (dk.type === 0)
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

const getTableHeadRow = ({ dk, index }: any) => {
  if (dk.type === 0)
    return (
      <StyledTableCell key={index} align="center">
        {dk.name}
      </StyledTableCell>
    );
  else
    return (
      <StyledTableCell key={index} align="center">
        {dk.name}
      </StyledTableCell>
    );
};

const NormalTable: React.FC<TableProps> = ({
  tableData,
  tableKeys,
  actions,
  handleClick,
  chkbox,
}) => {
  const classes = useStyles();

  return (
    <>
      {tableData.length > 0 ? (
        <div style={{ padding: "20px" }}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {chkbox === true ? (
                    <StyledTableCell
                      style={{ width: "10px" }}
                    ></StyledTableCell>
                  ) : null}
                  {tableKeys.map((dk: any, index) =>
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
                {tableData.map((row, extIndex) => (
                  <StyledTableRow key={extIndex} className="checkBox-col">
                    {chkbox === true ? (
                      <StyledTableCell>
                        <Checkbox
                          checked={row.checked}
                          onClick={(evnt: any) => {
                            handleClick(row, extIndex, "check", evnt);
                          }}
                        />
                      </StyledTableCell>
                    ) : null}
                    {tableKeys.map((dk, index) =>
                      getTableRow({ dk, row, index })
                    )}
                    {actions.length > 0 ? (
                      <StyledTableCell align="right" className="actions-col">
                        {actions.map((act: any, indx) => (
                          <Tooltip
                            key={indx}
                            title={act.tip}
                            placement="top"
                            arrow
                          >
                            <IconButton
                              key={indx}
                              style={{ padding: "0px" }}
                              onClick={() => {
                                handleClick(row, extIndex, act);
                              }}
                            >
                              {
                                <>
                                  <Icon style={{ color: act.color }}>
                                    {act.icon}
                                  </Icon>
                                </>
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
        </div>
      ) : null}
    </>
  );
};

export default React.memo(NormalTable);
