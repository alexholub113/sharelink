import {useCallback, useState} from 'react';
import {handleError} from '../utils/errors.ts';


type AsyncAction = {
    execute: () => Promise<void>;
    loading: boolean;
    error?: string;
};

const useAsyncAction = (action: () => Promise<void>): AsyncAction => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | undefined>()

    const execute = useCallback(async () => {
        setLoading(true)
        setError(undefined)
        try {
            await action();
        } catch (error) {
            setError(handleError(error))
        }
        setLoading(false)
    }, [action])

    return { execute, loading, error }
};

export default useAsyncAction;