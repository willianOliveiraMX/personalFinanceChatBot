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

export interface IncomeFormated {
    description?: string,
    value?: string,
    userId?: number,
    monthId?: number,
    updatedAt?: Timestamp,
    isValid?: boolean,
}
