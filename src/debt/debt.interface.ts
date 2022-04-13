import { Timestamp } from "typeorm";

export interface Debt {
    id?: number,
    userid?: number,
    monthid?: number,
    groupid?: number,
    value?: number,
    description?: string,
    installmentTotal?: number,
    installmentCurrent?: number,
    dateToPay?: string,
    isalreadypay?: boolean,
    updatedat?: Timestamp,
    createdat?: Timestamp,
    isvalid?: boolean,
}