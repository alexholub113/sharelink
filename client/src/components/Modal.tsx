import { PropsWithChildren } from 'react';
import FadeDiv from './Animations/FadeDiv.tsx';
import useClickOutsideHandler from '../hooks/useClickOutsideHandler.ts';
import Button from './Button.tsx';

type ModalProps = {
    onClose: () => void;
    priority?: 'primary' | 'secondary';
} & PropsWithChildren;

const Modal = ({ children, onClose, priority }: ModalProps) => {
    const modalRef = useClickOutsideHandler(onClose);

    return (
        <>
            <div className="top-0 left-0 w-full h-full fixed overflow-y-auto bg-black opacity-80"></div>
            <FadeDiv className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${priority === 'primary' ? 'z-50' : 'z-40'}`}>
                <div ref={modalRef} className="relative w-full max-w-md rounded-lg shadow-2xl bg-white dark-background mx-3 md:mx-0">
                    <Button type="button" onClick={onClose} className="absolute top-3 right-2.5 bg-transparent text-sm items-center dark:text-zinc-400 ml-auto inline-flex justify-center dark:hover:text-zinc-300">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Delete link item</span>
                    </Button>
                    <div className="px-6 py-6 lg:px-8">
                        {children}
                    </div>
                </div>
            </FadeDiv>
        </>
    );
};

export default Modal;