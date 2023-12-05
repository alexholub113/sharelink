import Link from '../../../models/Link.ts';
import {useLinkStore} from '../../../contexts/AppContext.tsx';
import useAsyncAction from '../../../hooks/useAsyncAction.ts';
import Button from '../../Button.tsx';

const shortLikes = (likes: number) => {
    if (likes < 1000) {
        return likes;
    }

    return `${(likes / 1000).toFixed(1)}k`;
}

const DislikeLinkActionButton = ({ isDisliked, dislikes, id }: Pick<Link, 'isDisliked' | 'dislikes' | 'id'>) => {
    const { dislikeLink } = useLinkStore();
    const { execute, loading } = useAsyncAction(() => dislikeLink(id));

    return (
        <Button onClick={execute} disabled={loading}>
            { isDisliked && (
                <svg className="w-5 h-5 secondary-text-color" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M11.955 2.117h-.114C9.732 1.535 6.941.5 4.356.5c-1.4 0-1.592.526-1.879 1.316l-2.355 7A2 2 0 0 0 2 11.5h3.956L4.4 16a1.779 1.779 0 0 0 3.332 1.061 24.8 24.8 0 0 1 4.226-5.36l-.003-9.584ZM15 11h2a1 1 0 0 0 1-1V2a2 2 0 1 0-4 0v8a1 1 0 0 0 1 1Z"/>
                </svg>
            )}
            { !isDisliked && (
                <svg className="w-5 h-5 secondary-text-color" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.992 11.287c-1 .097-1.96.45-2.792 1.029a25.118 25.118 0 0 0-4.454 5.721 1.803 1.803 0 0 1-.655.705 1.742 1.742 0 0 1-1.648.096 1.786 1.786 0 0 1-.604-.457 1.874 1.874 0 0 1-.432-1.439l1.562-4.626m9.023-1.03H19V2.03c0-.273-.106-.535-.294-.728A.99.99 0 0 0 17.997 1h-1.002a.99.99 0 0 0-.71.301 1.042 1.042 0 0 0-.293.728v9.258Zm-8.02 1.03H3.003c-.322 0-.64-.08-.925-.233a2.022 2.022 0 0 1-.716-.645 2.108 2.108 0 0 1-.242-1.883l2.36-7.2C3.769 1.54 3.96 1 5.365 1c2.59 0 5.39 1.06 7.504 1.66"/>
                </svg>
            )}
            { dislikes > 0 && <span className="ml-1 secondary-text-color text-sm">{shortLikes(dislikes)}</span> }
        </Button>
    );
};

export default DislikeLinkActionButton;