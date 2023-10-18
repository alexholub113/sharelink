import AddLinkSetUrl from './components/AddLinkSetUrl.tsx';
import {observer} from 'mobx-react-lite';
import {useLinkStore} from '../../contexts/AppContext.tsx';
import AddLinkPreview from './components/AddLinkPreview.tsx';
import LinkListItemSkeleton from '../LinkList/components/LinkListItemSkeleton.tsx';

const AddLinkScreen = observer(() => {
    const { state: { preview: { url, link } }} = useLinkStore();

    return (
        <div className="flex flex-col gap-4 mt-14 w-full md:max-w-screen-sm">
            <AddLinkSetUrl />
            { url && (
                <div className="flex flex-col items-center justify-center mt-6">
                    { link && <AddLinkPreview {...link} /> || <LinkListItemSkeleton /> }
                </div>
            )}
        </div>
    );
});

export default AddLinkScreen;
