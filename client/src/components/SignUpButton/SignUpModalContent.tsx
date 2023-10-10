import useSignUpForm from './useSignUpForm.ts';
import SubmitButton from '../SubmitButton.tsx';
import Input from '../Input.tsx';

const SignUpModalContent = () => {
   const { onSubmit, register, errors } = useSignUpForm();

    return (
        <>
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign up with your email address</h3>
            <form onSubmit={onSubmit} className="space-y-6" action="#">
                <Input type="text" errorMessage={errors.nickname?.message} label='Your nickname' placeholder="Steven Reznik" rest={{...register('nickname')}} />
                <Input type="email" errorMessage={errors.email?.message} label='Your email' placeholder="name@company.com" rest={{...register('email')}} />
                <Input type="password" errorMessage={errors.password?.message} label='Your password' placeholder="••••••••" rest={{...register('password')}} />
                <Input type="password" errorMessage={errors.confirmPassword?.message} label='Confirm password' placeholder="••••••••" rest={{...register('confirmPassword')}} />
                <SubmitButton className="w-full" type="submit">Create account</SubmitButton>
            </form>
        </>
    );
};

export default SignUpModalContent;
