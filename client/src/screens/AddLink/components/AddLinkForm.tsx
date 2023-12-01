import {useLinkStore} from '../../../contexts/AppContext.tsx';
import SubmitButton from '../../../components/SubmitButton.tsx';
import ErrorAlert from '../../../components/ErrorAlert.tsx';
import useSimpleReducer from '../../../hooks/useSimpleReducer.ts';
import {handleError} from '../../../utils/errors.ts';
import PreviewLink from '../../../models/PreviewLink.ts';
import LinkListItemContent from '../../../components/LinkListItem/LinkListItemContent.tsx';
import LinkListItemTitle from '../../../components/LinkListItem/LinkListItemTitle.tsx';
import LinkListItemTags from '../../../components/LinkListItem/LinkListItemTags.tsx';

type LocalState = {
    isSubmitting: boolean;
    submitErrorMessage?: string;
    titleError?: string;
    tagsError?: string;

};

type AddLinkFormProps = {
    link: PreviewLink;
    onSuccess: () => void;
};

const AddLinkForm = ({ onSuccess, link }: AddLinkFormProps) => {
    const { updatePreviewLink, submitLink } = useLinkStore();
    const { state, dispatch } = useSimpleReducer<LocalState>({ isSubmitting: false });

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
            <div className="link-item-wrapper">
                <LinkListItemContent {...link} />
                <LinkListItemTags editable tags={link.tags} onAdd={addTag} onRemove={removeTag} error={state.tagsError} />
                <LinkListItemTitle editable title={link.title} onUpdate={updateTitle} error={state.titleError} />
            </div>
            <SubmitButton isLoading={state.isSubmitting} onClick={submitHandler} type="button" className="px-4 text-xl font-medium dark:text-white">
                Submit
            </SubmitButton>
            { state.submitErrorMessage &&
                <ErrorAlert className="mt-4" message={state.submitErrorMessage}
                            onClose={() => dispatch({ submitErrorMessage: undefined })} /> }
        </div>
    );
};

export default AddLinkForm;