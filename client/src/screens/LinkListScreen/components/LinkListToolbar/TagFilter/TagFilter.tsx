import {useStore} from '../../../../../contexts/AppContext.tsx';
import LinkStore from '../../../../../stores/LinkStore.ts';
import {observer} from 'mobx-react-lite';

const formatTitle = (title: string) => {
    const words = title.split(' ');
    return words.map((word) => {
        if (word.length < 4) {
            return word.toUpperCase();
        }
        
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
};

const TagFilter = observer(() => {
    const { state: { tags, filter: { tags: appliedTags } }, applyTagFilter, removeTagFilter } = useStore<LinkStore>(LinkStore);
    
    return (
        <div className="flex flex-row flex-wrap justify-center items-center">
            { appliedTags.map((tag) => (
                <button>
                    <div key={tag.title} onClick={() => removeTagFilter(tag)} className="
                                    flex flex-row items-center justify-center mb-2 mr-3 
                                    text-sm font-semibold text-gray-700 cursor-pointer dark:text-gray-300
                                    dark:bg-zinc-700 bg-gray-100 rounded-full px-3 py-1">
                        <span className="mr-2">{formatTitle(tag.title)}</span>
                        <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </div>
                </button>
            ))}
            { tags.filter(x => !appliedTags.some(e => e.title === x.title)).slice(0, 10).map((tag) => (
                <div key={tag.title} onClick={() => applyTagFilter(tag)} className="flex flex-row items-center justify-center mb-2 mr-3 text-sm font-medium text-gray-700 cursor-pointer dark:text-gray-300">
                    <span className="mr-1">{formatTitle(tag.title)}</span>
                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400 dark:bg-zinc-700 bg-gray-100 rounded-full px-2">{tag.count}</span>
                </div>
            )) }
        </div>
    );
});

export default TagFilter;
