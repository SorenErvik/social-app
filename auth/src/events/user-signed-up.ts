import { UserDocument } from "../models";
import { BaseAuthEvent } from "./base-auth-event";


export type UserSignedUpRestPayload = {
    id: string,
    email: string
}

export default class UserSignedUp extends BaseAuthEvent<UserSignedUpRestPayload> {
    private user: UserDocument;

    protected statusCode = 201;
    
    constructor(user: UserDocument) {
        super();
        this.user = user;
    }

    getStatusCode() {
        return this.statusCode;
    
    }

    serializeRest(): UserSignedUpRestPayload {
        return {
            id: this.user._id,
            email: this.user.email
        };
    }
}