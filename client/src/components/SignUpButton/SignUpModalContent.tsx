import useSignUpForm from './useSignUpForm.ts';

const SignUpModalContent = () => {
   const { onSubmit, register, errors } = useSignUpForm();

    return (
        <>
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign up with your email address</h3>
            <form onSubmit={onSubmit} className="space-y-6" action="#">
                <div>
                    <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your nickname</span>
                    <input type="email" {...register('nickname')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" />
                    { errors.nickname && (<span className="text-red-500 text-sm">{errors.nickname.message}</span>) }
                </div>
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
                <div>
                    <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</span>
                    <input type="password" {...register('confirmPassword')} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                    { errors.confirmPassword && (<span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>) }
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition">
                    Sign up
                </button>
            </form>
        </>
    );
};

export default SignUpModalContent;
