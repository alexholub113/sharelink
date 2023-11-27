import React, {useEffect, useState} from 'react';
import useClickOutsideHandler from '../hooks/useClickOutsideHandler.ts';
import {observer} from 'mobx-react-lite';
import {useLinkStore} from '../contexts/AppContext.tsx';
import TagBadge from '../components/TagBadge.tsx';
import SearchIcon from '../components/SearchIcon.tsx';
import Button from './Button.tsx';

type TagSearchProps = {
    showSuggestionsInitial?: boolean;
    className?: string;
    onTagClick?: (tagName: string) => void;
    onSuggestionListClose?: () => void;
    onAdd?: (tagName: string) => void;
};

const TagSearchInput = observer(({ className, onTagClick, showSuggestionsInitial, onSuggestionListClose, onAdd}: TagSearchProps) => {
    const { sortedTags, state: { filter: { tags: appliedTags }} } = useLinkStore();
    const [suggestions, setFilteredSuggestions] = useState(sortedTags);
    const [userInput, setUserInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const triggerRef = React.useRef<HTMLInputElement>(null);
    const refObject = useClickOutsideHandler(() => {
        closeSuggestionList();
    }, triggerRef);

    const handleOnFocus = () => {
        setFilteredSuggestions(sortedTags);
        setShowSuggestions(true);
    };

    const closeSuggestionList = () => {
        setShowSuggestions(false);
        onSuggestionListClose && onSuggestionListClose();
    };

    const handleOnAdd = () => {
        if (onAdd) {
            onAdd(userInput);
            closeSuggestionList();
        }
    };

    useEffect(() => {
        if (showSuggestionsInitial) {
            triggerRef.current?.focus();
        }
    }, []);

    useEffect(() => {
        setFilteredSuggestions(userInput.length ?
            sortedTags.filter(suggestion => suggestion.name.indexOf(userInput.toLowerCase()) > -1):
            sortedTags);
    }, [userInput])

    useEffect(() => {
        if (!showSuggestions) {
            setUserInput('');
        }
    }, [showSuggestions]);

    return (
        <div className="relative">
            <input ref={triggerRef}
                   value={userInput}
                   onChange={(e) => setUserInput(e.currentTarget.value)}
                   onFocus={handleOnFocus}
                   placeholder="Search tag"
                   className={`relative pl-10 pr-4 py-2 input-border-blue group secondary-text-color dark-border w-[12rem] bg-zinc-900 focus:outline-none font-medium rounded-full text-sm
                    ${className}`} />
            <SearchIcon />
            { showSuggestions && (
                <div ref={refObject} className="absolute overflow-auto bg-zinc-900 top-11 z-10 rounded-lg dark-border w-80 max-h-52">
                    {/* Existing tags display */}
                    {suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-3 p-3 justify-start items-start">
                            {suggestions.map((tag) => (
                                <TagBadge key={tag.name} {...tag} onClick={() => onTagClick && onTagClick(tag.name)} active={appliedTags.some(x => x === tag.name)} />
                            ))}
                        </div>
                    )}

                    {/* No tags found display */}
                    { !onAdd && suggestions.length === 0 && (
                        <div className="flex flex-col p-4 justify-center items-center w-full text-sm secondary-text-color">
                            No tags found
                        </div>
                    )}

                    {/* Add New Tag Button */}
                    { !!onAdd && userInput && !suggestions.some(tag => tag.name === userInput) && (
                        <Button onClick={handleOnAdd} className="w-full my-4 dark:text-white font-semibold text-base">
                            Add '{userInput}' as a new tag
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
});

export default TagSearchInput;