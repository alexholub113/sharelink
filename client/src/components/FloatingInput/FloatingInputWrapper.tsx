import {PropsWithChildren} from 'react';

const FloatingInputWrapper = ({ children }: PropsWithChildren) => {
    return (
        <div className="relative z-0">
            {children}
        </div>
    );
}

export default FloatingInputWrapper;
