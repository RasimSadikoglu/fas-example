import {
    FonControllerService,
    FonInstructionControllerService,
} from '../../auto-api';
import { toastSuccess, toastWarning } from '../../components/dynamic-toast';
import BetterDate from '../../tools/better-date';
import ReactComponentController from '../../tools/react-component-controller';
import { FonMonitorModel } from './fonMonitorModel';

export interface FonMonitorProps {}

export class FonMonitorController extends ReactComponentController<
    FonMonitorModel,
    FonMonitorProps
> {
    constructor(props: FonMonitorProps) {
        super(props);
    }

    public initialModel(): FonMonitorModel {
        return {
            fonCodeItems: [],
            toMemberCodeItems: [],
            currencyItems: ['TRY', 'USD', 'EUR'],

            instructionStartDate: BetterDate.current().addDays(-15),
            instructionEndDate: BetterDate.current().addDays(15),

            valorStartDate: BetterDate.current().addDays(-15),
            valorEndDate: BetterDate.current().addDays(15),

            operationType: 'ALL',

            instructions: [],
        };
    }

    async initialize(): Promise<void> {
        this.model.fonCodeItems =
            await FonControllerService.getAvailableFonCodes();
        this.model.toMemberCodeItems =
            await FonControllerService.getAllToMemberCodes();

        this.update();
    }

    private async listInstructions(): Promise<void> {
        this.model.instructions =
            await FonInstructionControllerService.getInstructionList({
                instructionId: this.model.instructionId,
                fonCode: this.model.fonCode,
                toMemberCode: this.model.toMemberCode,
                currency: this.model.currency,
                operationType:
                    this.model.operationType === 'ALL'
                        ? undefined
                        : this.model.operationType,
                instructionStartDate:
                    this.model.instructionStartDate.formatDate(),
                instructionEndDate: this.model.instructionEndDate.formatDate(),
                valorStartDate: this.model.valorStartDate.formatDate(),
                valorEndDate: this.model.valorEndDate.formatDate(),
            });
    }

    async handleSubmit(): Promise<void> {
        await this.listInstructions();

        if (!this.model.instructions.length) {
            toastWarning('No relevant fund instruction found');
        }

        this.update();
    }

    async handleDelete(instructionId: string): Promise<void> {
        await FonInstructionControllerService.deleteInstruction(instructionId);
        await this.listInstructions();
        toastSuccess('Instruction is deleted successfully');
        this.update();
    }

    async handleClose(): Promise<void> {
        this.model.selectedInstruction = undefined;
        this.update();

        await this.listInstructions();
        this.update();
    }
}
