import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from "@material-ui/core/Link";

import { IconButton, Icon, TablePagination, TableSortLabel, TextField, Tooltip, CircularProgress,Checkbox,Grid,
    Typography,
    Avatar} from '@material-ui/core';
import { TableProps } from './tableProps';
import { COLUMN_TYPE_STRING } from '../../common/Constants';
import AlertDialog from '../dialog/alertDialog';
import { getHttp } from '../../common/HttpService';
import Collapse from '@material-ui/core/Collapse';
import Popover from '@material-ui/core/Popover';
import MuiTableContainer from "@material-ui/core/TableContainer";
import { BorderBottom, BorderLeftOutlined } from '@material-ui/icons';
import { AnyAction } from 'redux';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import RequestDetailsPopUp  from "../../../components/request/RequestDetailsPopUp";
import ContainerPopUp  from "../../../components/request/ContainerPopup";



const SpacedTable= withStyles((theme: Theme) =>
	createStyles({
	    root: {
	        borderCollapse: 'separate',
	        borderSpacing: '0 9px', 
            size:'small'
        
	    }
	}
)
)(Table);

const useStyles = makeStyles((theme) => ({

    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  }));



const InnerTableContainer = withStyles((theme: Theme) =>
    createStyles({
        root: {
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "5px",
              height: "10px",
              paddingLeft:"20px",
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 2px rgba(0,0,0,0.00)",
              webkitBoxShadow: "inset 0 0 2px rgba(0,0,0,0.00)",
            
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#787878",
              borderRadius: 2,
            },
          },
    })
)(MuiTableContainer);
// const StyledCollapse = withStyles((theme: Theme) =>
//     createStyles({
//         container: {
//         }
//     })
// )(Collapse);

const HeaderTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:hover': {
                backgroundColor: '#F9F9F9',
            },
        },
        selected: {
            backgroundColor: '#696F83 !important',
        },
        
    })
)(TableRow);
const CollapseTableRow = withStyles(theme => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: '#F9F9F9',
        opacity: '1'
      }
    }
  }))(TableRow);

const CollapseTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            paddingTop: 0,
            paddingBottom: 0,
            "&:$last-child": { paddingRight: '25px' },
            "&:$first-child": { paddingLeft: '25px'},
            whiteSpace: 'nowrap',
            color: '#848484',
            fontWeight: 'bold',
            fontSize: "14px",
            textAlign: 'left',
            borderBottom: '1px solid #F0F0F0',
			opacity: '1',
            height: '43px'
        },
        body: {
            paddingTop: 0,
            paddingBottom: 0,
            "&:$last-child": { paddingRight: '25px'},
            "&:$first-child": { paddingLeft: '25px' },
            whiteSpace: 'nowrap',
            fontSize: "14px",
            color: '#848484',
            textAlign: 'left',
            borderBottom: '0px',
            height: '43px',

    }}),
)(TableCell);

const CollapeHolderCell = withStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingTop: 0,
            paddingBottom: 0
        }
    })
)(TableCell);
const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            paddingTop: 0,
            paddingBottom: 0,
            color: '#0E1B3D',
            height: '64px',
            borderColor:'#0E1B3D',
            borderBottomWidth:'2px',
            fontSize:'17px',
            fontFamily: 'Dubai Medium'
        },
        body: {
            paddingTop: 0,
            paddingBottom: 0,
            height: '64px',
           "&:$last-child": { borderRight: '1px solid #E8E8E8'},
            "&:$first-child": { borderLeft: '1px solid #E8E8E8' },
            whiteSpace: 'nowrap',
            fontSize: '16px',
            color: '#808080',
            borderBottom: '1px solid #E8E8E8',
            borderTop: '1px solid #E8E8E8',
            overflow: 'hidden'
        },
    }),
)(TableCell);

