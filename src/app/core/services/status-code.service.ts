// status-code.service.ts
import { Injectable } from '@angular/core';

export enum StatusCodes {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  S_CONTRACTS_OPEN = 5
}

@Injectable({
  providedIn: 'root',
})
export class StatusCodeService {
  constructor() {}
}
