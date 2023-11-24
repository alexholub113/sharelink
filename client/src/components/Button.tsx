import {PropsWithChildren} from 'react';
import Loader from './Loader.tsx';

type ButtonProps = {
    isLoading?: boolean;
    isDisabled?: boolean;
    onClick?: () => void;
    className?: string | undefined;
    type?: "submit" | "reset" | "button" | undefined;
    disableAnimation?: boolean;
} & PropsWithChildren;

const Button = ({ isLoading, isDisabled, type, className, onClick, children, disableAnimation }: ButtonProps) => {
    const handleOnClick = () => {
        if (isLoading) {
            return;
        }

        onClick && onClick();
    };

    return (
        <button disabled={isLoading === true || isDisabled === true} type={type ?? 'button'} onClick={handleOnClick} className={`
        flex items-center justify-center text-center transition text-sm
        ${disableAnimation ? '' : ' hover:scale-105 active:scale-95'}
        ${className} ${isLoading ? ' opacity-70 active:scale-100' : ''}`}>
            { isLoading && <Loader className="mr-2" /> }
            {children}
        </button>
    );
};

export default Button;