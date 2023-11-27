import React, {PropsWithChildren} from 'react';
import Button from './Button.tsx';

type SubmitButtonProps = {
    isLoading?: boolean;
    onClick?: () => void;
    className?: string | undefined;
    type?: "submit" | "reset" | "button" | undefined;
} & PropsWithChildren;
const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading, children, onClick, type, className = '' }) => (
    <Button isLoading={isLoading} type={type} textColor="primary" onClick={onClick} className={`
        text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:outline-none 
        focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2
        ${className}`}>
        {children}
    </Button>
);

export default SubmitButton;