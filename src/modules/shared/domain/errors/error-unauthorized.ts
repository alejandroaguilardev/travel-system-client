import { ErrorDomain } from './error-domain';

export class ErrorUnauthorized extends ErrorDomain {
    constructor(readonly message: string = '') {
        super(message, 401, ErrorDomain.error.UNAUTHORIZED);
    }
}
