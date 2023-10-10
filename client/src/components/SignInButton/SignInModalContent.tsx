import {useState} from 'react';
import SignUpModalContent from '../SignUpButton/SignUpModalContent.tsx';
import useSignInForm from './useSignInForm.ts';
import SubmitButton from '../SubmitButton.tsx';
import Input from '../Input.tsx';

const SignInModalContent = () => {
    const { onSubmit, register, errors } = useSignInForm();
    const [showSignUp, setShowSignUp] = useState(false);

    return (
        <>
            { !showSignUp && (
                <>
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                    <form onSubmit={onSubmit} className="space-y-6" action="#">
                        <Input type="email" errorMessage={errors.email?.message} label='Your email' placeholder="name@company.com" rest={{...register('email')}} />
                        <Input type="password" errorMessage={errors.password?.message} label='Your password' placeholder="name@company.com" rest={{...register('password')}} />
                        <div className="flex justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-cyan-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-cyan-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                                </div>
                                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</span>
                            </div>
                            <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">Lost Password?</a>
                        </div>
                        <SubmitButton type="submit" className="w-full">
                            Log in to your account
                        </SubmitButton>
                    </form>
                    <div className="flex justify-between text-gray-500 dark:text-gray-300 mt-6">
                        <span>Not registered?</span>
                        <button onClick={() => setShowSignUp(true)} className="text-cyan-700 hover:underline dark:text-cyan-500">Create account</button>
                    </div>
                </>
            )}
            { showSignUp && <SignUpModalContent /> }
        </>
    );
};

export default SignInModalContent;
