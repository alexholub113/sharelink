import SetUrl from './components/SetUrl.tsx';
import {observer} from 'mobx-react-lite';
import {useLinkStore} from '../../contexts/AppContext.tsx';
import AddLinkPreview from './components/AddLinkPreview.tsx';
import LinkListItemSkeleton from '../LinkList/components/LinkListItemSkeleton.tsx';
import SubmitButton from '../../components/SubmitButton.tsx';
import {useState} from 'react';
import ErrorAlert from '../../components/ErrorAlert.tsx';

const AddLinkScreen = observer(({ onSuccess }: { onSuccess: () => void}) => {
    const { state: { preview: { url, link } }, submitLink} = useLinkStore();
    const [submitErrorMessage, setSubmitErrorMessage] = useState<string | undefined>(undefined);
    const submitHandler = async () => {
        const { errorMessage } = await submitLink();
        if (!errorMessage) {
            onSuccess();
        } else {
            setSubmitErrorMessage(errorMessage);
        }
    }

    return (
        <div className="flex flex-col gap-4 mt-14 w-full md:max-w-screen-sm">
            <SetUrl />
            { url && (
                <div className="flex flex-col items-center justify-center mt-6">
                    { !link && <LinkListItemSkeleton /> }
                    { link && (
                        <>
                            <AddLinkPreview {...link} />
                            <div className="flex justify-end mr-5 mt-6">
                                <SubmitButton onClick={submitHandler} type="button" className="px-4 text-lg">
                                    Submit
                                </SubmitButton>
                            </div>
                            { submitErrorMessage && <ErrorAlert className="mt-4" message={submitErrorMessage} onClose={() => setSubmitErrorMessage(undefined)} /> }
                        </>
                    )}
                </div>
            )}
        </div>
    );
});

export default AddLinkScreen;
