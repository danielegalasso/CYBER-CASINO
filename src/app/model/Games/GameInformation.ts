import { GameType } from "./GameType";

export interface GameInformation {
    sessionToken: string;
    gameType: GameType;
    bet: number;
    betOn: Object[];
    additionalInfo: string | null; // servono per le slot, oltre a type.SLOT devo dire se .PremiumSlot o .MinerSlor ecc
}
