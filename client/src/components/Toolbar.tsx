import SignInButton from './SignInButton/SignInButton.tsx';
import SignUpButton from './SignUpButton/SignUpButton.tsx';

const Toolbar = () => {
    console.log('Toolbar');
    return (
        <div className="flex flex-row justify-end items-center mb-16">
            <SignUpButton />
            <SignInButton />
        </div>
    );
};

export default Toolbar;
