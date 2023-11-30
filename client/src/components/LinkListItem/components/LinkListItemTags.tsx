import {useStore} from '../../../contexts/AppContext.tsx';
import LinkStore from '../../../stores/LinkStore.ts';
import {observer} from 'mobx-react-lite';
import TagBadge from '../../TagBadge.tsx';

const LinkListItemTags = observer(({ tags }: { tags: string[]}) => {
    const { toggleTagFilter } = useStore<LinkStore>(LinkStore);

    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <TagBadge name={tag} key={tag} onClick={() => toggleTagFilter(tag)} active />
            ))}
        </div>
    );
});

export default LinkListItemTags;