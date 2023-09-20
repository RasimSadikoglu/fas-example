import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes';

const GuaranteeReport = () => {
    const navigate = useNavigate();

    return (
        <div className='p-3'>
            <div id='header' className='d-flex gap-3 border p-3 rounded-1'>
                <h3>Guarantee Status Report</h3>
                <button className='btn btn-outline-primary ms-auto'>
                    Report
                </button>
                <button
                    className='btn btn-outline-primary'
                    onClick={() => navigate(routes.HOME)}
                >
                    Exit
                </button>
            </div>
            <div className='border mt-3 p-3 rounded-1'>
                <div className='row'>
                    <div className='col-2'>
                        <label>Member Code / Account Id</label>
                        <div className='d-flex'>
                            <input className='form-control' type='text' />
                            <button className='btn btn-secondary' disabled>
                                /
                            </button>
                            <input className='form-control' type='text' />
                            <button className='btn btn-primary'>
                                <i className='fa-solid fa-magnifying-glass fa-2xs'></i>
                            </button>
                        </div>
                    </div>
                    <div className='col-2'>
                        <label>Esteem Information</label>
                        <div className='d-flex'>
                            <select className='form-select' />
                            <input className='form-control' type='text' />
                            <button className='btn btn-primary'>
                                <i className='fa-solid fa-magnifying-glass fa-2xs'></i>
                            </button>
                        </div>
                    </div>
                    <div className='col-2'>
                        <label>Portfolio / Customer</label>
                        <div className='d-flex'>
                            <select className='form-select' />
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-2'>
                        <label>Title</label>
                        <div className='d-flex'>
                            <input
                                className='form-control'
                                type='text'
                                disabled
                            />
                        </div>
                    </div>
                    <div className='col-2'>
                        <label>Operation</label>
                        <div className='d-flex'>
                            <select className='form-select' />
                        </div>
                    </div>
                    <div className='col-2'>
                        <label>Date Interval</label>
                        <div className='d-flex'>
                            <input className='form-control' type='date' />
                            <div className='ms-2 me-2 align-self-center'>-</div>
                            <input className='form-control' type='date' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuaranteeReport;
