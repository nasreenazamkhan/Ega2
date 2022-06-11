import {
    Dialog, DialogContent, DialogTitle, TableCell, createStyles, withStyles, TableHead, Table, TableRow,
    Typography, TableBody, makeStyles, IconButton, Grid, Link
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CloseIcon from "@material-ui/icons/Close";

const StyledTableCell = withStyles(() =>
    createStyles({
        head: {
            fontSize: '17px',
            fontFamily: 'Dubai Regular',
            fontWeight: 600,
            color: '#434343',
            borderBottom: '0px',
            padding:'5px'
        },
        body: {
            fontSize: '16px',
            fontFamily: 'Dubai Light',
            fontWeight: 600,
            borderBottom: '0px',
            padding:'5px'
        },
    }),
)(TableCell);

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
    },
    dialogTitle: {
        backgroundColor: '#ffffff',
        textAlign: 'left',
        paddingBottom: 0,
    },
    link:{
        color: "#1360D2", 
        textDecoration: "underline",
        fontSize:'16px',
        paddingLeft:'12px',
        fontFamily: 'Dubai Light',
        fontWeight: 600,
    }
}));


export default function RateCardPopup(props: any) {
    const [open, setOpen] = useState(true);
    const [invoiceData, setInvoiceData] = useState<any>({});
    const classes = useStyles();

    const methods = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: props.rateCardData,
    });

    useEffect(() => {
        console.log('rateCardData', props.invoiceData);
        setInvoiceData(props.invoiceData)
    }, []);

    const handleClose = () => {
        props.onClose();
        setOpen(false);
    };

    const onInvoiceDownload = (invoice: any) => {
        const linkSource = `data:${invoice.filetype};base64,${invoice.fileContent}`;
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = invoice.fileName;
        downloadLink.target = "_blank";
        // alert(downloadLink);
        downloadLink.click();
    }


    const renderDialogTitle = () => {
        return (
            <Grid container style={{ marginBottom: 0 }}>
                <Grid item xs={11}>
                    <Typography style={{ fontSize: '18px', fontFamily: 'Dubai Regular', color: '#0E1B3D', fontWeight:600 }}>
                        TRANSPORTER INVOICE
                    </Typography>
                    <hr style={{ borderTop: '4px solid #FF3E3E', width: '15%', margin: 0 }} />
                </Grid>
                <Grid item xs={1}>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon style={{ fill: '#707070' }} />
                    </IconButton>
                </Grid>
            </Grid>
        );
    }

    return (
        <FormProvider {...methods}>
            <Dialog
                onClose={handleClose}
                open={open}
                PaperProps={{
                    style: { borderRadius: '0px', minWidth: '690px', minHeight: '260px', padding:'20px' }
                }}>
                <DialogTitle disableTypography className={classes.dialogTitle}>
                    {renderDialogTitle()}
                </DialogTitle>
                <DialogContent style={{ padding: '18px', marginTop: '-20px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>
                                    Invoice #
                                </StyledTableCell>
                                <StyledTableCell>
                                    Invoiced On
                                </StyledTableCell>
                                <StyledTableCell>
                                    Invoice Amount
                                </StyledTableCell>
                                <StyledTableCell>
                                    VAT Amount
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <StyledTableCell>
                                    {invoiceData?.invoiceNumber}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {invoiceData?.invoiceDate}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {invoiceData?.invoiceAmount} AED
                                </StyledTableCell>
                                <StyledTableCell>
                                    {invoiceData?.vatAmount} AED
                                </StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Table style={{marginTop:'18px'}}>
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                Description
                            </StyledTableCell>
                            <StyledTableCell>&nbsp;</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                            <StyledTableCell>
                                {invoiceData?.description}
                            </StyledTableCell>
                            <StyledTableCell>
                                <img src="./Invoice_icon.svg" alt="not available" height="28px" />
                                <Link className={classes.link} onClick={() => onInvoiceDownload({ fileType: invoiceData?.fileType, fileContent: invoiceData?.fileContent, fileName: invoiceData?.fileName })}>
                                    {invoiceData?.fileName}
                                </Link>
                            </StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </DialogContent>
            </Dialog>
        </FormProvider>
    );
}