import {useStore} from '../../../../../contexts/AppContext.tsx';
import LinkStore from '../../../../../stores/LinkStore.ts';
import {observer} from 'mobx-react-lite';
import TagBadge from '../../../../../components/TagBadge.tsx';
import Skeleton from '../../../../../components/Skeleton.tsx';

const MaxTagsShown = 12;

const TopTagsList = observer(() => {
    const { sortedTags, state: { tags, filter: { tags: appliedTags }, isListLoading }, toggleTagFilter } = useStore<LinkStore>(LinkStore);

    const showSkeletons = isListLoading && tags.length === 0;
    return (
        <>
            { showSkeletons && (
                <div className="flex flex-col justify-center items-center w-full gap-2">
                    <Skeleton className="w-full" />
                    <Skeleton className="w-full" />
                </div>
            ) || <div className="flex flex-row flex-wrap justify-center gap-3 items-start">
                { appliedTags.map((tag) => (
                    <TagBadge key={tag} onClick={() => toggleTagFilter(tag)} name={tag} removable active />
                ))}
                { sortedTags.filter(x => !appliedTags.some(e => e === x.name)).slice(0, MaxTagsShown).map((tag) => (
                    <TagBadge key={tag.name} {...tag} onClick={() => toggleTagFilter(tag.name)} />
                )) }
            </div>}
        </>
    );
});

export default TopTagsList;