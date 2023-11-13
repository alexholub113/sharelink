import {useUserStore} from '../../../contexts/AppContext.tsx';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import FetchHttpResponseError from '../../../services/HttpClient/errors/FetchHttpResponseError.ts';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Password is required'),
});

type FormValues = {
    email: string;
    password: string;
};

const useSignInForm = () => {
    const { logIn } = useUserStore();
    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } });

    const onSubmit = handleSubmit(async (data) => {
        const { email, password } = data;
        try {
            await logIn(email, password);
        } catch (error) {
            if (error instanceof FetchHttpResponseError) {
                if (error.status === 401) {
                    setError('password', { message: 'Invalid email or password' });
                }
            }
        }
    });

    return { onSubmit, register, errors };
}

export default useSignInForm;