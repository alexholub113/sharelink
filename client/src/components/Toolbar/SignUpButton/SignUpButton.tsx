import Modal from '../../Modal.tsx';
import SignUpModalContent from './SignUpModalContent.tsx';
import React from 'react';

const SignUpButton = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <>
            <button onClick={() => setIsOpen(true)} className="text-lg text-white/70 py-2 px-6 bg-transparent outline-none hover:text-white hover:scale-110 active:scale-105 transition cursor-pointer">
                Sign up
            </button>
            { isOpen && (
                <Modal onClose={() => setIsOpen(false)}>
                    <SignUpModalContent />
                </Modal>
            ) }
        </>
    );
};

export default SignUpButton;