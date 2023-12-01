import Link from '../../../models/Link.ts';
import {useLinkStore} from '../../../contexts/AppContext.tsx';
import useAsyncAction from '../../../hooks/useAsyncAction.ts';
import Button from '../../Button.tsx';


const SaveLinkActionButton = ({ isSaved, id }: Pick<Link, 'isSaved' | 'id'>) => {
    const { saveLink } = useLinkStore();
    const { execute, loading } = useAsyncAction(() => saveLink(id));

    return (
        <Button className="bg-transparent" onClick={execute} disabled={loading}>
            { isSaved && (
                <svg className="w-5 h-5 secondary-text-color" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                    <path d="M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0 19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z"/>
                </svg>
            )}
            { !isSaved && (
                <svg className="w-5 h-5 secondary-text-color" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z"/>
                </svg>
            )}
        </Button>
    );
};

export default SaveLinkActionButton;