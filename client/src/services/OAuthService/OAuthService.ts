import IOAuthService from './interfaces/IOAuthService.ts';

class OAuthService implements IOAuthService {
    private readonly baseUrl = `${import.meta.env.VITE_SHARELINK_API_BASE_URL}/oauth`;
    loginWithGoogle(): void {
        window.location.href = `${this.baseUrl}/login-google`;
    }

    loginWithGithub(): void {
        window.location.href = `${this.baseUrl}/login-github`;
    }

    loginWithFacebook(): void {
        window.location.href = `${this.baseUrl}/login-facebook`;
    }
}

export default OAuthService;