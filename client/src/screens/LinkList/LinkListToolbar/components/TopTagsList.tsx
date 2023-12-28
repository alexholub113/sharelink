import {observer} from 'mobx-react-lite';
import Skeleton from '../../../../components/Skeleton.tsx';
import TagBadge from '../../../../components/TagBadge.tsx';
import {useLinkStore} from '../../../../contexts/AppContext.tsx';
import {useMemo, useState} from 'react';

const MaxTagsShown = 10;

const TopTagsList = observer(() => {
    const { sortedTags, state: { tags, filter: { tags: appliedTags }, isListLoading }, toggleTagFilter } = useLinkStore();
    const [showAll, setShowAll] = useState(false);
    const tagList = useMemo(() => showAll ? sortedTags : sortedTags.slice(0, MaxTagsShown), [showAll, sortedTags]);

    const showSkeletons = isListLoading && tags.length === 0;
    return (
        <>
            { showSkeletons && (
                <div className="flex flex-col justify-center items-center w-full gap-2">
                    <Skeleton className="w-full" />
                    <Skeleton className="w-full" />
                </div>
            ) || <div className="flex flex-row flex-wrap justify-center gap-3 items-center">
                { appliedTags.map((tag) => (
                    <TagBadge key={tag} onClick={() => toggleTagFilter(tag)} name={tag} removable active />
                ))}
                { tagList.filter(x => !appliedTags.some(e => e === x.name)).map((tag) => (
                    <TagBadge key={tag.name} {...tag} onClick={() => toggleTagFilter(tag.name)} />
                )) }
                { !showAll && sortedTags.length > MaxTagsShown && (
                    <button onClick={() => setShowAll(true)} className="py-1 font-semibold text-zinc-500 hover:text-zinc-300">
                        show more
                    </button>
                )}
                { showAll && sortedTags.length > MaxTagsShown && (
                    <button onClick={() => setShowAll(false)} className="py-1 font-semibold text-zinc-500 hover:text-zinc-300">
                        show less
                    </button>
                )}
            </div>}
        </>
    );
});

export default TopTagsList;