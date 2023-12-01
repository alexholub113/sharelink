import LikeLinkActionButton from './ActionButtons/LikeLinkActionButton.tsx';
import SaveLinkActionButton from './ActionButtons/SaveLinkActionButton.tsx';
import DeleteLinkActionButton from './ActionButtons/DeleteLinkActionButton.tsx';
import Link from '../../models/Link.ts';
import Button from '../Button.tsx';

type LinkListItemActionPanelProps = {
    disabled?: boolean;
    onEditClick: () => void;
    onCancelClick: () => void;
    onApplyClick: () => void;
    link: Link;
    updating: boolean;
};

const LinkListItemActionPanel = ({ link, disabled, updating, onApplyClick, onCancelClick, onEditClick}: LinkListItemActionPanelProps) => {
    return (
        <div className="flex flex-row justify-between secondary-text-color">
            <div className="flex flex-row gap-4">
                <LikeLinkActionButton {...link} />
                <SaveLinkActionButton {...link} />
            </div>
            { !updating && link.editable && (
                <div className="flex flex-row gap-4">
                    <Button type="button" onClick={onEditClick} className="bg-transparent">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                            <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                        </svg>
                    </Button>
                    <DeleteLinkActionButton {...link} />
                </div>
            )}
            { updating && (
                <div className="flex flex-row gap-4">
                    <Button disabled={disabled} type="button" onClick={onCancelClick} className="bg-transparent">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                        </svg>
                    </Button>
                    <Button disabled={disabled} type="button" onClick={onApplyClick} className="bg-transparent">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                        </svg>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default LinkListItemActionPanel;