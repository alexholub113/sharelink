import { ChangeEvent, useState } from 'react';
import {MaxTitleLength} from '../../constants/preferences.ts';

type LinkListItemTitleProps = {
    editable?: boolean;
    title: string;
    onUpdate?: (title: string) => void;
    error?: string;
};

const LinkListItemTitle = ({ title, onUpdate, editable, error }: LinkListItemTitleProps) => {
    const [value, setValue] = useState(title);

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

    const handleEditEnd = () => {
        if (value !== title && onUpdate) {
            onUpdate(value);
        }
    };

    return (
        <>
            { editable && (
                <textarea
                       value={value}
                       onChange={handleInputChange}
                       onBlur={handleEditEnd}
                       placeholder="Set title"
                       className="resize-none p-2 group secondary-text-color dark-border w-full bg-zinc-900 focus:outline-none font-medium rounded-lg text-sm"
                />
            )}
            { !editable && (
                <h5
                    className="text-lg font-semibold secondary-text-color"
                >
                    { value.length > MaxTitleLength ? `${value.slice(0, MaxTitleLength)}` : value }
                </h5>
            )}
            { error && (<span className="text-red-500 text-sm">{error}</span>) }
        </>
    );
}

export default LinkListItemTitle;