import { useRef } from 'react';

export default function useInvoke<
    Args extends unknown[] = unknown[],
    Return = unknown
>(fn: (...args: Args) => Return) {
    const invokeRef = useRef(fn);

    const setInvokeRef = (fn: (...args: Args) => Return) =>
        (invokeRef.current = fn);

    return [
        (...args: Args) => invokeRef.current(...args),
        setInvokeRef,
    ] as const;
}
