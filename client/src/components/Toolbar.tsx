import SignInButton from './SignInButton/SignInButton.tsx';
import SignUpButton from './SignUpButton/SignUpButton.tsx';

const Toolbar = () => {
    return (
        <div className="flex flex-row justify-end items-center mb-16 mx-auto p-6">
            <SignUpButton />
            <SignInButton />
        </div>
    );
};

export default Toolbar;
