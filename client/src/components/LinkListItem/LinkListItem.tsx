import LinkListItemContent from './LinkListItemContent.tsx';
import LinkListItemTitle from './LinkListItemTitle.tsx';
import LinkListItemAuthor from './LinkListItemAuthor.tsx';
import LinkListItemTags from './LinkListItemTags.tsx';
import Link from '../../models/Link.ts';
import { useState } from 'react';
import { useLinkStore } from '../../contexts/AppContext.tsx';
import LinkListItemActionPanel from './LinkListItemActionPanel.tsx';
import useAsyncAction from '../../hooks/useAsyncAction.ts';

const LinkListItem = ({ link }: { link: Link }) => {
    const [updating, setUpdating] = useState(false);
    const { updateLink, toggleTagFilter } = useLinkStore();
    const {loading, execute} = useAsyncAction(({title, tags}: Pick<Link, 'title' | 'tags'>) => updateLink(link.id, { title, tags }));

    const handleOnEditClick = () => {
        setUpdating(true);
    };

    const handleOnTitleUpdate = (title: string) => {
        if (title !== link.title) {
            execute({ ...link, title });
        }
    }

    const handleOnTagSelect = (tag: string) => {
        if (!updating) {
            toggleTagFilter(tag);
        } else {
            if (link.tags.includes(tag)) {
                execute({ ...link, tags: link.tags.filter((t) => t !== tag) });
            } else {
                execute({ ...link, tags: [...new Set([...link.tags, tag])] });
            }
        }
    };

    return (
        <>
            <LinkListItemContent {...link} />
            <div className="px-2 mb-4">
                <LinkListItemActionPanel
                    disabled={loading}
                    updating={updating} link={link}
                    onCancelClick={() => setUpdating(false)}
                    onEditClick={handleOnEditClick} />
            </div>
            <LinkListItemTags editable={updating} tags={link.tags} onTagSelect={handleOnTagSelect} />
            <LinkListItemTitle editable={updating} title={link.title} onUpdate={handleOnTitleUpdate} />
            <LinkListItemAuthor {...link} />
        </>
    );
};

export default LinkListItem;