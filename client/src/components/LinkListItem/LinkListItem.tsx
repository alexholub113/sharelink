import LinkListItemContent from './LinkListItemContent.tsx';
import LinkListItemTitle from './LinkListItemTitle.tsx';
import LinkListItemAuthor from './LinkListItemAuthor.tsx';
import LinkListItemTags from './LinkListItemTags.tsx';
import Link from '../../models/Link.ts';
import {useState} from 'react';
import {useLinkStore} from '../../contexts/AppContext.tsx';
import LinkListItemActionPanel from './LinkListItemActionPanel.tsx';
import useAsyncAction from '../../hooks/useAsyncAction.ts';

const LinkListItem = ({ link }: { link: Link }) => {
    const [updating, setUpdating] = useState(false);
    const { updateLink } = useLinkStore();
    const [updateState, setUpdateState] = useState<Pick<Link, 'title' | 'tags'>>({ title: link.title, tags: link.tags });
    const {loading, execute} = useAsyncAction(() => updateLink(link.id, updateState));

    const handleOnEditClick = () => {
        setUpdateState({ title: link.title, tags: link.tags });
        setUpdating(true);
    };

    const handleOnApplyClick = async () => {
        await execute();
        setUpdating(false);
    };

    const handleOnRemoveTag = (tag: string) => {
        setUpdateState((prevState) => ({ ...prevState, tags: prevState.tags.filter((t) => t !== tag) }));
    };

    const handleOnAddTag = (tag: string) => {
        setUpdateState((prevState) => ({ ...prevState, tags: [...prevState.tags, tag] }));
    };

    const handleOnTitleUpdate = (title: string) => {
        setUpdateState((prevState) => ({ ...prevState, title }));
    }

    return (
        <>
            <LinkListItemContent {...link} />
            <div className="px-2 mb-4">
                <LinkListItemActionPanel
                    disabled={loading}
                    updating={updating} link={link}
                    onApplyClick={handleOnApplyClick}
                    onCancelClick={() => setUpdating(false)}
                    onEditClick={handleOnEditClick} />
            </div>
            <LinkListItemTags editable={updating} tags={updating ? updateState.tags : link.tags} onRemove={handleOnRemoveTag} onAdd={handleOnAddTag} />
            <LinkListItemTitle editable={updating} title={updating ? updateState.title : link.title} onUpdate={handleOnTitleUpdate} />
            <LinkListItemAuthor {...link} />
        </>
    );
};

export default LinkListItem;