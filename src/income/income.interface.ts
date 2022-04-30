import { Timestamp } from "typeorm";

export interface Income {
    id?: number,
    token_chatid?: string,
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
    token?: string,
    monthid?: number,
    updatedat?: Timestamp,
    isvalid?: boolean,
}
