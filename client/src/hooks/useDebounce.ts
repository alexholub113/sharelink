import {useCallback, useRef} from 'react'

const useDebounce = (callback: () => void, delay?: number): () => void => {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    return useCallback(() => {
        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            callback();
        }, delay || 500);
    }, [callback, delay]);
};

export default useDebounce;