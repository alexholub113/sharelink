import {useState} from 'react';
import SignUpModalContent from '../SignUpButton/SignUpModalContent.tsx';
import useSignInForm from './useSignInForm.ts';
import SubmitButton from '../SubmitButton.tsx';

const SignInModalContent = () => {
    const { onSubmit, register, errors } = useSignInForm();
    const [showSignUp, setShowSignUp] = useState(false);

    return (
        <>
            { !showSignUp && (
                <>
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                    <form onSubmit={onSubmit} className="space-y-6" action="#">
                        {/*<div className="relative z-0">
                            <input id="floating_standard" {...register('email')} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <span className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your email</span>
                            { errors.email && (<span className="text-red-500 text-sm">{errors.email.message}</span>) }
                        </div>*/}
                        <div>
                            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</span>
                            <input type="email" {...register('email')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" />
                            { errors.email && (<span className="text-red-500 text-sm">{errors.email.message}</span>) }
                        </div>
                        <div>
                            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</span>
                            <input type="password" {...register('password')} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                            { errors.password && (<span className="text-red-500 text-sm">{errors.password.message}</span>) }
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
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
