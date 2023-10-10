import React, { PropsWithChildren, useEffect } from 'react';
import FadeDiv from './Animations/FadeDiv.tsx';

const Modal: React.FC<PropsWithChildren & { onClose: () => void }> = ({ children, onClose }) => {
    const modalRef = React.createRef<HTMLDivElement>();

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose();
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

    return (
        <>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
            <FadeDiv className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                <div ref={modalRef} className="relative w-full max-w-md rounded-lg shadow-2xl bg-white dark:bg-zinc-700">
                    <button type="button" onClick={onClose} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white transition" data-modal-hide="authentication-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        {children}
                    </div>
                </div>
            </FadeDiv>
        </>
    );
};

export default Modal;
