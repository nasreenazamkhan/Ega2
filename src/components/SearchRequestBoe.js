import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import  FormContainer  from '../lib/components/formContainer/formContainer';
import SelectBox from '../lib/components/select/selectBox';
import DataTable from '../lib/components/table/DataTable';


let searchForm = {
    status: ''
    

};


function SearchRequestBoe() {

    let fmk;

    const tableKeys = [
        { name: "Request Boe Number", type: 0, key: "boeNo" },
        { name: "No of Containers", type: 0, key: "contNo" },
        { name: "Request Date", type: 0, key: "requestDate" },
        { name: "Cargo Consignee", type: 0, key: "consignee" },
        { name: "Status", type: 0, key: "status" },
        { name: "Company Code", type: 0, key: "companyCode" }
    ];


    const statusOptions = [
        { "label": "New", "value": "NEW" }, 
        { "label": "Pending Acceptance", "value": "PACC" }, 
        { "label": "Accepted", "value": "ACC" },
        { "label": "Cancelled", "value": "CNCL" }
    ];

    const tableData = [];

    const url="/ptms/app/api/secure/boeRequest/fetchAllRequestBOEs/ACC";


    return (
        <Formik 
        enableReinitialize
    >{
        formik => {
            fmk = formik;
            return (
                <>
                   <FormContainer title="Search BOE Request">
                 { <div className="row">
                                        <div className="col-md">
                                            <SelectBox label={"Status"} name={"status"}
                                                options={statusOptions} fieldAction={(action, e) => {
                                                    console.log(e.target.value);
                                                }} />
                                        </div>
                                       
                                    </div>  
                                    
                }
                                       
                </FormContainer>
                <div style={{ marginTop: "10px" }}>
                                <div className="row" >
                                    <div className="col">
                                        <DataTable tableData={tableData} tableKeys={tableKeys} remote={true} remoteUrl={url}/>
                                    </div>
                                </div>
                            </div>
                </>
                )
        }  
    }
    </Formik >
    )
}

export default SearchRequestBoe
