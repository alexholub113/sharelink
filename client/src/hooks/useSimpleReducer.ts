import {Dispatch, useReducer} from 'react';

const useSimpleReducer = <TForm>(initialState: TForm): { state: TForm, dispatch: Dispatch<Partial<TForm>> } => {
    const reducer = (prev: TForm, next: Partial<TForm>): TForm => {
        return {...prev, ...next};
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    return {state, dispatch};
};

export default useSimpleReducer;
