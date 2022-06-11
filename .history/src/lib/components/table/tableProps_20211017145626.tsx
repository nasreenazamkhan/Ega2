
export interface TableDataDfnProps {
    name: string,
    type?: any,
    sort?: boolean,
    id?: number,
    sortActive?: boolean,
    sortDir?: string
}

export interface TableButtonActions {
    item: number,
    tip?: string,
    color?: string,
    icon?: string,
    icon1?: string,
}

export interface TableProps {
    tableKeys: TableDataDfnProps[],
    tableData?: any[],
    actions?: TableButtonActions[],
    handleClick?(row: any, index: any, action: any, ele?: any): void;
    remote?: boolean,
    remoteUrl?: string,
    refresh?: number,
    chkbox?: boolean,
    collapseChkBox?:boolean
    dataRootKey?:string,
    collapsableTableKeys?:[],
    collapseTableList?:string,
    keyTest?:string,
    countData?:any, 
    tabSelected?: string,
    page?: string,
    onFilterSelected?:any
    selectedData?:any
    groupBy?: string
    userType?:string
    screen?:string
    showLinks?:boolean,
    updateChild?: number,

}





