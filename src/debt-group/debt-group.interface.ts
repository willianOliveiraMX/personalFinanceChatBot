import { Timestamp } from "typeorm";

export interface DebtGroup {
    id?: number,
    description?: string,
    updatedAt?: Timestamp,
    createdAt?: Timestamp,
    isValid?: boolean,
}