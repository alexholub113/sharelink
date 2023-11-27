import {useState} from 'react';
import TagSearchInput from '../../../components/TagSearchInput.tsx';
import Button from '../../../components/Button.tsx';

type TagInputProps = {
    onAdd: (tag: string) => void;
};
const AddTagButton = ({ onAdd }: TagInputProps) => {
    const [isInputVisible, setInputVisible] = useState(false);

    const handleOnAdd = (tag: string) => {
        onAdd(tag);
        setInputVisible(false);
    };

    return (
        <>
            {isInputVisible ? (
                <TagSearchInput onTagClick={handleOnAdd} onAdd={handleOnAdd} onSuggestionListClose={() => setInputVisible(false)} showSuggestionsInitial />
            ) : (
                <Button onClick={() => setInputVisible(true)} className="px-3 flex font-bold flex-row gap-2 secondary-text-color
                rounded-full cursor-pointer bg-zinc-900 dark-border p-2 hover:scale-105">
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