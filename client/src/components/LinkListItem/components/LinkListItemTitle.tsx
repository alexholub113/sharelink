import {MaxTitleLength} from '../../../constants/preferences.ts';

const LinkListItemTitle = ({ title }: { title: string}) => {
    return (
        <h5 className="text-lg font-semibold secondary-text-color
            ">
            { title?.length > MaxTitleLength ? `${title?.slice(0, MaxTitleLength - 3)}...` : title }
        </h5>
    );
}

export default LinkListItemTitle;