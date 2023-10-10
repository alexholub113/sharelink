import React, {HTMLInputTypeAttribute} from 'react';

type InputProps = {
    errorMessage?: string;
    placeholder?: string;
    label?: string;
    type?: HTMLInputTypeAttribute;
    rest?: Partial<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>;
}
const Input: React.FC<InputProps> = ({errorMessage, label, placeholder, type, rest}) => (
    <div>
        { label && <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</span>}
        <input type={type} {...rest} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder={placeholder} />
        { errorMessage && (<span className="text-red-500 text-sm">{errorMessage}</span>) }
    </div>
);

export default Input;
