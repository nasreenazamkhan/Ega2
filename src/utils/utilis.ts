import dayjs from 'dayjs'
const milliseconds = (h: any, m: any, s: any) => ((h * 60 * 60 + m * 60 + s) * 1000);


export const convertToMillSeconds = (interval: string) => {
    let timeParts = interval.split(":");
    if (timeParts[0] && !timeParts[1])
        return milliseconds(0, timeParts[0], 0);
    let result = milliseconds(timeParts[0], timeParts[1], 0);
    console.log("result convert interval ", result)
    return result;
}

export const timeStampsToDate = (timeStamps: number, timeInMilliseconds: number) => {
    let newTime = timeStamps + timeInMilliseconds
    return new Date(newTime).toISOString();
}

export const formatDate = (date: string) => {
    return dayjs(date).format("YYYY-MM-DD HH:mm");
}

// export const formatDateForddMMyyyy = (date: string) => {
//     return dayjs(date,"DD-MM-YYYY HH:mm").format("YYYY-MM-DD HH:mm");
// }

export const formatDateIso = (date: string) => {
    return dayjs(date).format("YYYY-MM-DD HH:mm");
}
//2020-11-20T00:54
export const getTimeStampsFromDate = (date: string) => {
    //  console.info("  DATE OT TT", Date.parse(date))
    //return Date.parse(date)
    return dayjs(date).valueOf();
}

export const getDateFromTimeStamps = (timeStamps: number) => {
    //console.info("  TS" ,timeStamps)
    //console.info(" date from TS" ,dayjs(timeStamps).format("MM/DD/YYYY HH:mm"));
    return dayjs(timeStamps).format("YYYY-MM-DD HH:mm");
}

export const getNextDateTime = (interval: number, date: string) => {
    console.info(" DATE TO  TS", getTimeStampsFromDate(date))
    let nb: number = interval + getTimeStampsFromDate(date);
    return dayjs(getDateFromTimeStamps(nb)).format("DD/MM/YYYY HH:mm");
}

export const getformatDate = (date: string) => {
    if (date) {
        return dayjs(date).format("DD/MM/YYYY");
    }
    return "";
}

export const randmonColorConsignee = () => {
    let hex = Math.floor(Math.random() * 3);
    let color;
    if (hex == 0)
        color = "#FF7F7B";
    else if (hex == 1)
        color = "#828AF8";
    else
        color = "#FF7BEE";
    return color;
}

