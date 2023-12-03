import {useCallback, useState} from 'react';
import {handleError} from '../utils/errors.ts';


type AsyncAction = {
    execute: (param?: any) => void;
    loading: boolean;
    error?: string;
};

const useAsyncAction = <T>(action: (param: T) => Promise<void>): AsyncAction => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | undefined>()

    const execute = useCallback(async (param: T) => {
        setLoading(true)
        setError(undefined)
        try {
            await action(param);
        } catch (error) {
            setError(handleError(error))
        }
        setLoading(false)
    }, [action])

    return { execute, loading, error }
};

export default useAsyncAction;