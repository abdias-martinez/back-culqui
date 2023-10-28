enum STATUS_CODE {
    SUCCESS = 201,
    SERVER_ERROR = 500,
    FOUND_ERROR = 404,
    BAD_REQUEST = 400
  }
  
  class Result {
    private statusCode: number;
    private message: string;
    private data?: any;
  
    constructor(statusCode: number, message: string, data?: any) {
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
    }
  
    bodyToString () {
      return {
        statusCode: this.statusCode,
        body: JSON.stringify({
          message: this.message,
          data: this.data,
        }),
      };
    }
  }
  
  export class MessageUtil {


    static successfulResponse ( message: string, data: any) {
        const result = new Result(STATUS_CODE.SUCCESS, message, data);
        return result.bodyToString();
    };

    static internalServerErrorResponse ( message: string) {
        const result = new Result(STATUS_CODE.SERVER_ERROR, message);
        return result.bodyToString();
    };

    static notFoundErrorResponse ( message: string) {
        const result = new Result(STATUS_CODE.FOUND_ERROR, message);
        return result.bodyToString();
    };

    static badRequestResponse ( message: string, data?: any) {
        const result = new Result(STATUS_CODE.BAD_REQUEST, message, data);
        return result.bodyToString();
    };
  }