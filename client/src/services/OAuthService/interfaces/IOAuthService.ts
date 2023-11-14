interface IOAuthService {
    loginWithGoogle(): void;
    loginWithGithub(): void;
    loginWithFacebook(): void;
}

export default IOAuthService;