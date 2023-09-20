import Radio from '../../components/Radio';
import Combobox from '../../components/Combobox';
import { FonBuySellController } from './fonBuySellController';
import { FonBuySellProps } from './FonBuySellProps';
import useMvc from '../../hooks/useMvc';
import { FonBuySellModel } from './fonBuySellModel';
import Textbox from '../../components/Textbox';
import FormWrapper from '../../components/form-wrapper';

const operationTypeRadioItems = [
    { value: 'BUY', label: 'Buy' },
    { value: 'SELL', label: 'Sell' },
];

const unitOrPriceRadioItems = [
    { value: 'unit', label: 'By count' },
    { value: 'price', label: 'By price' },
];

const FonBuySell = (props: FonBuySellProps) => {
    const [controller, model, setProperty] = useMvc<
        FonBuySellController,
        FonBuySellModel,
        FonBuySellProps
    >(() => new FonBuySellController(props));

    return (
        <div className='container mt-5'>
            <h3>Fund Buy/Sell</h3>
            <FormWrapper
                className='row g-3'
                onSubmit={() => controller.handleSubmit()}
            >
                <Radio
                    className='col-12 pt-3'
                    items={operationTypeRadioItems}
                    name='buySellRadio'
                    value={model.operationType}
                    onChange={x =>
                        setProperty(
                            y => (y.operationType = x as 'BUY' | 'SELL')
                        )
                    }
                    disabled={!!model.instructionId}
                ></Radio>
                <Combobox<string>
                    className='col-2'
                    label='Fund Code'
                    items={model.fonCodeItems}
                    itemLabel={item => item}
                    onChange={x => controller.setFonCode(x)}
                    selectedItem={model.fonCode}
                    required
                    disabled={!!model.instructionId}
                ></Combobox>
                <Textbox
                    className='offset-1 col-9'
                    label='Fund Explanation'
                    value={model.fonCode ?? ''}
                    disabled
                ></Textbox>
                <Combobox<string>
                    className='col-2'
                    items={model.toMemberCodeItems}
                    itemLabel={item => item}
                    label='To Member Code'
                    onChange={x => controller.setToMemberCode(x)}
                    selectedItem={model.toMemberCode}
                    required
                    disabled={!!model.instructionId}
                ></Combobox>
                <Textbox
                    className='offset-1 col-9'
                    label='To Member Explanation'
                    value={model.toMemberCode ?? ''}
                    disabled
                ></Textbox>
                <Combobox<string>
                    className='col-2'
                    items={model.currencyItems}
                    itemLabel={item => item}
                    label='Currency'
                    onChange={x => controller.setCurrency(x)}
                    selectedItem={model.currency}
                    required
                    disabled={!!model.instructionId}
                ></Combobox>
                <Radio
                    className='col-12 pt-3'
                    items={unitOrPriceRadioItems}
                    name='unitOrPrice'
                    value={model.unitOrPrice}
                    onChange={x => setProperty(y => (y.unitOrPrice = x))}
                ></Radio>
                <Textbox
                    className='col-3'
                    label='Price'
                    disabled={!model.currency || model.unitOrPrice === 'unit'}
                    onChange={x => controller.setPrice(+x)}
                    value={model.price || ''}
                    mask={/\d*(\.\d*)?/}
                    validate={x => controller.priceValidation(+x)}
                    required
                ></Textbox>
                <Textbox
                    className='col-9'
                    label='Valör Tarihi'
                    value={controller.valorDate}
                    disabled
                ></Textbox>
                <Textbox
                    className='col-3'
                    label='Count'
                    disabled={!model.currency || model.unitOrPrice === 'price'}
                    onChange={x => controller.setCount(+x)}
                    value={model.count || ''}
                    mask={/\d*(\.\d*)?/}
                    validate={x => controller.countValidation(+x)}
                    required
                ></Textbox>
                <Textbox
                    className='col-9'
                    label='Total Existing Fund Count'
                    value={model.fon?.count ?? ''}
                    disabled
                ></Textbox>
                <Textbox
                    className='col-3'
                    label='Total Price'
                    value={model.price || ''}
                    disabled
                ></Textbox>
                <Textbox
                    className='col-9'
                    label='Fund Unit Price'
                    value={model.fon?.price ?? ''}
                    disabled
                ></Textbox>
                <div className='col-12 d-flex d-grid gap-3 justify-content-end pt-3'>
                    <button type='submit' className='btn btn-primary'>
                        {!model.instructionId ? 'Instruct' : 'Update'}
                    </button>
                </div>
            </FormWrapper>
        </div>
    );
};

export default FonBuySell;
