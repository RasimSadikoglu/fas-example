interface RadioItem {
    value: string;
    label: string;
}

interface Props {
    className?: string;
    disabled?: boolean;
    items: RadioItem[];
    name: string;
    value: string;
    onChange: (val: string) => void;
}

const Radio = ({
    className,
    disabled,
    items,
    name,
    value,
    onChange,
}: Props) => {
    return (
        <div className={className}>
            {items.map(x => (
                <div className='form-check form-check-inline' key={x.value}>
                    <input
                        className='form-check-input'
                        type='radio'
                        name={name}
                        value={x.value}
                        checked={x.value === value}
                        onChange={e => onChange(e.target.value)}
                        disabled={disabled}
                    />
                    <label htmlFor='form-check-label'>{x.label}</label>
                </div>
            ))}
        </div>
    );
};

export default Radio;
