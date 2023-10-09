import {useState} from 'react';
import SignUpModalContent from '../SignUpButton/SignUpModalContent.tsx';
import useSignInForm from './useSignInForm.ts';

const SignInModalContent = () => {
    const { onSubmit, register, errors } = useSignInForm();
    const [showSignUp, setShowSignUp] = useState(false);

    return (
        <>
            { !showSignUp && (
                <>
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                    <form onSubmit={onSubmit} className="space-y-6" action="#">
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
                            <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition">
                            Sign in
                        </button>
                    </form>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-6">
                        Not registered? <button onClick={() => setShowSignUp(true)} className="text-blue-700 hover:underline dark:text-blue-500">Sign up</button>
                    </div>
                </>
            )}
            { showSignUp && <SignUpModalContent /> }
        </>
    );
};

export default SignInModalContent;
