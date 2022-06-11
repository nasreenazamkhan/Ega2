import React, { } from "react";
import { InputLabel, makeStyles } from "@material-ui/core";
import { Table, TableBody, TableCell, TableRow, Button } from "@material-ui/core";
import { default as MuiButton } from "@material-ui/core/Button";
import { createStyles, withStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  divStyle: {
    display: 'flex',
    border: '1px solid #0568AE',
    borderRadius: '8px',
    minHeight: "75px",
    marginBottom: "35px",
    boxShadow: '1px 1px 1px #0568AE',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
  },
  tableStyle: {
    // borderTop:'0.5px solid #0568AE'
  },
  button: {
    background: '#FAFAFA',
    color: '#0E1B3D',
    border: '1px solid #0E1B3D',
    '&:hover': {
      color: '#1360D2',
    }
  }
}));

const InfoBox = (props) => {
  const classes = useStyles();

  const renderButtons = (button, index) => {
    return (
      <Button
        style={{paddingLeft:'8px', paddingRight:'8px'}}
        key={index}
        variant={button == 'My Jobs' ? 'outlined' : ''}
        onClick={(e) => { props.onSelect(button) }}
      >{button}</Button>
    )
  }

  return (
    <>
      <div className={classes.divStyle}>
        <Table size="small" className={classes.tableStyle}>
          <TableBody>
            <TableRow>
              <TableCell style={{ borderBottom: '0px', backgroundColor: '#364F91', paddingRight: '14px', paddingLeft: '19px' }}>
                <img src="./info-white.svg" height="28px" />
              </TableCell>
              <TableCell style={{ borderBottom: '0px', fontWeight: 600, fontFamily: 'Dubai Light', fontSize: '17px', maxWidth: '800px' }}>
                {props.message}
              </TableCell>

              {props.buttonNames.map((button, index) => (
                <TableCell style={{ borderBottom: '0px' }}>
                  {renderButtons(button, index)}
                </TableCell>))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default InfoBox;
