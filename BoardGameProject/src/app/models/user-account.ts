import { Session } from "./session";

export class UserAccount {
    public userID: number;
    public username: string;
    public email: string;
    public password: string;
    public guest: boolean;
    public session: Session;
}