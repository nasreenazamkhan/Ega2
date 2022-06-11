import React, { Component } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@material-ui/core";
import './dialog.css';
import AppButton from '../buttons/appButton';
import { Icon } from "@material-ui/core";


type DialogProps =
    {
        title?: string;
        body?: string;
        closeTxt?: string;
        confirmTxt?: string;
        isopen: boolean;
        onClose?(e: any): void;
        onConfirm?(e: any): void;
        onCancel?(e: any): void;
        isAlert?: boolean;
        isConfirm?: boolean;
        isDialog?: boolean

    };



export class AppDialog extends Component<DialogProps> {

    constructor(props: any) {
        super(props);
    }

    static defaultProps = {
        isopen: true,
        isAlert: false,
        isConfirm: false,
        isDialog: false,
        confirmTxt: 'Confirm',
        closeTxt: 'Close'
    }

    styles = {
        dialogPaper: {
            minHeight: '80vh'
        },
    };

    handleClose = (e: any) => {
        this.props.onClose(e);
    }


    render() {
        return (
            <Dialog open={this.props.isopen} style={{ width: "50" }}>
                {/* <DialogTitle id="customized-dialog-title">
                    {this.props.title}
                    <IconButton className="icon-button" aria-label="close" onClick={this.handleClose}>
                        <Icon>close</Icon>
                    </IconButton>
                </DialogTitle> */}
                <DialogContent dividers>
                    {this.props.children}
                </DialogContent>
                <DialogActions>
                    <AppButton color="primary" type="button" text={this.props.closeTxt} handleClick={this.handleClose} />

                    {(this.props.isConfirm || this.props.isDialog) &&
                        <AppButton type="submit" color="primary" text={this.props.confirmTxt} handleClick={(e: any) => {
                            this.props.onConfirm(e);
                        }} />
                    }


                </DialogActions>
            </Dialog>
        )
    }
}


