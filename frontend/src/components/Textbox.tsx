type Props = {
    className?: string;
    label: string;
    value?: string | number;
    onChange?: (val: string) => void;
    disabled?: boolean;
    clearable?: boolean;
    mask?: RegExp;
    validate?: (val: string) => boolean;
    required?: boolean;
};

const Textbox = ({
    className,
    label,
    value,
    onChange = () => {},
    disabled,
    clearable,
    mask,
    validate = () => true,
    required,
}: Props) => {
    function handleChange(val: string) {
        if (mask && !mask.test(val)) return;
        if (!validate(val)) return;
        onChange(val);
    }

    return (
        <div className={'position-relative ' + className}>
            <label className='form-label'>{label}</label>
            <input
                className='form-control'
                value={value ?? ''}
                onChange={e => handleChange(e.target.value)}
                disabled={disabled}
                required={required}
            />
            <div
                className='position-absolute'
                style={{ right: 0, bottom: 0, marginRight: 5 }}
                hidden={!clearable || disabled || !value}
            >
                <button
                    type='button'
                    className='btn'
                    onClick={() => onChange('')}
                >
                    <i className='fa fa-times'></i>
                </button>
            </div>
        </div>
    );
};

export default Textbox;
