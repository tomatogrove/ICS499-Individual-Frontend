import { Chess } from "./chess";
import { Session } from "./session";

export class UserAccount {
    public userAccountID: number;
    public username: string;
    public email: string;
    public password: string;
    public session: Session;
    public chessList: Chess[];
}