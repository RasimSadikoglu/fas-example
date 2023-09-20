import { FonBuySellModel } from './fonBuySellModel';
import ReactComponentController from '../../tools/react-component-controller';
import { FonBuySellProps } from './FonBuySellProps';
import { toastSuccess } from '../../components/dynamic-toast';
import {
    FonControllerService,
    FonInstructionControllerService,
    FonInstructionDto,
} from '../../auto-api';

export class FonBuySellController extends ReactComponentController<
    FonBuySellModel,
    FonBuySellProps
> {
    private instruction?: FonInstructionDto;

    public constructor(props: FonBuySellProps) {
        super(props);
    }

    public initialModel(): FonBuySellModel {
        return {
            operationType: 'BUY',
            unitOrPrice: 'unit',

            fonCodeItems: [],

            toMemberCodeItems: [],

            currencyItems: [],
        };
    }

    async initialize(): Promise<void> {
        this.model.instructionId = this.props.instructionId;

        if (this.model.instructionId) {
            const instruction = (
                await FonInstructionControllerService.getInstructionList({
                    instructionId: this.model.instructionId,
                })
            )[0];

            if (!instruction) throw new Error('Fon instruction is not found!');

            this.model.fonCode = instruction.fonCode;
            this.model.fonCodeItems = [instruction.fonCode!];
            this.model.toMemberCode = instruction.toMemberCode;
            this.model.toMemberCodeItems = [instruction.toMemberCode!];
            this.model.currency = instruction.currency;
            this.model.currencyItems = [instruction.currency!];
            this.model.operationType = instruction.operationType!;
            this.model.price = instruction.price;
            this.model.count = instruction.count;
            this.model.fon = await FonControllerService.getFon(
                this.model.fonCode!,
                this.model.toMemberCode!,
                this.model.currency!
            );

            this.instruction = instruction;
        } else {
            const fonCodeItems =
                await FonControllerService.getAvailableFonCodes();
            this.model.fonCodeItems = fonCodeItems;
        }

        this.update();
    }

    async setFonCode(fonCode?: string): Promise<void> {
        this.model.fonCode = fonCode;
        this.model.toMemberCode = undefined;
        this.model.currency = undefined;
        this.model.fon = undefined;
        this.model.count = undefined;
        this.model.price = undefined;
        this.update();

        this.model.toMemberCodeItems = this.model.fonCode
            ? await FonControllerService.getAvailableToMemberCodes(
                  this.model.fonCode
              )
            : [];
        this.update();
    }

    async setToMemberCode(toMemberCode?: string): Promise<void> {
        this.model.toMemberCode = toMemberCode;
        this.model.currency = undefined;
        this.model.fon = undefined;
        this.model.count = undefined;
        this.model.price = undefined;
        this.update();

        this.model.currencyItems = this.model.toMemberCode
            ? await FonControllerService.getAvailableCurrencies(
                  this.model.fonCode!,
                  this.model.toMemberCode
              )
            : [];
        this.update();
    }

    async setCurrency(currency?: string): Promise<void> {
        this.model.currency = currency;
        this.update();

        this.model.fon = undefined;
        this.model.count = undefined;
        this.model.price = undefined;
        if (this.model.currency) {
            this.model.fon = await FonControllerService.getFon(
                this.model.fonCode!,
                this.model.toMemberCode!,
                this.model.currency!
            );
        }

        this.update();
    }

    private get maxPrice(): number {
        return this.model.fon!.count! * this.model.fon!.price!;
    }

    public priceValidation(price: number): boolean {
        return this.model.operationType === 'BUY'
            ? price <= this.maxPrice
            : price <= 1_000_000_000_000;
    }

    setPrice(price: number): void {
        this.model.count = price / this.model.fon!.price!;
        this.model.price = price;
        this.update();
    }

    public countValidation(count: number): boolean {
        return this.model.operationType === 'BUY'
            ? count <= this.model.fon!.count!
            : count * this.model.fon!.price! <= 1_000_000_000_000;
    }

    setCount(count: number): void {
        this.model.count = count;
        this.model.price = count * this.model.fon!.price!;
        this.update();
    }

    async handleSubmit(): Promise<void> {
        if (this.model.instructionId) {
            this.handleUpdate();
            return;
        }

        await FonInstructionControllerService.createFonInstruction({
            fonId: this.model.fon!.id,
            operationType: this.model.operationType,
            count: this.model.count!,
        });

        toastSuccess('Fon instruction is taken succesfully');

        this._model = Object.assign(this.initialModel(), {
            initialize: false,
            fonCodeItems: this.model.fonCodeItems,
        });

        this.update();
    }

    get valorDate(): string {
        if (!this.model.fon) return '';

        const valorDate = new Date();
        valorDate.setDate(
            valorDate.getDate() + this.model.fon.valorSuspension!
        );

        return valorDate.toLocaleDateString('tr-TR');
    }

    async handleUpdate(): Promise<void> {
        if (!this.model.price || !this.model.count) return;

        await FonInstructionControllerService.updateFonInstruction({
            instructionId: this.instruction!.instructionId,
            count: this.model.count!,
            price: this.model.price!,
        });

        this.props.onClose!();
    }
}
