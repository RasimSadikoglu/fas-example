import { FonInstructionDto } from '../../auto-api';
import BetterDate from '../../tools/better-date';

export interface FonMonitorModel {
    fonCodeItems: string[];
    fonCode?: string;

    toMemberCodeItems: string[];
    toMemberCode?: string;

    currencyItems: string[];
    currency?: string;

    instructionStartDate: BetterDate;
    instructionEndDate: BetterDate;

    valorStartDate: BetterDate;
    valorEndDate: BetterDate;

    instructionId?: string;

    operationType: 'BUY' | 'SELL' | 'ALL';

    instructions: FonInstructionDto[];

    selectedInstruction?: string;
}
