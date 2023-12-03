import React, { useEffect, useMemo, useState } from 'react';
import useClickOutsideHandler from '../../hooks/useClickOutsideHandler.ts';
import {useLinkStore} from '../../contexts/AppContext.tsx';
import TagBadge from '../TagBadge.tsx';
import SearchIcon from '../SearchIcon.tsx';
import Button from '../Button.tsx';

type TagSearchProps = {
    showSuggestionsInitial?: boolean;
    className?: string;
    onTagSelect?: (tagName: string) => void;
    onSuggestionListClose?: () => void;
    adding?: boolean;
    exclude?: string[];
};

const TagSearchInput = ({ exclude, className, onTagSelect, showSuggestionsInitial, onSuggestionListClose, adding}: TagSearchProps) => {
    const { sortedTags } = useLinkStore();
    const [userInput, setUserInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const triggerRef = React.useRef<HTMLInputElement>(null);
    const refObject = useClickOutsideHandler(() => {
        closeSuggestionList();
    }, triggerRef);

    const handleOnFocus = () => {
        setShowSuggestions(true);
    };

    const closeSuggestionList = () => {
        setShowSuggestions(false);
        onSuggestionListClose && onSuggestionListClose();
    };

    const handleOnAdd = () => {
        if (onTagSelect) {
            onTagSelect(userInput);
            closeSuggestionList();
        }
    };

    useEffect(() => {
        if (showSuggestionsInitial) {
            triggerRef.current?.focus();
        }
    }, []);

    useEffect(() => {
        if (!showSuggestions) {
            setUserInput('');
        }
    }, [showSuggestions]);

    const suggestions = useMemo(() => {
        const tags = exclude ? sortedTags.filter(tag => !exclude.includes(tag.name)) : sortedTags;
        return userInput.length ?
            tags.filter(suggestion => suggestion.name.indexOf(userInput.toLowerCase()) > -1):
            tags
    }, [sortedTags, exclude, userInput]);

    const inputInExcluded = exclude && exclude?.includes(userInput);
    return (
        <div className="relative">
            <input ref={triggerRef}
                   value={userInput}
                   onChange={(e) => setUserInput(e.currentTarget.value)}
                   onFocus={handleOnFocus}
                   placeholder="Search tag"
                   className={`relative pl-10 pr-4 py-2 input-border-blue group secondary-text-color dark-border w-[9rem] bg-zinc-900 focus:outline-none font-medium rounded-full text-sm
                    ${className}`} />
            <SearchIcon />
            { showSuggestions && (
                <div ref={refObject} className="absolute overflow-auto bg-zinc-900 top-11 z-10 rounded-lg dark-border w-80 max-h-52">
                    {/* Existing initialSuggestionList display */}
                    {suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-3 p-3 justify-start items-start">
                            {suggestions.map((tag) => (
                                <TagBadge key={tag.name} {...tag} onClick={() => onTagSelect && onTagSelect(tag.name)} />
                            ))}
                        </div>
                    )}

                    {/* No initialSuggestionList found display */}
                    { !adding && suggestions.length === 0 && (
                        <div className="flex flex-col p-4 justify-center items-center w-full text-sm secondary-text-color">
                            No tags found
                        </div>
                    )}

                    {/* Add New Tag Button */}
                    { !!adding && userInput && !inputInExcluded && !suggestions.some(tag => tag.name === userInput) && (
                        <Button onClick={handleOnAdd} disableAnimation className="w-full my-4 dark:text-white font-semibold text-base">
                            Add '{userInput}' as a new tag
                        </Button>
                    )}

                    {/* New Tag already included */}
                    { !!adding && userInput && inputInExcluded && (
                        <div className="flex flex-col p-4 justify-center items-center w-full text-sm secondary-text-color">
                            Tag already added
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TagSearchInput;