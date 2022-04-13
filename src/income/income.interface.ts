import { Timestamp } from "typeorm";

export interface Income {
    id?: number,
    userid?: number,
    description?: string,
    value?: number,
    monthid?: number,
    updatedat?: Timestamp,
    createdat?: Timestamp,
    isvalid?: boolean,
}

export interface IncomeFormated {
    description?: string,
    value?: string,
    userid?: number,
    monthid?: number,
    updatedat?: Timestamp,
    isvalid?: boolean,
}
