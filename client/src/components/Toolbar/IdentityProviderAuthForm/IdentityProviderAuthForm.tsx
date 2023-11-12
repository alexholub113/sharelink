
import IdentityProviderButton from './IdentityProviderButton/IdentityProviderButton.tsx';

const IdentityProviderAuthForm = () => {

    return (
        <div className="flex flex-col w-full gap-2">
            <IdentityProviderButton icon="google" text="Continue with Google" />
            <IdentityProviderButton icon="github" text="Continue with Github" />
        </div>
    );
}

export default IdentityProviderAuthForm;