import React, {useEffect, useState} from 'react';
import useClickOutsideHandler from '../hooks/useClickOutsideHandler.ts';
import {observer} from 'mobx-react-lite';
import {useLinkStore} from '../contexts/AppContext.tsx';
import TagBadge from '../components/TagBadge.tsx';
import SearchIcon from '../components/SearchIcon.tsx';

type TagSearchProps = {
    showSuggestionsInitial?: boolean;
    className?: string;
    onTagClick?: (tagName: string) => void;
    onSuggestionListClose?: () => void;
};

const TagSearchInput = observer(({ className, onTagClick, showSuggestionsInitial, onSuggestionListClose}: TagSearchProps) => {
    const { sortedTags, state: { filter: { tags: appliedTags }} } = useLinkStore();
    const [suggestions, setFilteredSuggestions] = useState(sortedTags);
    const [userInput, setUserInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const triggerRef = React.useRef<HTMLInputElement>(null);
    const refObject = useClickOutsideHandler(() => {
        setShowSuggestions(false);
        onSuggestionListClose && onSuggestionListClose();
    }, triggerRef);

    const handleOnFocus = () => {
        setFilteredSuggestions(sortedTags);
        setShowSuggestions(true);
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
                   className={`relative pl-10 pr-4 py-2 input-border-blue group secondary-text-color border 
                   border-zinc-800 w-[12rem] bg-zinc-900 focus:outline-none font-medium rounded-full text-sm
                    ${className}`} />
            <SearchIcon />
            { showSuggestions && (
                <div ref={refObject} className="absolute overflow-auto bg-zinc-900 top-11 z-10 rounded-lg border border-zinc-800 w-80 max-h-52">
                    { suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-3 p-3 justify-start items-start">
                            {suggestions.map((tag) => (
                                <TagBadge key={tag.name} {...tag} onClick={() => onTagClick && onTagClick(tag.name)} active={appliedTags.some(x => x === tag.name)} />
                            ))}
                        </div>
                    ) }
                    { suggestions.length === 0 && (
                        <div className="flex flex-col p-4 justify-center items-center w-full text-sm secondary-text-color">
                            No tags found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
});

export default TagSearchInput;