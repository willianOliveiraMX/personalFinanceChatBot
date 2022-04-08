/* eslint-disable prettier/prettier */
import { Timestamp } from 'typeorm';

interface UserTemp {
  tokenChatId?: string,
}

export interface TempUserInterface {
  id?: number,
  userTempData?: UserTemp,
  updatedAt?: Timestamp,
  createdAt?: Timestamp,
};