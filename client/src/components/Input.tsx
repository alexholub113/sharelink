import React, {HTMLInputTypeAttribute} from 'react';

type InputProps = {
    value?: string;
    errorMessage?: string;
    placeholder?: string;
    label?: string;
    className?: string;
    type?: HTMLInputTypeAttribute;
    rest?: Partial<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>;
}
const Input: React.FC<InputProps> = ({value, className, errorMessage, label, placeholder, type = 'text', rest}) => (
    <div className="w-full secondary-text-color">
        { label && <span className="block mb-2 text-sm font-medium">{label}</span>}
        <input type={type} {...rest} value={value}
               className={`dark-border text-sm rounded-lg input-border-blue block w-full p-2.5 dark:bg-zinc-800 
                dark:placeholder-zinc-400 dark:focus:text-white ${className}`} placeholder={placeholder} />
        { errorMessage && (<span className="text-red-500 text-sm">{errorMessage}</span>) }
    </div>
);

export default Input;