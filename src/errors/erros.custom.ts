import { StatusCodes } from 'http-status-codes';

class CustomAPIError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

class BadRequest extends CustomAPIError {
    constructor(message: string) {
        super(message, StatusCodes.BAD_REQUEST);
    }
}

class NotFound extends CustomAPIError {
    constructor(message: string) {
        super(message, StatusCodes.NOT_FOUND);
    }
}

class UnAuthorized extends CustomAPIError {
    constructor(message: string) {
        super(message, StatusCodes.UNAUTHORIZED);
    }
}

//Error Instantiators if needed ================================
const createCustom = (message: string, status: number) => {
    return new CustomAPIError(message, status);
};

const errorResponses = {
    CustomAPIError,
    BadRequest,
    NotFound,
    UnAuthorized,
    //
    createCustom,

}

export default errorResponses;
