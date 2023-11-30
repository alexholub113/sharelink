import LikeLinkActionButton from './ActionButtons/LikeLinkActionButton.tsx';
import SaveLinkActionButton from './ActionButtons/SaveLinkActionButton.tsx';
import DeleteLinkActionButton from './ActionButtons/DeleteLinkActionButton.tsx';
import Link from '../../../models/Link.ts';

const LinkListItemActionButtons = (link: Link) => {
    return (
        <div className="flex flex-row justify-between secondary-text-color">
            <div className="flex flex-row gap-4">
                <LikeLinkActionButton {...link} />
                <SaveLinkActionButton {...link} />
            </div>
            { link.editable && (
                <div className="flex flex-row gap-4">
                    <DeleteLinkActionButton {...link} />
                </div>
            )}
        </div>
    );
};

export default LinkListItemActionButtons;