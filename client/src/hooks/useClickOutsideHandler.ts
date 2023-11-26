import React, {RefObject, useEffect} from 'react';

const useClickOutsideHandler = <T extends HTMLInputElement | HTMLButtonElement>(callback: () => void, triggerRef?: RefObject<T>) => {
    const refObject = React.useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        const clickTarget = event.target as Node;
        const isClickedOutside = refObject && refObject.current && !refObject.current.contains(clickTarget);
        const isClickedToTrigger = triggerRef && triggerRef.current && triggerRef.current.contains(clickTarget);

        if (isClickedOutside && !isClickedToTrigger) {
            callback();
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return refObject;
}

export default useClickOutsideHandler;