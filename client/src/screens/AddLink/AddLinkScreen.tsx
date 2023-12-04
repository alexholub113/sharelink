import UrlInput from './components/ContentUrlInput.tsx';
import {observer} from 'mobx-react-lite';
import {useLinkStore} from '../../contexts/AppContext.tsx';
import AddLinkForm from './components/AddLinkForm.tsx';
import {useState} from 'react';
import {handleError} from '../../utils/errors.ts';
import ErrorAlert from '../../components/ErrorAlert.tsx';
import AddLinkInfoAlert from './components/AddLinkInfoAlert.tsx';
import LinkListItemSkeleton from '../../components/LinkListItem/LinkListItemSkeleton.tsx';

export const isUrlValid = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

const AddLinkScreen = observer(({ onSuccess }: { onSuccess: () => void}) => {
    const { state: { preview: { url, link }}, previewLink } = useLinkStore();
    const [previewErrorMessage, setPreviewErrorMessage] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleUrlSubmit = async (url?: string) => {
        setIsLoading(true);

        try {
            if (!url) {
                setPreviewErrorMessage('Please enter a link');
                return;
            }

            if (!isUrlValid(url)) {
                setPreviewErrorMessage('Your URL is invalid. Try fix it.');
                return;
            }

            setPreviewErrorMessage(undefined);
            await previewLink(url!);
        } catch (e) {
            const errorMessage = handleError(e);
            if (errorMessage) {
                setPreviewErrorMessage(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col justify-center  gap-4 w-full max-w-screen-sm">
            <UrlInput onUrlSubmit={handleUrlSubmit} isLoading={isLoading} initialUrl={url} />
            { !isLoading && previewErrorMessage && <ErrorAlert message={previewErrorMessage} onClose={() => setPreviewErrorMessage(undefined)} /> }
            { !isLoading && (!url || previewErrorMessage) && <AddLinkInfoAlert /> }

            <div className="flex flex-col items-center justify-center gap-4 mt-6">
                { isLoading && <LinkListItemSkeleton /> }
                { link && <AddLinkForm onSuccess={onSuccess} link={link} /> }
            </div>
        </div>
    );
});

export default AddLinkScreen;