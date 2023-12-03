import useSignUpForm from './useSignUpForm.ts';
import SubmitButton from '../../SubmitButton.tsx';
import Input from '../../Input.tsx';
import IdentityProviderAuthForm from '../IdentityProviderAuthForm/IdentityProviderAuthForm.tsx';

const SignUpModalContent = () => {
   const { onSubmit, register, errors, registerError } = useSignUpForm();

    return (
        <>
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign up with your email address</h3>
            <div className="flex flex-col gap-8">
                <IdentityProviderAuthForm />
                <hr className="opacity-40" />
                <form onSubmit={onSubmit} className="flex flex-col gap-4" action="#">
                    <Input type="text" errorMessage={errors.nickname?.message} label='Your nickname' placeholder="Steven Reznik" rest={{...register('nickname')}} />
                    <Input type="email" errorMessage={errors.email?.message} label='Your email' placeholder="name@company.com" rest={{...register('email')}} />
                    <Input type="password" errorMessage={errors.password?.message} label='Your password' placeholder="••••••••" rest={{...register('password')}} />
                    <Input type="password" errorMessage={errors.confirmPassword?.message} label='Confirm password' placeholder="••••••••" rest={{...register('confirmPassword')}} />
                    <SubmitButton className="w-full mt-4" type="submit">Create account</SubmitButton>
                    {registerError && <p className="text-red-500 text-sm text-center">{registerError}</p>}
                </form>
            </div>
        </>
    );
};

export default SignUpModalContent;