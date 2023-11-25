import {formatTagTitle} from '../utils/format.ts';
import {PropsWithChildren} from 'react';
import Button from './Button.tsx';

type TagBadgeProps = {
    title: string;
    removable?: boolean;
    className?: string;
    onClick?: () => void;
} & PropsWithChildren;

const TagBadge = ({ title, removable, className, children, onClick }: TagBadgeProps) => (
    <Button className={`dark:bg-zinc-700 rounded-full px-2 py-1 ${className}`}
         onClick={onClick}>
        <span>{formatTagTitle(title)}</span>
        {children}
        { removable && <svg className="ml-2 w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg> }
    </Button>
);

export default TagBadge;