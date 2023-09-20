import { useEffect, useState } from 'react';
import ReactComponentController from '../tools/react-component-controller';

export default function useMvc<C extends ReactComponentController<M, P>, M, P>(
    creator: () => C
): readonly [C, M, (fn: (model: M) => void) => void] {
    const [controller] = useState(creator);
    const [model, setModel] = useState(controller.initialModel());
    controller.setModelSetter(setModel);

    useEffect(() => {
        controller.initialize();
    }, [controller]);

    return [controller, model, controller.propertySetter] as const;
}
