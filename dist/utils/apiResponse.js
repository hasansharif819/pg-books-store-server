"use strict";
// // src/utils/apiResponse.ts
// import { Response as ExpressResponse } from 'express';
// import httpStatus from 'http-status';
// interface IApiResponse<T> {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data?: T;
//   meta?: {
//     page?: number;
//     limit?: number;
//     total?: number;
//     totalPages?: number;
//   };
// }
// export class ApiResponse {
//   static sendResponse<T>(
//     res: ExpressResponse,
//     statusCode: number,
//     message: string,
//     data?: T,
//     meta?: object,
//   ): void {
//     const response: IApiResponse<T> = {
//       success: statusCode < 400,
//       statusCode,
//       message,
//       data,
//       meta,
//     };
//     res.status(statusCode).json(response);
//   }
//   static sendSuccess<T>(res: ExpressResponse, message: string, data?: T, meta?: object): void {
//     this.sendResponse(res, httpStatus.OK, message, data, meta);
//   }
//   static sendCreated<T>(res: ExpressResponse, message: string, data?: T): void {
//     this.sendResponse(res, httpStatus.CREATED, message, data);
//   }
//   static sendNoContent(res: ExpressResponse, message: string): void {
//     this.sendResponse(res, httpStatus.NO_CONTENT, message);
//   }
// }
