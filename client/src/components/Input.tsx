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
    <div className="w-full">
        { label && <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</span>}
        <input type={type} {...rest} value={value}
               className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm
                rounded-lg input-border-blue block w-full p-2.5 dark:bg-zinc-600 
                dark:border-zinc-500 dark:placeholder-zinc-400 dark:text-white ${className}`} placeholder={placeholder} />
        { errorMessage && (<span className="text-red-500 text-sm">{errorMessage}</span>) }
    </div>
);

export default Input;