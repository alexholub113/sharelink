import {useLinkStore, useUserStore} from '../../../contexts/AppContext.tsx';
import LinkListItemWrapper from '../../LinkList/components/LinkListItem/LinkListItemWrapper.tsx';
import LinkListItemTitle from '../../LinkList/components/LinkListItem/components/LinkListItemTitle.tsx';
import LinkListItemAuthor from '../../LinkList/components/LinkListItem/components/LinkListItemAuthor.tsx';
import LinkListItemContent from '../../LinkList/components/LinkListItem/components/LinkListItemContent.tsx';
import PreviewLink from '../../../services/LinkService/interfaces/PreviewLink.ts';
import TagBadge from '../../../components/TagBadge.tsx';
import {observer} from 'mobx-react-lite';
import TagInput from './TagInput.tsx';
import {MaxTags} from '../../../constants/preferences.ts';

const AddLinkPreview = observer((link: PreviewLink) => {
    const { setPreviewLinkTags } = useLinkStore();
    const { state: { userName }} = useUserStore();

    const removeTag = (tag: string) => {
        setPreviewLinkTags(link!.tags.filter((t) => t !== tag));
    };
    
    const isTagCanBeAdded = link.tags.length < MaxTags;
    return (
        <LinkListItemWrapper>
            <LinkListItemTitle title={link.title} />
            <div className="flex flex-wrap gap-2 items-center">
                {link.tags.map((tag) => (
                    <div onClick={() => removeTag(tag)}>
                        <TagBadge title={tag} key={tag} removable />
                    </div>
                ))}
                { isTagCanBeAdded && <TagInput onAdd={(tag) => setPreviewLinkTags([...link.tags, tag])} />}
            </div>
            <LinkListItemAuthor user={userName} createdAt={new Date().toLocaleDateString()} />
            <LinkListItemContent {...link} />
        </LinkListItemWrapper>
    );
});

export default AddLinkPreview;
