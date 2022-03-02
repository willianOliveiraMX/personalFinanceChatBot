import { Timestamp } from "typeorm";

export interface Debt {
    id?: number,
    userId?: number,
    monthId?: number,
    groupId?: number,
    value?: number,
    description?: string,
    installmentTotal?: number,
    installmentCurrent?: number,
    dateToPay?: string,
    isalreadypay?: boolean,
    updatedAt?: Timestamp,
    createdAt?: Timestamp,
    isValid?: boolean,
}