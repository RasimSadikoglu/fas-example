import { ReactNode, createElement, useEffect, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

export type ToastTypes = 'success' | 'danger' | 'warning';

type Props = {
    eventFnSetter: (
        eventFn: (type: ToastTypes, message: string, delay: number) => void
    ) => void;
};

type ToastProps = {
    type: ToastTypes;
    message: string;
    delay: number;
    show: boolean;
};

const DynamicToast = ({ eventFnSetter }: Props) => {
    const [state, setState] = useState<ToastProps>({
        type: 'success',
        message: '',
        delay: 3000,
        show: false,
    });

    useEffect(
        () =>
            eventFnSetter((type: ToastTypes, message: string, delay: number) =>
                setState({
                    type,
                    message,
                    delay,
                    show: true,
                })
            ),
        [eventFnSetter]
    );

    return (
        <ToastContainer
            className='p-3 pt-5'
            position='top-end'
            style={{ zIndex: 1 }}
        >
            <Toast
                show={state.show}
                delay={state.delay}
                bg={state.type + ' text-light'}
                autohide
                onClose={() => setState(x => ({ ...x, show: false }))}
            >
                <Toast.Body>
                    <h6>{state.message}</h6>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

class ToastController {
    private static instance: ToastController;
    private constructor() {}
    public static getInstance() {
        return (this.instance ??= new ToastController());
    }

    private toastEventFn?: (
        type: ToastTypes,
        message: string,
        delay: number
    ) => void;
    private toastEventFnSetter(
        eventFn: (type: ToastTypes, message: string, delay: number) => void
    ): void {
        this.toastEventFn = eventFn;
    }

    public invokeToast(type: ToastTypes, message: string) {
        if (!this.toastEventFn) {
            throw new Error('toast callback function is not registered!');
        }

        this.toastEventFn(type, message, 3000);
    }

    public createToast(): ReactNode {
        return createElement(DynamicToast, {
            eventFnSetter: x => this.toastEventFnSetter(x),
        });
    }
}

const toastController = ToastController.getInstance();

export const toastSuccess = (message: string) =>
    toastController.invokeToast('success', message);

export const toastWarning = (message: string) =>
    toastController.invokeToast('warning', message);

export const toastDanger = (message: string) =>
    toastController.invokeToast('danger', message);

export const createToast = () => toastController.createToast();
