/* eslint-disable prettier/prettier */
import { Timestamp } from 'typeorm';
export interface UserInterface {
  id?: number,
  email?: string,
  token?: string,
  updatedat?: Timestamp,
  createdat?: Timestamp,
  isvalid?: boolean,
};