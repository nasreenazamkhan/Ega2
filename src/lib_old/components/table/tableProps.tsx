
export interface TableDataDfnProps {
    name: string,
    type?: string,
    sort?: boolean,
    id?: number,
    sortActive?: boolean,
    sortDir?: string
}

export interface TableButtonActions {
    item: number,
    tip?: string,
    color?: string,
    icon?: string
}

export interface TableProps {
    tableKeys: TableDataDfnProps[],
    tableData: any[],
    actions?: TableButtonActions[],
    handleClick?(row: any, index: any, action: any, ele?: any): void;
    remote?: boolean,
    remoteUrl?: string,
    refresh?: number,
    chkbox?: boolean,
    dataRootKey?:string,
    collapsableTableKeys?:TableDataDfnProps[],
    collapseTableList?:string,
    keyTest:string;
}





