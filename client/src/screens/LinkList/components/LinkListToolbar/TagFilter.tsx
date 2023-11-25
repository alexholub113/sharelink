import {useStore} from '../../../../contexts/AppContext.tsx';
import LinkStore from '../../../../stores/LinkStore.ts';
import {observer} from 'mobx-react-lite';
import TagBadge from '../../../../components/TagBadge.tsx';
import {formatTagTitle} from '../../../../utils/format.ts';
import Skeleton from '../../../../components/Skeleton.tsx';
import {useMemo} from 'react';
import Button from '../../../../components/Button.tsx';

const MaxTagsShown = 12;

const TagFilter = observer(() => {
    const { state: { tags, filter: { tags: appliedTags }, isListLoading }, applyTagFilter, removeTagFilter } = useStore<LinkStore>(LinkStore);

    const sortedTags = useMemo(() => tags.slice().sort((a, b) => b.count - a.count), [tags]);
    const showSkeletons = isListLoading && tags.length === 0;
    return (
        <>
            { showSkeletons && (
                <div className="flex flex-col justify-center items-center w-full gap-2">
                    <Skeleton className="w-full" />
                    <Skeleton className="w-full" />
                </div>
            ) || <div className="flex flex-row flex-wrap justify-center gap-2 items-center">
                { appliedTags.map((tag) => (
                    <TagBadge key={tag} onClick={() => removeTagFilter(tag)} title={tag} removable />
                ))}
                { sortedTags.filter(x => !appliedTags.some(e => e === x.name)).slice(0, MaxTagsShown).map((tag) => (
                    <Button key={tag.name} onClick={() => applyTagFilter(tag.name)} className="py-1 mr-2">
                        <span className="mr-1">{formatTagTitle(tag.name)}</span>
                        <span className="text-xs font-normal text-gray-500 dark:text-zinc-400 dark:bg-zinc-700 rounded-full px-1">{tag.count}</span>
                    </Button>
                )) }
            </div>}
        </>
    );
});

export default TagFilter;