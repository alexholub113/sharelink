import {PropsWithChildren} from 'react';
import Loader from './Loader.tsx';

type ButtonProps = {
    loading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    className?: string | undefined;
    type?: "submit" | "reset" | "button" | undefined;
    disableAnimation?: boolean;
    textColor?: 'secondary' | 'primary';
} & PropsWithChildren;

const Button = ({ loading, disabled, type, className, onClick, children, disableAnimation, textColor = 'secondary' }: ButtonProps) => {
    disabled = loading === true || disabled === true;
    const handleOnClick = () => {
        if (disabled === true) {
            return;
        }

        onClick && onClick();
    };

    return (
        <button disabled={disabled} type={type ?? 'button'} onClick={handleOnClick} className={`
        flex items-center justify-center text-center dark:hover:text-white transition cursor-pointer outline-none
        ${textColor === 'secondary' ? 'secondary-text-color text-sm' : 'text-white font-semibold text-base'}
        ${disableAnimation ? '' : ' hover:scale-105 active:scale-95'}
        ${className} ${disabled ? ' opacity-70 active:scale-100' : ''}`}>
            { loading && <Loader className="mr-2" /> }
            {children}
        </button>
    );
};

export default Button;