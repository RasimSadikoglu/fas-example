import { FonDto } from '../../auto-api';

export interface FonBuySellModel {
    instructionId?: string;

    operationType: 'BUY' | 'SELL';
    unitOrPrice: string;

    fonCodeItems: string[];
    fonCode?: string;

    toMemberCodeItems: string[];
    toMemberCode?: string;

    currencyItems: string[];
    currency?: string;

    fon?: FonDto;

    count?: number;
    price?: number;
}
