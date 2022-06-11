import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import { InputLabel, Paper, TableCell, TextBox, OutlinedInput, makeStyles, Typography } from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import { withStyles, createStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import moment from "moment";
import Button from "@material-ui/core/Button";
import UploadDocumentPopup from "../transporter/UploadDocumentPopup";
import Link from "@material-ui/core/Link";
import { useFormContext, Controller } from "react-hook-form";

const useOutlinedInputStyles = makeStyles(() => ({
  root: {
    "& $notchedOutline": {
      borderColor: "#168FE4BC",
      color: "#686868",
      borderRadius: '4px',
      boxShadow: '0px 0px 5px #00000029',
    },
    "& .MuiInputBase-input": {
      fontFamily: 'Dubai Light',
      fontSize: '14px',
      fontWeight: 600,
    },
    "& .MuiOutlinedInput-input": {
      padding:0,
      paddingLeft: '10px',
      paddingRight: '10px'
    },
    "& .MuiOutlinedInput-multiline":{
      padding: '0px 14px'
    },
  },
  focused: {},
  notchedOutline: {},
}));

const StyledTableCell = withStyles(() =>
  createStyles({
    head: {
      fontSize: '16px',
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      color: '#000000',
      minWidth: '140px'
    },
    body: {
      fontSize: '15px',
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      borderBottom: '0px',
      minWidth: '140px',
      color: '#000000',
      padding: 0
    },
  }),
)(TableCell);

const StyledBlueButton = withStyles(() =>
createStyles({
  root: {
    border: "1px solid #1360D2",
    float: "right",
    minWidth: '90px',
    height: '34px',
    fontSize: "14px",
    borderRadius: '3px',
    fontWeight: 600,
    fontFamily: 'Dubai Light',
    color: '#FFFFFF', 
    backgroundColor: '#1360D2',
    '&:hover': {
      color: '#1360D2',
    }
  }
})
)(Button);

const ContainerSummary = (props) => {
  const outlinedInputClasses = useOutlinedInputStyles();
  console.log("container summary,", props.containerSummary);
  const [reRender, setRerender] = useState(0);
  const { errors } = useFormContext();
  const [showColumns] = useState(!props.containerSummary.showColumn);
  const [lengthMsg, setMaxLengthMsg] = useState('');
  const [remarks, setRemarks] = useState('');
  // const containerSummaryForm = {
  //   requesterName:'',
  //   requesterNumber:'',
  //   requesterComments:''
  // };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  // const methods = useForm({
  //   mode: "onChange",
  //   reValidateMode: "onChange",
  //   defaultValues: containerSummaryForm,
  // });

  // const handleSubmit = () => {
  //   methods.trigger();
  //   let values = methods.getValues();

  // }

  // useEffect(() => {
  //   if(props.validateForm)
  //   {
  //     handleSubmit();


  //   }

  // },[props.validateForm])

  const hiddenFileInput = React.useRef(null);
  const hiddenFileReInput = React.useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
    // setUploadDocumentPopup(true);
  };

  const handleReClick = () => {
    hiddenFileReInput.current.click();
    // setUploadDocumentPopup(true);
  };

  const handleChange = e => {
    const file = e.target.files[0];
    let promiseData = new Promise(
      (resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.onerror = (err) => {
          reject(err);
        };
        reader.readAsDataURL(file);
      }
    );

    promiseData.then((result) => {
      const contentArr = result.split(",");
      const fileType = contentArr[0]
        .replace("data:", "")
        .replace(";base64", "");
      props.containerSummary.fileContent = contentArr[1];
      props.containerSummary.fileType = fileType;
      props.containerSummary.fileName = file.name;
      setRerender(reRender + 1);
    });
  }

  const downloadFile = (file) => {
    const linkSource = `data:${file.filetype};base64,${file.fileContent}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = file.fileName;
    downloadLink.target = "_blank";
    // alert(downloadLink);
    downloadLink.click();
  }

  return (
    <>
      <Table size="small" style={{ marginLeft: "12px" }}>
        <TableBody>
          <TableRow>
            <StyledTableCell colSpan={2}>
              <Grid container spacing={2} style={{ fontSize: "17px", color: "#000000", marginBottom:0, fontFamily:'Dubai Regular' }}>
                <Grid item xs={3}>
                  Total Containers
                </Grid>
                <Grid item xs={2}>
                  {props.containerSummary.containerList.length}
                </Grid>
                <Grid item xs={3}>
                  Total Trucks
                </Grid>
                <Grid item xs={2}>
                  {props.containerSummary.truckNumber}
                </Grid>
              </Grid>
            </StyledTableCell>
          </TableRow>
          {showColumns &&
            <>
              <TableRow>
                <StyledTableCell style={{paddingBottom:'10px', fontFamily:'Dubai Regular', fontSize:'16px'}}>
                  Drop Details
                </StyledTableCell>
                <StyledTableCell colSpan={3} style={{paddingBottom:'10px', color:'#686868'}}>
                  {props.containerSummary.containerList[0].dropAddress}
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell style={{paddingBottom:'10px', fontFamily:'Dubai Regular', fontSize:'16px'}}>
                  Drop Date and Time
                </StyledTableCell>
                <StyledTableCell colSpan={3} style={{paddingBottom:'10px', color:'#686868'}}>
                  {props.containerSummary.date_time}
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell style={{paddingBottom:'30px', fontFamily:'Dubai Regular', fontSize:'16px'}}>
                  Drop Interval
                </StyledTableCell>
                <StyledTableCell colSpan={3} style={{paddingBottom:'30px', color:'#686868'}}>
                  {props.containerSummary.dropInterval == '0 min' ? 'No Interval' : props.containerSummary.dropInterval }
                </StyledTableCell>
              </TableRow>
            </>}
          <TableRow>
            <StyledTableCell>
              <Grid container spacing={1} >
                <Grid item style={{color:'#626262', paddingBottom:0}} xs={12}>
                  Requester Name
                </Grid>
                <Grid item xs={12} style={{paddingTop:0}}>
                  <OutlinedInput
                    style={{ height: "33px", width: "171px" }}
                    classes={outlinedInputClasses}
                    id="requesterName"
                    name="containerSummary.requesterName"
                    placeholder="Enter name"
                    size="small"
                    variant="outlined"
                    defaultValue={props.containerSummary?.requesterName}
                    inputRef={props.register({ required: true, maxLength: 50 })}
                    inputProps={{
                      maxLength: 50,
                    }}
                    error={errors?.containerSummary?.requesterName ? true : false}
                    onChange={(e) => {
                      console.log(errors?.containerSummary?.requesterName)
                      props.containerSummary.requesterName = e.target.value;
                    }}
                    fullWidth
                  />
                </Grid>
                {errors?.containerSummary?.requesterName && <Grid item>
                    <span style={{ fontSize: '14px', color: 'red' }}>Requester Name is required and maxlength is 50</span>
                  </Grid>}
              </Grid>
            </StyledTableCell>
            <StyledTableCell>
              <Grid container spacing={1}>
                <Grid item style={{color:'#626262', paddingBottom:0}} xs={12}>
                  Requester Contact
                </Grid>
                <Grid item xs={10} style={{paddingTop:0}}>
                  <OutlinedInput
                    style={{ height: "33px", width: "200px" }}
                    classes={outlinedInputClasses}
                    autoComplete="off"
                    id="requesterContact"
                    name="containerSummary.requesterContact"
                    placeholder="Format: 971xxxxxxxxx"
                    size="small"
                    variant="outlined"
                    inputProps={{
                      maxLength: 12,
                    }}
                    inputRef={props.register({ required: true, pattern: /^[0-9]\d{10,11}$/ })}
                    defaultValue={props.containerSummary?.requesterContactNumber}
                    error={errors?.containerSummary?.requesterContact ? true : false}
                    onChange={(e) => {
                      props.containerSummary.requesterContactNumber = e.target.value;
                    }}
                    fullWidth
                  />
                </Grid>
                {errors?.containerSummary?.requesterContact && <Grid item>
                  <span style={{ fontSize: '14px', color: 'red' }}>Requester contact number is required in format 971xxxxxxxxx </span>
                  </Grid>}
              </Grid>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell colSpan={3} style={{color:'#626262'}}>
              Importer Comments (if any)
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell colSpan={3} >
              <OutlinedInput
                style={{ width: "100%" }}
                classes={outlinedInputClasses}
                rows={2}
                multiline="true"
                id="importerComments"
                name="containerSummary.importerComments"
                placeholder="Please enter comments here"
                size="small"
                variant="outlined"
                defaultValue={props.containerSummary.importerComments}
                onChange={(e) => {
                  props.containerSummary.importerComments = e.target.value;
                  setRemarks(e.target.value)
                  if (e.target.value.length >= 230)
                    setMaxLengthMsg(250 - e.target.value.length + ' characters left.')
                  else
                    setMaxLengthMsg('')
                }}
                inputProps={{
                  maxLength: 250,
                }}
                inputRef={props.register({ maxLength: 250 })}
                error={errors?.containerSummary?.importerComments ? true : false}
                fullWidth
              />
              {/* {errors?.containerSummary?.importerComments &&
                <span style={{ fontSize: '14px', color: 'red' }}>Only 200 characters allowed</span>} */}
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    style={{ textAlign: 'left', fontFamily: 'Dubai Light', fontWeight: 600, fontSize: '0.8rem', color: '#ff0101', paddingLeft: '5px' }}>
                    {lengthMsg}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    style={{ fontFamily: 'Dubai Light', fontWeight: 600, fontSize: '0.8rem', color: '#777777', textAlign: 'end', paddingRight: '5px' }}>
                    {remarks.length + '/' + 250}</Typography>
                </Grid>
              </Grid>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell colSpan={4} >
              <Grid container spacing={2} alignItems="flex-end" style={{marginBottom:'-20px'}}>
                <Grid item style={{color:'#626262'}}>
                  Supporting documents (if any)
                </Grid>
                {!props.containerSummary.fileContent && 
                <Grid item style={{textAlign:'center'}} alignContent="center" justify="center">
                  <StyledBlueButton 
                    onClick={handleClick}>
                    Upload
                  </StyledBlueButton>
                  <input type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                </Grid>}
                {props.containerSummary.fileContent &&
                  <>
                    <Grid item >
                      <Link
                        style={{
                          textDecoration: "underline",
                          whiteSpace: "nowrap",
                        }}
                        onClick={() => {
                          downloadFile({ fileName: props.containerSummary.fileName, fileType: props.containerSummary.containers.fileType, fileContent: props.containerSummary.containers.fileContent })
                        }}
                      >
                        {props.containerSummary.fileName}
                      </Link>
                    </Grid>
                    <Grid item >
                      <StyledBlueButton 
                        variant="outlined"
                        onClick={handleReClick}>
                        Re Upload
                      </StyledBlueButton>
                      <input type="file"
                        ref={hiddenFileReInput}
                        onChange={handleChange}
                        style={{ display: 'none' }}
                      />
                    </Grid>
                  </>}
              </Grid>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
export default ContainerSummary;
