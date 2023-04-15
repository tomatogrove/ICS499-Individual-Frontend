import { Board } from "./board";
import { UserAccount } from "./user-account";

export class Chess {
	public chessID: number;
	public status: string;
	public whitePlayer: UserAccount;
	public blackPlayer: UserAccount;
	public board: Board;
}