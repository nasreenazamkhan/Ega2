import React, { useEffect, useRef, useState } from "react";
import CustomizedDataTable from "../../../lib/components/table/CustomizedDataTable";
import { COLUMN_TYPE_STRING, COLUMN_TYPE_NUMBER, } from "../../../lib/common/Constants";
import * as endpointContants from '../../../utils/ptmsEndpoints';
import RateCardPopup from "./RateCardPopup";
import CustomDialog from "../../../lib/components/dialog/customDialog";
import TransporterService from "../../../service/TransporterService";
import { Grid } from "@material-ui/core";

const haulierCol = [
    {
        name: "Haulier Name",
        type: COLUMN_TYPE_STRING,
        key: "haulierName",
        id: 0,
        sort: true,
        sortActive: true,
    },
    {
        name: "Haulier Code",
        type: COLUMN_TYPE_STRING,
        key: "haulierCode",
        id: 1,
        sort: true,
        sortActive: true,
    },
    {
        name: "Onboarded",
        type: COLUMN_TYPE_STRING,
        key: "isOnBoarded",
        id: 2,
        sort: true,
        sortActive: true,
    },
    {
        name: "Bookings",
        type: COLUMN_TYPE_NUMBER,
        key: "noOfBookings",
        id: 3,
        sort: true,
        sortActive: true,
    },
    {
        name: "Rate Card",
        type: COLUMN_TYPE_NUMBER,
        key: "rateCard",
        id: 4,
        sort: true,
        sortActive: false,
    },
    {
        name: "Earnings",
        type: COLUMN_TYPE_STRING,
        key: "earnings",
        id: 5,
        sort: true,
        sortActive: true
    },
    {
        name: "Ratings",
        type: COLUMN_TYPE_STRING,
        key: "ratings",
        id: 6,
        sort: true,
        sortActive: true,
    },
];

const rateCardForm = {
    rateType: '',
    rateAmount: '',
    validTo: '',
    validFrom: ''
}

export default function HaulierList(props: any) {
    const [pstate, setPstate] = useState(0);
    const [rateCardPopup, setRateCardPopup] = useState(false);
    const [rateCardData, setRateCardData] = useState([]);
    const [haulierCode, setHaulierCode] = useState([]);
    const [remoteUrl, setRemoteUrl] = useState<any>();
    const [addNewTransporterPopup, setAddNewTransporterPopup] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        console.log(props)
        const url = props.haulierCode ? endpointContants.haulierList + "?haulierCode=" + props.haulierCode : endpointContants.haulierList;
        setRemoteUrl(url);
        setPstate(pstate + 1);
    }, [props]);

    const handleConfirm = async () => {
        const data = {
            code: props.haulierCode,
            name: props.haulierName
        }
        let res = await TransporterService.saveHaulier(data);
        console.log('saveOrUpdateRateCard', res.status, res)
        if (res) {
            console.log('saveOrUpdateRateCard', res);
            setPstate(pstate + 1);
            setAddNewTransporterPopup(false);
        }
    }

    return (
        <>
         <Grid item xs={12} style={{ color: '#0E1B3D', fontSize: '15px', fontFamily:'Dubai Regular', fontWeight: 600, paddingTop: '20px', paddingBottom: 5 }}>
            {`Displaying ${totalCount} Hauliers`}
          </Grid>
            {remoteUrl && <CustomizedDataTable
                refresh={pstate}
                tableKeys={haulierCol}
                remote={true}
                remoteUrl={remoteUrl}
                dataRootKey={"elements"}
                countData={(e:any) => setTotalCount(e)}
                screen={"Haulier"}
                handleClick={(row, index, action, element) => {
                    if (row) {
                        setRateCardPopup(true);
                        setRateCardData(row.rateCardList)
                        setHaulierCode(row.haulierCode);
                    } else {
                        if (props.haulierCode)
                            setAddNewTransporterPopup(element.noTransporter);
                    }
                }}
            />}
            {rateCardPopup &&
                <RateCardPopup
                    rateCardData={rateCardData}
                    onClose={() => {
                        setRateCardPopup(false);
                    }}
                    onSave={()=>{
                        setRateCardPopup(false);
                        setPstate(pstate + 1)
                    }}
                    haulierCode={haulierCode}
                />}
            {addNewTransporterPopup && <CustomDialog
                open={addNewTransporterPopup}
                title={"Add Transporter?"}
                isHaulierAdd={true}
                onClose={() => {
                    setAddNewTransporterPopup(false);
                }}
                onConfirm={handleConfirm}>
                <p style={{ textAlign: "center", fontSize: "16px", fontFamily: 'Dubai Light', fontWeight: 600 }}>
                    {`Would you like to save ${props.haulierCode} - ${props.haulierName}?`}
                </p>
            </CustomDialog>}
        </>
    )

}
