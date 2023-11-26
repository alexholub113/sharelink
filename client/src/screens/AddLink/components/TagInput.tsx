import {ChangeEvent, useState} from 'react';
import TagBadge from '../../../components/TagBadge.tsx';
import {MaxTagLength} from '../../../constants/preferences.ts';

type TagInputProps = {
    onAdd: (tag: string) => void;
};
const TagInput = ({ onAdd }: TagInputProps) => {
    const [isInputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleAddTag = () => {
        if (inputValue.trim()) {
            onAdd(inputValue);
            setInputValue('');
        }
        setInputVisible(false);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue.length > MaxTagLength) return;
        setInputValue(inputValue);
    };

    return (
        <>
            {isInputVisible ? (
                <TagBadge name="">
                    <input
                        autoFocus
                        type="text"
                        value={inputValue}
                        onBlur={handleAddTag}
                        onChange={handleChange}
                        className="flex w-[10rem] dark:bg-transparent p-0 m-0 text-sm font-semibold cursor-pointer secondary-text-color
                                 bg-transparent border-none appearance-none focus:ring-0"
                    />
                </TagBadge>
            ) : (
                <div onClick={() => setInputVisible(true)} className="flex items-center justify-center dark:bg-transparent
                rounded-full cursor-pointer dark:bg-zinc-700 bg-gray-100 p-2 hover:scale-105">
                    <svg className="w-4 h-4 font-bold secondary-text-color" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                </div>
            )}
        </>
    );
}

export default TagInput;