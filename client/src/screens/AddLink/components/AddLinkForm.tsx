import {useLinkStore} from '../../../contexts/AppContext.tsx';
import TagBadge from '../../../components/TagBadge.tsx';
import AddTagButton from './AddTagButton.tsx';
import {MaxTags} from '../../../constants/preferences.ts';
import TitleInput from './TitleInput.tsx';
import SubmitButton from '../../../components/SubmitButton.tsx';
import ErrorAlert from '../../../components/ErrorAlert.tsx';
import useSimpleReducer from '../../../hooks/useSimpleReducer.ts';
import {handleError} from '../../../utils/errors.ts';
import PreviewLink from '../../../models/PreviewLink.ts';
import LinkListItemContent from '../../../components/LinkListItem/components/LinkListItemContent.tsx';

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
                <TitleInput initialTitle={link.title} onUpdate={updateTitle} />
                { state.titleError && (<span className="text-red-500 text-sm">{state.titleError}</span>) }
                <div className="flex flex-wrap gap-2 items-center">
                    {link.tags.map((tag) => (
                        <TagBadge key={tag} onClick={() => removeTag(tag)} name={tag} removable active />
                    ))}
                    { link.tags.length < MaxTags && <AddTagButton onAdd={addTag} />}
                </div>
                { state.tagsError && (<span className="text-red-500 text-sm">{state.tagsError}</span>) }
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