import { Timestamp } from "typeorm";

export interface Debt_group {
    id?: number,
    description?: string,
    updatedat?: Timestamp,
    createdat?: Timestamp,
    isvalid?: boolean,
}