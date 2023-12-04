import {observer} from 'mobx-react-lite';
import TagBadge from '../TagBadge.tsx';
import {MaxTags} from '../../constants/preferences.ts';
import AddTagButton from './AddTagButton.tsx';

type LinkListItemTagsProps = {
    tags: string[];
    editable?: boolean;
    error?: string;
    onTagSelect: (tag: string) => void;
};

const LinkListItemTags = observer(({ tags, editable, error, onTagSelect }: LinkListItemTagsProps) => {
    const handleOnTagSelect = (tag: string) => {
        if (onTagSelect) {
            onTagSelect(tag);
        }
    };

    return (
        <>
            <div className="flex flex-wrap gap-2 items-center">
                {tags.map((tag) => (
                    <TagBadge key={tag} onClick={() => handleOnTagSelect(tag)} name={tag} removable={editable} active />
                ))}
                { editable && tags.length < MaxTags && <AddTagButton exclude={editable ? tags : []} onTagSelect={handleOnTagSelect} />}
            </div>
            { editable && error && (<span className="text-red-500 text-sm">{error}</span>) }
        </>
    );
});

export default LinkListItemTags;