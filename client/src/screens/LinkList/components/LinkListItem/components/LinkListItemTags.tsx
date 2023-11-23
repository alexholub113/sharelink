import TagBadge from '../../../../../components/TagBadge.tsx';
import {useStore} from '../../../../../contexts/AppContext.tsx';
import LinkStore from '../../../../../stores/LinkStore.ts';
import {observer} from 'mobx-react-lite';

const LinkListItemTags = observer(({ tags }: { tags: string[]}) => {
    const { applyTagFilter } = useStore<LinkStore>(LinkStore);

    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <TagBadge title={tag} key={tag} onClick={() => applyTagFilter(tag)} />
            ))}
        </div>
    );
});

export default LinkListItemTags;