const StyledFixedCell = withStyles((theme: Theme) =>
    createStyles({
     
        body: {
            paddingTop: 0,
            paddingBottom: 0,
            maxHeight: '64px',
            fontSize: '16px',
            color: '#808080',
            borderBottom: '1px solid #E8E8E8',
            borderTop: '1px solid #E8E8E8',
            overflow: 'ellipsis'
        },
    }),
)(TableCell);

const StyledRedTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            color: '#808080',
        },
        body: {
            whiteSpace: 'nowrap',
            fontSize:'16px',
            color: 'red',
            fontWeight:"bold",
            borderBottom: '1px solid #E8E8E8',
            borderTop: '1px solid #E8E8E8'
        },
    }),
)(TableCell);



const StyledBlueTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            color: '#808080',
        },
        body: {
            whiteSpace: 'nowrap',
            fontSize: '16px',
            color: '#2E8BE9',
            fontWeight:"bold",
            borderBottom: '1px solid #E8E8E8',
            borderTop: '1px solid #E8E8E8'
        }
    }),
)(TableCell);

const CustomizedCollapseDataTable : React.FC<TableProps> = ({ tableData, tableKeys, handleClick, actions = [], remote, remoteUrl, refresh, dataRootKey,chkbox=false,collapseChkBox=false,collapsableTableKeys=[],
    collapseTableList,keyTest,countData,onFilterSelected,selectedData,groupBy}) => {

        console.log("tableDate",tableData);
        
        console.log("selectedData",selectedData);

    const [dtstate, setdtstate] = useState({ rowsPerPage: 10, page: 0, sortColumn: null, currentPageRows: [], currentPageKey: [],collapseTableKey:[],count: 0 });
    const [alertOpen, setAlertOpen] = useState({ isopen: false, errorMsg: "" });
    const [loading, setLoading] = useState(false);
    const [reRender,setRerender]=useState(0);
    const [headerChecked,setHeaderChecked]=useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [headerRowLeftBorderUnchk,setHeaderRowLeftBorderUnchk]=useState('1px solid #E8E8E8');
    const [headerRowLeftBorderChk,setHeaderRowLeftBorderChk]=useState('1px solid #0E1B3D');
  
    const [requestPopup, setRequestPopup] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState("");
    const [containerPopup, setContainerPopup] = useState(false);
    const [selectedContainer, setSelectedContainer] = useState("");
    const [openC, setOpenC] = useState(false);
   
    const getTableRow = ({ dk, row, index }: any) => {
   
        let rd = 'row.' + dk.key;
        let datastr = eval(rd);
     
        if(dk.key==='status' && datastr==='Expired')
        {
            return (<StyledRedTableCell key={index} align="left" >{datastr}</StyledRedTableCell>) 
        }
        if(dk.key==='status' && datastr==='Active')
        {
            return (<StyledBlueTableCell key={index} align="left" >{datastr}</StyledBlueTableCell>) 
        }
        else if(dk.key==='location')
        {
        
                return (<StyledFixedCell >{datastr}</StyledFixedCell>) 
        
        }
        else if (dk.key === 'noOfContainers') {
            return (<StyledTableCell key={index} align="left" style={{color: openC ? '#fff':''}}>
                <Avatar style={{ height: '25px', width: '25px', fontFamily:'Dubai Light', backgroundColor: '#36A4F8', fontSize: '14px', marginLeft: "10%" }} > {datastr}</Avatar>
            </StyledTableCell>)
        }
        else if (dk.key === 'consigneeDetails') {
            const initials = datastr.substring(datastr.indexOf('/') + 1);
            return (<StyledTableCell key={index} align="left" style={{color: openC ? '#fff':''}}>
                <div style={{
                    display: 'inline-flex',
                    boxSizing: 'inherit',
                    textAlign: 'center',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <Avatar style={{ height: '25px', width: '25px', fontFamily:'Dubai Light', backgroundColor: randomColor(), fontSize: '14px', padding:'14px', marginRight:'8px' }} >{initials}
                    </Avatar>
                    {datastr.substring(0, datastr.indexOf('/'))}
                </div>

            </StyledTableCell>)
        } else if (dk.key === 'referenceNumber' && showLinks) {

            return (
                <StyledTableCell align="left" key={index} style={{color: openC ? '#fff':''}}>
                    <Link
                        style={{ textDecoration: "underline" }}
                        onClick={() => {
                            setSelectedBooking(row);
                            setRequestPopup(true);
                        }}
                    >
                        {datastr}
                    </Link>
               
               </StyledTableCell>) 
        }
        else if(dk.key==='transporterAmount' )
        {
            return (<StyledTableCell align="left" key={index} style={{color: openC ? '#fff':''}}>{datastr}  AED</StyledTableCell>)
        }  
       
        else
            return (<StyledTableCell align="left" key={index} style={{color: openC ? '#fff':''}}>{datastr}</StyledTableCell>)
    }
    
    
const getCollapseTableRow = ({ dk, row, index }: any) => {
    let rd = 'row.' + dk.key;
    let datastr = eval(rd);
    if(dk.key==='container_number' || dk.key==='dropZone' )
        {
           
            return (
                <StyledTableCell align="left" key={index}>
                        <Link
                          style={{ textDecoration: "underline" }}
                          onClick={() => { 
                              setSelectedContainer(row);
                              setContainerPopup(true);
                          }}
                          
                        >
                    {datastr}
                    </Link>
               
               </StyledTableCell>) 
        }
       else
    return (<CollapseTableCell key={index} align="left">{datastr}</CollapseTableCell>)
}


    const handleImgClick = (event:any) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleImgClose = () => {
      setAnchorEl(null);
    };
  
    const popOverOpen = Boolean(anchorEl);
    const id = popOverOpen ? 'simple-popover' : undefined;
   
    useEffect(() => {
        loadDatTable();
    }, []);

    
    useEffect(() => {
        loadDatTable();
    }, [refresh]);
 

    const updateAlertState = (status: boolean, msg: string) => {
        setAlertOpen({
            isopen: status,
            errorMsg: msg
        })
    }


    const setCurrentSortColumn = () => {
        let sortEle = tableKeys.filter((tk) => {
            
                  return tk.sort === true ;
            
                });
        setdtstate((prevState) => ({
            ...prevState,
            sortColumn: sortEle,
            IsbuttonClick: false,
        }));
    }

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
                collapseTableKey:collapsableTableKeys,
            }));
        } else {
            if (remoteUrl === '' || remoteUrl.trim() === '')
                return;
            loadHttp(remoteUrl,0);
        }

    }

    const markSelectedDataAsChecked=(remoteData:any)=>
    {
        const compareList=selectedData.reduce((objectsByRequest:any, obj:any) => {
            const value = obj[groupBy];
            objectsByRequest[value] = (objectsByRequest[value] || []).concat(obj.container_number);
            return objectsByRequest;
        }, {});
        Object.keys(compareList).forEach((item) => {
            var boeIndex= remoteData.elements.findIndex((x:any)=>x.referenceNumber===item);
            if(boeIndex!==-1){
                var containerNumber=0;
                compareList[item].forEach((y:any)=>{
                var containerIndex= remoteData.elements[boeIndex].containerList.findIndex((container:any)=>container.container_number===y);
                if(containerIndex!==-1){
                    containerNumber=containerNumber+1;
                    remoteData.elements[boeIndex].containerList[containerIndex].checked=true;
                }
                if(containerNumber=== remoteData.elements[boeIndex].noOfContainers)
                    remoteData.elements[boeIndex].checked=true; 
                });  
            }
        });
    }

    const loadHttp = (remoteUrl: any, pageNumber?:number ,pageSize = dtstate.rowsPerPage) => {
        setLoading(true);
        let fnUrl = '';
        let pageNo=pageNumber;
        if (remoteUrl.indexOf('?') === -1) {
            fnUrl = remoteUrl + '?pgNo=' + pageNo + '&pgSize=' + pageSize;
        } else {
            fnUrl = remoteUrl + '&pgNo=' + pageNo + '&pgSize=' + pageSize;
        }
        getHttp({ url: fnUrl }, false).then(e => {
            let remoteData = e;
            if(selectedData)
                markSelectedDataAsChecked(remoteData)
            countData(remoteData.count);
            if (dataRootKey && dataRootKey !== '') {
                let keyEle = 'e.' + dataRootKey;
                remoteData = eval(keyEle);
                console.log(remoteData);
            }
            setdtstate((prevState) => ({
                ...prevState,
                currentPageKey: tableKeys,
                refresh: refresh,
                page: pageNo,
                rowsPerPage: 10,
                currentPageRows: remoteData,
                collapseTableKey:collapsableTableKeys,
                count: e.totalElements
                
            }));
            setLoading(false);
           
        }).catch(error => {
            updateAlertState(true, error);
            setLoading(false);
        })
    }

    const handleSort = (scol: any) => {
        //if (scol.id === dtstate.sortColumn.id) {
            var currentSortColum=dtstate.sortColumn.find((y:any)=>y.id===scol.id);

            if (scol.dir === 'asc')
                scol.dir = 'desc';
            else
                scol.dir = 'asc';
        // } else {
        //     scol.dir = 'asc';
        // }
        currentSortColum.dir=scol.dir;
        let fnlUrl = null;
        if (remoteUrl.indexOf('?') === -1)
            fnlUrl = remoteUrl + '?sortCol=' + scol.id + '&sortOrder=' + scol.dir;
        else
            fnlUrl = remoteUrl + '&sortCol=' + scol.id + '&sortOrder=' + scol.dir;

        loadHttp(fnlUrl, 0, 10);
    }

    const getTableHeadRow = ({ dk, index }: any) => {

        var i=dk.id;
        console.log("test value",dtstate.sortColumn[i]);

        const filterClicked=(e:any)=>
        {
            onFilterSelected(e);
            handleImgClose();
        }
        return (
            <>
            <StyledTableCell key={index} align="left" style={{}}>{dk.name} 
               
                {dk.sort === true && dtstate.sortColumn[i] &&
                    <TableSortLabel key={index + 1} className="table-sort-icon"
                        active={true}
                        //direction={dtstate.sortColumn.dir }
                         direction={dtstate.sortColumn[i].dir==='asc'?'desc':'asc'}
                         onClick={() => {handleSort(dk);}}
                 />
               
                  
            }
            </StyledTableCell>
            {/* <Popover style={{ width: '300px', height: '200px'}}
                id={id}
                open={popOverOpen}
                anchorEl={anchorEl}
                onClose={handleImgClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'}}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'}}
                PaperProps={{
                    style: { width: '100px',height:'70px',boxShadow:'none', border: '1px solid',borderColor:'#CCCCCC' },
                }}
            >
                <div>{" "}</div>
                <div  style= {{ marginTop:'8px',fontSize:'15px',fontWeight:'bold',color:'#C62926',textAlign:'center',cursor: 'pointer'}} onClick={()=>filterClicked('Expired')}>Expired</div>
                <div style= {{ fontSize:'15px',fontWeight:'bold',color:'#2E8BE9',textAlign:'center',cursor: 'pointer' }} onClick={()=>filterClicked('Active')}>Active</div>
            </Popover> */}
            </>
        )
    }


    const getCollapseTableHeadRow = ({ dk, index }: any) => {
        return (
            <CollapseTableCell key={index} align="left">{dk.name}
            </CollapseTableCell>

        )
    }

    const getPageData = (currentPage: number, nextPage: number, rowsPerPage: number) => {
        return (tableData.slice((currentPage) * rowsPerPage, (nextPage) * rowsPerPage));

    }

    const handleChangePage = (event: any, newpage: number) => {
        if (remote !== true) {
            setdtstate((prevState) => ({
                ...prevState,
                page: newpage,
                currentPageRows: getPageData(newpage, newpage + 1, dtstate.rowsPerPage)
            }));
        } else {
            setdtstate((prevState) => ({
                ...prevState,
                page: newpage
            }));
            loadHttp(remoteUrl, newpage);
        }
    }

    const handleChangeRowsPerPage = (event: any) => {
        if (remote !== true) {
            setdtstate((prevState) => ({
                ...prevState,
                refresh: refresh,
                page: 0,
                rowsPerPage: event.target.value,
                currentPageRows: getPageData(0, 10, event.target.value)
            }));
        } else {
            let fnlUrl = remoteUrl + '?pageNo=1&pageSize=' + event.target.value;
            loadHttp(fnlUrl);
        }
    }

    const mapCollapseTableList= (row:any) => {
        let rd = 'row.' + collapseTableList ;
        let rk = 'row.' + keyTest ;
        let datastr = eval(rd);
        let keystr = eval(rk);
        return(
        datastr.map((row:any,ind:any) =>(/**style ={ ind % 2? { background : "#F9F9F9" }:{ background : "#FFFFFF" }} */
            <CollapseTableRow >
                <CollapseTableCell style={{width:'27px', paddingRight:'0px'}}>   
                    { collapseChkBox  &&     
                    <Radio size='small' checked={row.checked} onClick={(evnt: any) => {
                     
                                                            row.checked=!row.checked;
                                                          
                                                            setRerender(reRender+1);
                                                            handleClick(row, "",'collapseRowChecked', evnt);
                                                          }} />}
                </CollapseTableCell>
                {dtstate.collapseTableKey.map((dk) => (getCollapseTableRow({ dk, row, keystr })))}
          </CollapseTableRow>
            )
        ))
    }

    function CollapseRow({ row, extIndex }: any) {
        
        const [open, setOpen] = React.useState(row.openCollapsePanel);
        const [allChecked, setAllChecked] = React.useState(false);
        const [selectedValue, setSelectedValue] = React.useState();


        let rd = 'row.' + collapseTableList ;
        let datastr = eval(rd);
        let leftBorder=false;
        if(!row.checked && datastr!==undefined)
        {
        leftBorder =datastr.some(function(x:any){
            return x.checked ===true
        });
        }
      
        const handleChange = (event:any) => {
            console.log("radio button clicked ::",event);
            setSelectedValue(event.target.value);
        // row.checked=!row.checked;
        };

        
    
        return (
        <>
            <HeaderTableRow key={extIndex}  selected={open} >

                {chkbox === true ?
                    <StyledTableCell style={{width:'27px', paddingRight:'0px', borderLeft:leftBorder?headerRowLeftBorderChk:headerRowLeftBorderUnchk
                }}
                    >
                        


                         <Radio checked={row.checked} onClick={(evnt: any) => {
                           console.log("radio test ::",evnt);
                                                            row.checked=!row.checked;
                                                          
                                                            //let rd = 'row.' + collapseTableList ;
                                                            //let datastr = eval(rd);
                                                            datastr.forEach(function (item:any) {
    
                                                                item.checked=row.checked
                                                             
                                                            })
                                                            setRerender(reRender+1);
                                                              handleClick(row, extIndex, 'collapseRowHeaderChecked', evnt);
                                                          
                                                            } }/>

                    </StyledTableCell>
                    : null}
                {dtstate.currentPageKey.map(
                    (dk, index) => (getTableRow({ dk, row, index })))}
                {actions.length > 0 ?
                    <StyledTableCell align="right" style={{ width: '120px' }}>
                        {
                            actions.map((act, x) => (
                                <Tooltip key={x} title={act.tip} placement="top" arrow>
                                    <IconButton key={x} style={{ padding: "0px" }}
                                    onClick={() => { 
                                                row.openCollapsePanel=!row.openCollapsePanel
                                                setOpen( row.openCollapsePanel);
                                                setOpenC(row.openCollapsePanel);
                                        }
                                    }>
                                        {!row.openCollapsePanel && <img src="./plus.svg" />}
                                        {row.openCollapsePanel && <Icon style={{ color: '#FFFFFF', fontSize:'22px' }}>{act.icon1}</Icon>}
                                    </IconButton>
                                </Tooltip>
                            ))
                        }
                    </StyledTableCell>
                    : null}
            </HeaderTableRow>
            <TableRow>
                { open && /**StyledTableCell */
                <CollapeHolderCell colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <InnerTableContainer style={{ maxHeight: 200 }}>
                            <Table stickyHeader size="small" >
                                <TableHead>
                                    <TableRow >
                                        <CollapseTableCell></CollapseTableCell>
                                        {dtstate.collapseTableKey.map((dk, index) =>{ 
                                            return getCollapseTableHeadRow({ dk, index })
                                        })} 
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {mapCollapseTableList(row)}
                                </TableBody> 
                            </Table>
                        </InnerTableContainer>
                    </Collapse>
                </CollapeHolderCell>}
            </TableRow> 
        </> 
        )
    }
    return (
        <>  
        <AlertDialog isopen={alertOpen.isopen} message={alertOpen.errorMsg} onClose={(e: any) => {updateAlertState(false, '');}} />
            {loading || (dtstate.currentPageRows && dtstate.currentPageRows.length > 0) ?
                <div>
                    {loading && <CircularProgress className="dtable-loader" />} 
                    {loading && <div></div>}
                        <TableContainer >
                            <SpacedTable>
                                <TableHead >
                                    <TableRow style={{borderBottomColor:'#0E1B3D'}}>
                                      
                                            <StyledTableCell style={{width:'27px', paddingRight:'0px'}}>
                                            {/* <Radio  checked={headerChecked}
                                                                onClick={(evnt: any) => {
                                                                console.log(dtstate.currentPageRows);
                                                                setHeaderChecked(!headerChecked);
                                                                dtstate.currentPageRows.forEach(function (item:any) {
                                                                    item.checked=!headerChecked;
                                                                    
                                                                    let rd = 'item.' + collapseTableList ;
                                                                    let datastr = eval(rd);
                                                                    datastr.forEach(function (row:any) {
        
                                                                        row.checked=!headerChecked;
                                                                    })
                                                                })
                                                                handleClick(dtstate.currentPageRows, "",'collapseHeaderChecked', !headerChecked);
                                                            }}
                                                />  */}
                                            </StyledTableCell>
                                           
                                        
                                        {dtstate.currentPageKey.map((dk: any, index) => (
                                            getTableHeadRow({ dk, index })
                                        ))}
                                        {actions.length > 0 ?
                                            <TableCell style={{ width: '120px' }}></TableCell>
                                            : null
                                        }
                                     
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dtstate.currentPageRows.map((row, extIndex) => (
                                       <CollapseRow key={extIndex} row={row} extIndex={extIndex} />
                                    ))}
                                </TableBody>
                           </SpacedTable>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[]}
                            colSpan={3}
                            component="div"
                            count={dtstate.count}
                            rowsPerPage={dtstate.rowsPerPage}
                            page={dtstate.page}
                            backIconButtonProps={{ id: 'backId' }}
                            onChangePage={handleChangePage}
                            nextIconButtonProps={{ id: 'nextId' }}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                </div>
                :    
                (<Paper elevation={5} style={{ borderRadius: 8, padding: '30px', marginTop: 20, minWidth: '760px', minHeight: '100px', color: '#FF7171' }}>
                    <Grid container direction="row" spacing={5}>
                        <Grid item sm={12} xs={12}>
                            <Typography variant="subtitle1" style={{ fontSize: '16px', textAlign: 'center' }}>
                            <b>{'No records found'}</b></Typography>
                        </Grid>
                    </Grid>
                </Paper>)
            }

{ requestPopup && <RequestDetailsPopUp
        request={selectedBooking}
        onClose={()=>setRequestPopup(false)}
        />}

{containerPopup && (
        <ContainerPopUp
          containers={selectedContainer}
          onClose={()=>setContainerPopup(false)}
        />
      )}

        </>
    );
   
    
}



export default React.memo(CustomizedCollapseDataTable);