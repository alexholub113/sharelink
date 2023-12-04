import UrlInput from './components/ContentUrlInput.tsx';
import {observer} from 'mobx-react-lite';
import {useLinkStore} from '../../contexts/AppContext.tsx';
import AddLinkForm from './components/AddLinkForm.tsx';
import {useState} from 'react';
import supportedWebsites from '../../constants/supportedWebsites.ts';
import {handleError} from '../../utils/errors.ts';
import ErrorAlert from '../../components/ErrorAlert.tsx';
import AddLinkInfoAlert from './components/AddLinkInfoAlert.tsx';
import LinkListItemSkeleton from '../../components/LinkListItem/LinkListItemSkeleton.tsx';

export const validateUrl = (url: string): string | undefined => {
    try {
        const urlObj = new URL(url);

        if (!supportedWebsites.includes(urlObj.origin)) {
            return 'This kind of URL is not supported.';
        }

    } catch (e) {
        return 'Your URL is invalid. Try fix it.';
    }
};

const AddLinkScreen = observer(({ onSuccess }: { onSuccess: () => void}) => {
    const { state: { preview: { url, link }}, previewLink } = useLinkStore();
    const [previewErrorMessage, setPreviewErrorMessage] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (url?: string) => {
        setIsLoading(true);

        try {
            if (!url) {
                setPreviewErrorMessage('Please enter a link');
                return;
            }

            const errorMessage = validateUrl(url);
            if (errorMessage) {
                setPreviewErrorMessage(errorMessage);
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
            <UrlInput onSubmit={handleSubmit} isLoading={isLoading} initialUrl={url} />
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