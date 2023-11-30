import {createRef, useState} from 'react';
import useClickOutsideHandler from '../../../hooks/useClickOutsideHandler.ts';
import {observer} from 'mobx-react-lite';
import {useLinkStore} from '../../../contexts/AppContext.tsx';
import TagBadge from '../..//TagBadge.tsx';

const TagListButton = observer(() => {
    const { sortedTags, toggleTagFilter } = useLinkStore();
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = createRef<HTMLButtonElement>();
    const refObject = useClickOutsideHandler(() => setIsOpen(false));

    return (
        <div className="relative">
            <button ref={triggerRef} onClick={() => setIsOpen(!isOpen)} className="group secondary-text-color border border-zinc-800 focus:outline-nonefont-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">
                Tags
                <svg className="w-2.5 h-2.5 ms-3 opacity-70 group-hover:-translate-y-0.5 group-active:translate-y-0.5 transition" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            { isOpen && (
                <div ref={refObject} className="absolute bg-zinc-900 top-14 z-10 rounded-lg border border-zinc-800 w-96">
                    <div className="flex flex-wrap gap-2 p-4 justify-start">
                        {sortedTags.map((tag) => (
                            <TagBadge name={tag.name} key={tag.name} onClick={() => toggleTagFilter(tag.name)} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
});

export default TagListButton;