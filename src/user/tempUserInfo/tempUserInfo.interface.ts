/* eslint-disable prettier/prettier */
import { Timestamp } from 'typeorm';

interface UserTemp {
  token_chatid?: string,
}

export interface TempUserInterface {
  id?: number,
  usertempdata?: UserTemp,
  updatedat?: Timestamp,
  createdat?: Timestamp,
};