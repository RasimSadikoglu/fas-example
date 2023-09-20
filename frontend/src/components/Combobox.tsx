interface Props<T> {
    className?: string;
    clearable?: boolean;
    disabled?: boolean;
    items: T[];
    itemLabel: (item: T) => string;
    label?: string;
    onChange: (item?: T) => void;
    required?: boolean;
    selectedItem?: T;
}

const Combobox = <T,>({
    className,
    clearable,
    disabled,
    items,
    itemLabel,
    label,
    onChange,
    required,
    selectedItem,
}: Props<T>) => {
    return (
        <div className={'position-relative ' + className}>
            <label hidden={!label} className='form-label'>
                {label}
            </label>
            <select
                className='form-select'
                value={selectedItem ? items.indexOf(selectedItem) : ''}
                onChange={e => onChange(items[+e.target.value])}
                required={required}
                disabled={disabled}
            >
                <option value='' disabled></option>
                {items.map((value, index) => (
                    <option key={index} value={index}>
                        {itemLabel(value)}
                    </option>
                ))}
            </select>
            <div
                hidden={!clearable || !selectedItem}
                className='position-absolute'
                style={{ right: 0, bottom: 0, marginRight: 30 }}
            >
                <button
                    className='btn'
                    type='button'
                    onClick={() => onChange(undefined)}
                >
                    <i className='fa fa-times'></i>
                </button>
            </div>
        </div>
    );
};

export default Combobox;
