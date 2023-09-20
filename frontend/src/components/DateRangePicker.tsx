import BetterDate from '../tools/better-date';

interface Props {
    className?: string;
    label: string;
    startDate: BetterDate;
    endDate: BetterDate;
    onChange: (startDate: BetterDate, endDate: BetterDate) => void;
}

const DateRangePicker = ({
    className,
    label,
    startDate,
    endDate,
    onChange,
}: Props) => {
    const handleChange = (startDate: BetterDate, endDate: BetterDate): void => {
        if (startDate > endDate) endDate = startDate;
        onChange(startDate, endDate);
    };

    return (
        <div className={className}>
            <label className='form-label'>{label}</label>
            <div className='d-flex d-grid gap-3'>
                <input
                    className='form-control'
                    type='date'
                    value={startDate.formatDate()}
                    onChange={e => {
                        console.log({ date: e.target.value });
                        handleChange(
                            BetterDate.fromString(e.target.value),
                            endDate
                        );
                    }}
                />
                <input
                    className='form-control'
                    type='date'
                    value={endDate.formatDate()}
                    min={startDate.formatDate()}
                    onChange={e =>
                        handleChange(
                            startDate,
                            BetterDate.fromString(e.target.value)
                        )
                    }
                />
            </div>
        </div>
    );
};

export default DateRangePicker;
