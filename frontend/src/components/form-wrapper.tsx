import React, { ReactNode, useState } from 'react';
import { Form } from 'react-bootstrap';
import { toastDanger } from './dynamic-toast';

type Props = {
    className?: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    children?: ReactNode;
};

const FormWrapper = ({ className, onSubmit, children }: Props) => {
    const [validated, setValidated] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!event.currentTarget.checkValidity()) {
            setValidated(true);
            toastDanger('Please complete the fields marked as red!');
            return;
        }

        await onSubmit(event);
        setValidated(false);
    }

    return (
        <Form
            className={className}
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
        >
            {children}
        </Form>
    );
};

export default FormWrapper;
