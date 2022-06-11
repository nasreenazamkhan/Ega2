import React, { Component } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@material-ui/core";
import './dialog.css';
import AppButton from '../buttons/appButton';
import { Icon } from "@material-ui/core";
import Close from "@material-ui/icons/Close";


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
        isDialog?: boolean;
        disable?: boolean;
        closeIcon?: string;
        openIcon?: string;
        confirmButtonCss?: any;
        closeButtonCss?: any;
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
        closeTxt: 'Close',
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
            <Dialog open={this.props.isopen} >
                <DialogTitle id="customized-dialog-title" style={{ padding: 10 }} disableTypography className="dialog-title">
                    {this.props.title}
                    <IconButton className="icon-button" aria-label="close" onClick={this.handleClose}>
                        <Close style={{ fill: '#0E1B3D' }}/>
                    </IconButton>
                </DialogTitle>
                <DialogContent style={{margin: '20px'}}>
                    {this.props.children}
                </DialogContent>
                <DialogActions style={{ alignSelf: "center" }}>
                    {this.props.closeTxt &&
                        <AppButton
                            color="#E95A57"
                            type="button"
                            text={this.props.closeTxt}
                            handleClick={this.handleClose}
                            icon={this.props.closeIcon}
                            css={this.props.closeButtonCss}
                        />}
                    {(this.props.isConfirm || this.props.isDialog) &&
                        <AppButton
                            disabled={this.props.disable}
                            type="submit" color="#73BF7E"
                            text={this.props.confirmTxt}
                            icon={this.props.openIcon}
                            css={this.props.confirmButtonCss}
                            handleClick={(e: any) => {
                                this.props.onConfirm(e);
                            }} />
                    }
                </DialogActions>
            </Dialog>

        )
    }
}


