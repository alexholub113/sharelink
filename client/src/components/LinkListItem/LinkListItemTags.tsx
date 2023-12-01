import {useStore} from '../../contexts/AppContext.tsx';
import LinkStore from '../../stores/LinkStore.ts';
import {observer} from 'mobx-react-lite';
import TagBadge from '../TagBadge.tsx';
import {MaxTags} from '../../constants/preferences.ts';
import AddTagButton from './AddTagButton.tsx';

type LinkListItemTagsProps = {
    tags: string[];
    editable?: boolean;
    error?: string;
    onAdd?: (tag: string) => void;
    onRemove?: (tag: string) => void;
};

const LinkListItemTags = observer(({ tags, editable, error, onAdd, onRemove }: LinkListItemTagsProps) => {
    const { toggleTagFilter } = useStore<LinkStore>(LinkStore);
    const handleOnClick = (tag: string) => {
        if (!editable) {
            toggleTagFilter(tag);
        } else if (onRemove) {
            onRemove(tag);
        }
    };

    return (
        <>
            <div className="flex flex-wrap gap-2 items-center">
                {tags.map((tag) => (
                    <TagBadge key={tag} onClick={() => handleOnClick(tag)} name={tag} removable={editable} active />
                ))}
                { editable && tags.length < MaxTags && <AddTagButton onAdd={(tag) => onAdd && onAdd(tag)} />}
            </div>
            { editable && error && (<span className="text-red-500 text-sm">{error}</span>) }
        </>
    );
});

export default LinkListItemTags;