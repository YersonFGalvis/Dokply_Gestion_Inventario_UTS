export declare enum HttpStatus {
    OK = 200,
    NOT_FOUND = 404,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    SERVER_ERROR = 500,
    BAD_REQUEST = 400
}
export declare class HttpResponse extends Error {
    OK(data?: any): {
        status: HttpStatus;
        statusMessage: string;
        data: any;
    };
    NotFound(data?: any): {
        status: HttpStatus;
        statusMessage: string;
        error: any;
    };
    Unauthorized(data?: any): {
        status: HttpStatus;
        statusMessage: string;
        error: any;
    };
    Forbidden(data?: any): {
        status: HttpStatus;
        statusMessage: string;
        error: any;
    };
    ServerError(data?: any): {
        status: HttpStatus;
        statusMessage: string;
        error: any;
    };
    BadRequest(data: any, name: string): {
        status: HttpStatus;
        statusMessage: string;
        error: any;
        ErrorName: string;
    };
}
