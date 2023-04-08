import { UserAccount } from "./user-account";

export class Session {
    public sessionID: number;
    public sessionKey: string;
    public userAccount: UserAccount;
}