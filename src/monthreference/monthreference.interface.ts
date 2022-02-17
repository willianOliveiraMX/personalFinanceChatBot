import { Timestamp } from "typeorm";

export interface monthreference {
    id?: number,
    year?: string,
    month?: string,
    updateAt?: Timestamp,
    createdAt?: Timestamp,
    isValid?: boolean,
}
