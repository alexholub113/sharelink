import {formatTagName} from '../utils/format.ts';
import Button from './Button.tsx';
import {PropsWithChildren} from 'react';

type TagLabelProps = {
    name: string;
    count?: number;
    onClick?: () => void;
    active?: boolean;
    removable?: boolean;
} & PropsWithChildren;

const TagBadge = ({name, count, onClick, active, removable, children}: TagLabelProps) => (
    <Button onClick={onClick}
            className={`py-1
                     ${active ? 'card-background rounded-full px-3 secondary-text-color': ''}`}>
        <span>{formatTagName(name)}</span>
        { !active && count && <span className="ml-1 text-xs font-normal dark:bg-zinc-700 rounded-full px-1">{count}</span>}
        { removable && active && <svg className="ml-2 w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg> }
        { children }
    </Button>
);

export default TagBadge;