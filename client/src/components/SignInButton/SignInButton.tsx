import SignInModalContent from './SignInModalContent.tsx';
import Modal from '../Modal.tsx';
import { useUserStore } from '../../contexts/AppContext.tsx';
import {observer} from 'mobx-react-lite';

const SignInButton = observer(() => {
    const { state: { showLoginModal }, showSignInModal, closeSignInModal } = useUserStore();
    return (
        <>
            <button className="bg-white rounded-full text-lg font-semibold text-black/70 py-2 px-8 outline-none
                        hover:text-black focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer"
                    onClick={showSignInModal}>
                Log in
            </button>
            { showLoginModal && (
                <Modal onClose={closeSignInModal}>
                    <SignInModalContent />
                </Modal>
            ) }
        </>
    );
});

export default SignInButton;