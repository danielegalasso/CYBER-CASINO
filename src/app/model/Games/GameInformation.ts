import { GameType } from "./GameType";

export interface GameInformation {
    sessionToken: string;
    gameType: GameType;
    bet: number;
    additionalInfo: string | null;
}