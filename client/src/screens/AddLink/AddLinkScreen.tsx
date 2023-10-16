import AddLinkSetUrl from './components/AddLinkSetUrl.tsx';
import {observer} from 'mobx-react-lite';
import {useLinkStore} from '../../contexts/AppContext.tsx';
import PreviewLinkItem from './components/PreviewLinkItem.tsx';
import LinkListItemSkeleton from '../LinkList/components/LinkListItemSkeleton.tsx';

const AddLinkScreen = observer(() => {
    const { state: { preview: { url, link } }} = useLinkStore();
    // const removeTag = (tag: string) => {
    //     setPreviewLinkTags(link!.tags.filter((t) => t !== tag));
    // };
    return (
        <div className="flex flex-col gap-4 mt-14 w-full md:max-w-screen-md">
            <AddLinkSetUrl />
            { url && (
                <div className="flex items-center justify-center mt-6">
                    { !link && (
                        <LinkListItemSkeleton />
                    ) }
                    { link && (
                        <PreviewLinkItem {...link} />
                    )}
                </div>
            )}
        </div>
    );
});

export default AddLinkScreen;
