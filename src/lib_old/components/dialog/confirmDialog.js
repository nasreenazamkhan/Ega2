import React from 'react'
import { AppDialog } from './dialogBox'

function ConfirmDialog(props) {
    return (
        <div>
            <AppDialog title="Alert" onClose={props.onClose}
                onConfirm={props.onConfirm} isConfirm={true} isopen={props.isopen}>
                {props.children}
            </AppDialog>

        </div>
    )
}

export default React.memo(ConfirmDialog);
