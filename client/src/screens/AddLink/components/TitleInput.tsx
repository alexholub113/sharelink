import { ChangeEvent, useState } from 'react';
import { MaxTitleLength } from '../../../constants/preferences.ts';

type TitleInputProps = {
    initialTitle: string;
    onUpdate: (title: string) => void;
};

const TitleInput = ({ initialTitle, onUpdate }: TitleInputProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialTitle);

    const handleEditStart = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleEditEnd = () => {
        setIsEditing(false);
        if (title !== initialTitle) {
            onUpdate(title);
        }
    };

    return isEditing || initialTitle.length === 0 ? (
        <input type="text"
               autoFocus
               value={title}
               onChange={handleInputChange}
               onBlur={handleEditEnd}
               placeholder="Set title"
               className="text-lg font-semibold secondary-text-color dark:bg-transparent p-0 m-0 border-none appearance-none focus:ring-0"
        />
    ) : (
        <h5
            className="text-lg font-semibold secondary-text-color cursor-pointer"
            onClick={handleEditStart}
        >
            { title.length > MaxTitleLength ? `${title.slice(0, MaxTitleLength)}...` : title }
        </h5>
    );
}

export default TitleInput;