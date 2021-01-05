export interface IUser {
    id: string;
    email: string;
}

export class User implements IUser {
    constructor(data?: IUser) {
        this.id = data?.id;
        this.email = data?.email;
    }

    public id: string;
    public email: string;
}
