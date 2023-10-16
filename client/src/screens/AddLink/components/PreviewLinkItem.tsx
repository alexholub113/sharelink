import {useUserStore} from '../../../contexts/AppContext.tsx';
import LinkListItemWrapper from '../../LinkList/components/LinkListItem/LinkListItemWrapper.tsx';
import LinkListItemTitle from '../../LinkList/components/LinkListItem/components/LinkListItemTitle.tsx';
import LinkListItemAuthor from '../../LinkList/components/LinkListItem/components/LinkListItemAuthor.tsx';
import LinkListItemContent from '../../LinkList/components/LinkListItem/components/LinkListItemContent.tsx';
import LinkListItemTags from '../../LinkList/components/LinkListItem/components/LinkListItemTags.tsx';
import PreviewLink from '../../../services/LinkService/interfaces/PreviewLink.ts';

const PreviewLinkItem = (link: PreviewLink) => {
    const { state: { userName }} = useUserStore();
    
    return (
        <LinkListItemWrapper>
            <LinkListItemTitle title={link.title} />
            <LinkListItemTags tags={link.tags} />
            <LinkListItemAuthor user={userName} createdAt={new Date().toLocaleDateString()} />
            <LinkListItemContent {...link} />
        </LinkListItemWrapper>
    );
};

export default PreviewLinkItem;
