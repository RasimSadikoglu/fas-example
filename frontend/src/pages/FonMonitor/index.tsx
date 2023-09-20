import Combobox from '../../components/Combobox';
import Radio from '../../components/Radio';
import { FonMonitorController, FonMonitorProps } from './fonMonitorController';
import DateRangePicker from '../../components/DateRangePicker';
import { Modal } from 'react-bootstrap';
import FonBuySell from '../FonBuySell';
import BetterDate from '../../tools/better-date';
import useMvc from '../../hooks/useMvc';
import { FonMonitorModel } from './fonMonitorModel';
import Textbox from '../../components/Textbox';
import FormWrapper from '../../components/form-wrapper';
import useAuth from '../../hooks/useAuth';

const formatNumber = (number: number) =>
    number.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });

const operationTypeRadioItems = [
    { value: 'BUY', label: 'Buy' },
    { value: 'SELL', label: 'Sell' },
    { value: 'ALL', label: 'All' },
];

const FonMonitor = () => {
    const authController = useAuth();
    const [controller, model, setProperty] = useMvc<
        FonMonitorController,
        FonMonitorModel,
        FonMonitorProps
    >(() => new FonMonitorController({}));

    return (
        <div className='container mt-5'>
            <div id='options'>
                <h3>Instruction Monitoring</h3>
                <FormWrapper
                    className='row g-3 pt-3'
                    onSubmit={() => controller.handleSubmit()}
                >
                    <Combobox<string>
                        className='col-2'
                        clearable
                        items={model.fonCodeItems}
                        itemLabel={item => item}
                        label='Fund Code'
                        onChange={x => setProperty(y => (y.fonCode = x))}
                        selectedItem={model.fonCode}
                    ></Combobox>
                    <DateRangePicker
                        className='offset-4 col-6'
                        label='Instruction Date'
                        startDate={model.instructionStartDate}
                        endDate={model.instructionEndDate}
                        onChange={(s, e) => {
                            setProperty(y => {
                                y.instructionStartDate = s;
                                y.instructionEndDate = e;
                            });
                        }}
                    ></DateRangePicker>
                    <Combobox<string>
                        className='col-2'
                        clearable
                        items={model.toMemberCodeItems}
                        itemLabel={item => item}
                        label='To Member Code'
                        onChange={x => setProperty(y => (y.toMemberCode = x))}
                        selectedItem={model.toMemberCode}
                    ></Combobox>
                    <DateRangePicker
                        className='offset-4 col-6'
                        label='Valor Date'
                        startDate={model.valorStartDate}
                        endDate={model.valorEndDate}
                        onChange={(s, e) => {
                            setProperty(y => {
                                y.valorStartDate = s;
                                y.valorEndDate = e;
                            });
                        }}
                    ></DateRangePicker>
                    <Textbox
                        className='col-3'
                        label='Instruction Id'
                        value={model.instructionId}
                        onChange={x => setProperty(y => (y.instructionId = x))}
                        clearable
                    ></Textbox>
                    <Combobox<string>
                        className='col-2'
                        clearable
                        items={model.currencyItems}
                        itemLabel={item => item}
                        label='Currency'
                        onChange={x => setProperty(y => (y.currency = x))}
                        selectedItem={model.currency}
                    ></Combobox>
                    <Radio
                        className='offset-1 col-4 align-self-end'
                        items={operationTypeRadioItems}
                        name='buySellType'
                        value={model.operationType}
                        onChange={x =>
                            setProperty(
                                y =>
                                    (y.operationType = x as
                                        | 'BUY'
                                        | 'SELL'
                                        | 'ALL')
                            )
                        }
                    ></Radio>
                    <div className='col-12 d-flex justify-content-end'>
                        <button type='submit' className='btn btn-primary'>
                            List
                        </button>
                        <button
                            type='button'
                            className='btn btn-outline-primary ms-2'
                            onClick={() => window.print()}
                        >
                            <i className='fa-solid fa-print'></i>
                        </button>
                    </div>
                </FormWrapper>
            </div>
            <hr />
            <div id='table' className='print-area'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Instruction Id</th>
                            <th>Operation Type</th>
                            <th>Instruction Date</th>
                            <th>Valor Date</th>
                            <th>Count</th>
                            <th>Price</th>
                            <th>Fund Code</th>
                            <th>Currency</th>
                            <th>To Member Code</th>
                            <th className='no-print-area'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {model.instructions.map((value, index) => (
                            <tr key={value.instructionId}>
                                <th>{index + 1}</th>
                                <td>{value.instructionId}</td>
                                <td>{value.operationType}</td>
                                <td>
                                    {BetterDate.fromString(
                                        value.instructionDate!
                                    ).formatDate()}
                                </td>
                                <td>
                                    {BetterDate.fromString(
                                        value.valorDate!
                                    ).formatDate()}
                                </td>
                                <td>{formatNumber(value.count!)}</td>
                                <td>{formatNumber(value.price!)}</td>
                                <td>{value.fonCode}</td>
                                <td>{value.currency}</td>
                                <td>{value.toMemberCode}</td>
                                <td className='no-print-area'>
                                    <div className='d-flex d-grid gap-2'>
                                        <button
                                            className='btn btn-danger'
                                            type='button'
                                            onClick={() =>
                                                controller.handleDelete(
                                                    value.instructionId!
                                                )
                                            }
                                            disabled={
                                                !authController.isUserHasAuthority(
                                                    'FON_EDIT'
                                                )
                                            }
                                        >
                                            <i className='fa-solid fa-trash'></i>
                                        </button>
                                        <button
                                            className='btn btn-info'
                                            onClick={() =>
                                                setProperty(
                                                    x =>
                                                        (x.selectedInstruction =
                                                            value.instructionId)
                                                )
                                            }
                                            disabled={
                                                !authController.isUserHasAuthority(
                                                    'FON_EDIT'
                                                )
                                            }
                                        >
                                            <i className='fa-solid fa-pen-to-square text-light'></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal size='xl' show={!!model.selectedInstruction}>
                <Modal.Header className='d-flex justify-content-end'>
                    <button
                        type='button'
                        className='btn'
                        onClick={() =>
                            setProperty(
                                x => (x.selectedInstruction = undefined)
                            )
                        }
                    >
                        <span aria-hidden='true'>&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <FonBuySell
                        instructionId={model.selectedInstruction}
                        onClose={() => controller.handleClose()}
                    ></FonBuySell>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default FonMonitor;
