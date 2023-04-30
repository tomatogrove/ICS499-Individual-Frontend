import { Board } from "./board";
import { UserAccount } from "./user-account";

export class Chess {
	public chessID: number;
	public status: string;
	public currentTurn: string;
	public whitePlayer: UserAccount;
	public blackPlayer: UserAccount;
	public winner: UserAccount;
	public blackPlayerID: number;
	public whitePlayerID: number;
	public winnerID: number;
	public board: Board;
	public startedDate: Date;
	public lastPlayed: Date;
}