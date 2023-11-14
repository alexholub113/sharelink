
import IdentityProviderButton from './IdentityProviderButton/IdentityProviderButton.tsx';
import {useService} from '../../../contexts/AppContext.tsx';
import OAuthService from '../../../services/OAuthService/OAuthService.ts';
import IOAuthService from '../../../services/OAuthService/interfaces/IOAuthService.ts';

const IdentityProviderAuthForm = () => {
    const oauthService = useService<IOAuthService>(OAuthService);

    return (
        <div className="flex flex-col w-full gap-2">
            <IdentityProviderButton onClick={() => oauthService.loginWithGoogle()} icon="google" text="Continue with Google" />
            <IdentityProviderButton onClick={() => oauthService.loginWithGithub()} icon="github" text="Continue with Github" />
        </div>
    );
}

export default IdentityProviderAuthForm;