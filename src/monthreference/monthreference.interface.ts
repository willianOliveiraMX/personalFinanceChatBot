import { Timestamp } from "typeorm";

export interface month_reference {
    id?: number,
    year?: string,
    month?: string,
    updateAt?: Timestamp,
    createdat?: Timestamp,
    isvalid?: boolean,
}
