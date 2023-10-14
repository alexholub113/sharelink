import TagBadge from '../../../../../components/TagBadge.tsx';

const LinkListItemTags = ({ tags }: { tags: string[]}) => {
    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <TagBadge title={tag} key={tag} />
            ))}
        </div>
    );
}

export default LinkListItemTags;
