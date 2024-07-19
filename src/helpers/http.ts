import { Response } from "express";

export enum HttpStatus {
    OK = 200,
    NOT_FOUND = 404,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    SERVER_ERROR = 500,
    BAD_REQUEST = 400 
}


export class HttpResponse extends Error{
    OK(data?: any) {
        return {
            status: HttpStatus.OK,
            statusMessage: "Success",
            data
        };
    } 

    NotFound(data?: any) {
        return {
            status: HttpStatus.NOT_FOUND,
            statusMessage: "Not found",
            error: data
        };
    } 

    Unauthorized(data?: any) {
        return {
            status: HttpStatus.UNAUTHORIZED,
            statusMessage: "Unauthorized",
            error: data
        };
    } 
    
    Forbidden(data?: any) {
        return {
            status: HttpStatus.FORBIDDEN,
            statusMessage: "Forbidden",
            error: data
        };
    } 

    ServerError(data?: any) {
        return {
            status: HttpStatus.SERVER_ERROR,
            statusMessage: "Internal server error",
            error: data
        };
    }

    BadRequest(data: any, name:string) {
        return {
            status: HttpStatus.BAD_REQUEST,
            statusMessage: "Bad request",
            error: data,
            ErrorName: name
        };
    }
}