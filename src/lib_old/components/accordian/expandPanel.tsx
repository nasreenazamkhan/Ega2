import React from 'react'
import { AccordionSummary, Typography, AccordionDetails, Accordion } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './expPanel.css';


function ExpandPanel(props: any) {
    return (
        <>
            <Accordion defaultExpanded={true} className="exp-panel">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    className="panel-header"
                    id="panel1a-header"
                >
                    <span className="panel-header-text">{props.title}</span>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="panel-details"> {props.children}</div>
                </AccordionDetails>
            </Accordion>
        </>

    )
}

export default React.memo(ExpandPanel);
