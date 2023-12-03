import {useState} from 'react';
import TagSearchInput from './TagSearchInput.tsx';
import Button from '../Button.tsx';

type TagInputProps = {
    onTagSelect: (tag: string) => void;
    exclude?: string[];
};
const AddTagButton = ({ onTagSelect, exclude }: TagInputProps) => {
    const [isInputVisible, setInputVisible] = useState(false);

    const handleOnTagSelect = (tag: string) => {
        onTagSelect(tag);
        setInputVisible(false);
    };

    return (
        <>
            {isInputVisible ? (
                <TagSearchInput exclude={exclude} adding onTagSelect={handleOnTagSelect} onSuggestionListClose={() => setInputVisible(false)} showSuggestionsInitial />
            ) : (
                <Button onClick={() => setInputVisible(true)} className="px-3 w-[9rem] flex font-bold flex-row gap-2 secondary-text-color
                rounded-full cursor-pointer bg-zinc-900 border border-zinc-700 p-2 hover:scale-105">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                    <span>Add tag</span>
                </Button>
            )}
        </>
    );
}

export default AddTagButton;