import {useLinkStore} from '../../../contexts/AppContext.tsx';
import LinkListItemWrapper from '../../LinkList/components/LinkListItem/LinkListItemWrapper.tsx';
import LinkListItemContent from '../../LinkList/components/LinkListItem/components/LinkListItemContent.tsx';
import TagBadge from '../../../components/TagBadge.tsx';
import {observer} from 'mobx-react-lite';
import TagInput from './TagInput.tsx';
import {MaxTags} from '../../../constants/preferences.ts';
import TitleInput from './TitleInput.tsx';
import SubmitButton from '../../../components/SubmitButton.tsx';
import ErrorAlert from '../../../components/ErrorAlert.tsx';
import LinkListItemSkeleton from '../../LinkList/components/LinkListItemSkeleton.tsx';
import useSimpleReducer from '../../../hooks/useSimpleReducer.ts';
import { useEffect } from 'react';
import {handleError} from '../../../utils/errors.ts';

type LocalState = {
    isSubmitting: boolean;
    submitErrorMessage?: string;
    titleError?: string;
    tagsError?: string;
};

const AddLinkForm = observer(({ onSuccess }: { onSuccess: () => void}) => {
    const { updatePreviewLink, submitLink, state: { preview: { link, url }} } = useLinkStore();
    const { state, dispatch } = useSimpleReducer<LocalState>({ isSubmitting: false });

    useEffect(() => {
        dispatch({ isSubmitting: false, submitErrorMessage: undefined, titleError: undefined, tagsError: undefined });
    }, [url])
    const submitHandler = async () => {
        if (!link) {
            throw new Error('Preview Link not found');
        }

        dispatch({ titleError: undefined, submitErrorMessage: undefined, tagsError: undefined });
        let hasError = false;
        if (link.title.length === 0) {
            dispatch({ titleError: 'Title is required' });
            hasError = true;
        }

        if (link.tags.length === 0) {
            dispatch({ tagsError: 'At least one tag is required' });
            hasError = true;
        }

         if (hasError) {
            return;
        }

        dispatch({ isSubmitting: true });
        try {
            await submitLink();
            onSuccess();
        } catch (e) {
            const errorMessage = handleError(e);
            if (errorMessage) {
                dispatch({ submitErrorMessage: errorMessage });
            }
        } finally {
            dispatch({ isSubmitting: false });
        }
    }

    const removeTag = (tag: string) => {
        updatePreviewLink({ tags: link!.tags.filter((t) => t !== tag)});
    };

    const addTag = (tag: string) => {
        updatePreviewLink({ tags: [...new Set([...link!.tags, tag])]});
    };

    const updateTitle = (title: string) => {
        updatePreviewLink({ title });
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            { !link && <LinkListItemSkeleton /> }
            { link && (
                <>
                    <LinkListItemWrapper>
                        <LinkListItemContent {...link} />
                        <TitleInput initialTitle={link.title} onUpdate={updateTitle} />
                        { state.titleError && (<span className="text-red-500 text-sm">{state.titleError}</span>) }
                        <div className="flex flex-wrap gap-2 items-center">
                            {link.tags.map((tag) => (
                                <TagBadge key={tag} onClick={() => removeTag(tag)} title={tag} removable />
                            ))}
                            { link.tags.length < MaxTags && <TagInput onAdd={addTag} />}
                        </div>
                        { state.tagsError && (<span className="text-red-500 text-sm">{state.tagsError}</span>) }
                    </LinkListItemWrapper>
                    <SubmitButton isLoading={state.isSubmitting} onClick={submitHandler} type="button" className="px-4 text-xl font-medium dark:text-white">
                        Submit
                    </SubmitButton>
                    { state.submitErrorMessage &&
                        <ErrorAlert className="mt-4" message={state.submitErrorMessage}
                                    onClose={() => dispatch({ submitErrorMessage: undefined })} /> }
                </>
            )}
        </div>
    );
});

export default AddLinkForm;