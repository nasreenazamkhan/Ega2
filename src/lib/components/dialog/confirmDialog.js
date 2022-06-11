import React from 'react'
import { AppDialog } from './dialogBox'

function ConfirmDialog(props) {
    return (
        <div>
            <AppDialog title={props.title} onClose={props.onClose} children={props.children} closeTxt={props.closeTxt}
                confirmTxt={props.confirmTxt} onConfirm={props.onConfirm} isConfirm={true} isopen={props.isopen}
                closeIcon={props.closeIcon} openIcon={props.openIcon} closeButtonCss={props.closeButtonCss} confirmButtonCss={props.confirmButtonCss}>
                {props.children}
            </AppDialog>

        </div>
    )
}

export default React.memo(ConfirmDialog);
