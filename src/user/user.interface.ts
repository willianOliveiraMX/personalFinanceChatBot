/* eslint-disable prettier/prettier */
import { Timestamp } from 'typeorm';
export interface UserInterface {
  id?: number,
  emil?: string,
  token?: string,
  updatedAt?: Timestamp,
  createdAt?: Timestamp,
  isValid?: boolean,
};