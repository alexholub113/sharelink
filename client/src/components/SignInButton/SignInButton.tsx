import SignInModalContent from './SignInModalContent.tsx';
import Modal from '../Modal.tsx';
import {useState} from 'react';

const SignInButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button className="bg-white rounded-full text-lg font-semibold text-black/70 py-2 px-8 outline-none
                        hover:text-black focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer"
                    onClick={() => setIsOpen(true)}>
                Log in
            </button>
            { isOpen && (
                <Modal onClose={() => setIsOpen(false)}>
                    <SignInModalContent />
                </Modal>
            ) }
        </>
    );
};

export default SignInButton;
