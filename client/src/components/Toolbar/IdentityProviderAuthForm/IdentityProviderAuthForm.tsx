
import IdentityProviderButton from './IdentityProviderButton/IdentityProviderButton.tsx';

const IdentityProviderAuthForm = () => {
    const loginWithGoogle = () => {
        window.location.href = 'http://localhost:5160/identity/login-google';
    };
    return (
        <div className="flex flex-col w-full gap-2">
            <IdentityProviderButton onClick={loginWithGoogle} icon="google" text="Continue with Google" />
            <IdentityProviderButton icon="github" text="Continue with Github" />
        </div>
    );
}

export default IdentityProviderAuthForm;