import FloatingInputWrapper from './FloatingInputWrapper.tsx';

type FloatingInputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    pl?: 'pl-10' | 'pl-4';
    pr?: 'pr-16' | 'pr-4';
}

const FloatingInput = ({ value, onChange, placeholder, pl = 'pl-4', pr = 'pr-4' }: FloatingInputProps) => (
    <FloatingInputWrapper>
        <input type="text" id="floating_standard" className={`block py-3 w-full text-gray-900 bg-transparent border-0 
                                border-b-2 border-gray-300 appearance-none dark:text-white/80 
                                dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none
                                 focus:ring-0 focus:border-cyan-600 peer ${pl} ${pr}`}
               placeholder=" " value={value} onChange={(event) => onChange(event.target.value)} />
        <label htmlFor="floating_standard" className={`absolute dark:text-zinc-500 duration-300
                            transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0
                             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                              peer-focus:scale-75 peer-focus:-translate-y-6 ${pl} ${pr}`}>
            {placeholder}
        </label>
    </FloatingInputWrapper>
);

export default FloatingInput;