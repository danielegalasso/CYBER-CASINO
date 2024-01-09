import { GameType } from "./GameType";

export interface GameInformation {
    sessionToken: string;
    gameType: GameType;
    bet: number;
    betOn: string[];
    additionalInfo: string | null;
}