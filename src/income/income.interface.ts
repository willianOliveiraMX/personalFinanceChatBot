import { Timestamp } from "typeorm";

export interface Income {
    id?: number,
    userId?: number,
    description?: string,
    value?: number,
    monthId?: number,
    updatedAt?: Timestamp,
    createdAt?: Timestamp,
    isValid?: boolean,
}
