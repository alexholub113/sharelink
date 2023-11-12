import {useUserStore} from '../../../contexts/AppContext.tsx';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

type FormValues = {
    email: string;
    password: string;
};

const useSignInForm = () => {
    const { logIn } = useUserStore();
    const { register, handleSubmit, formState } = useForm<FormValues>({ resolver: zodResolver(schema) });
    const { errors } = formState;
    const onSubmit = handleSubmit((data) => {
        const { email, password } = data;
        logIn(email, password);
    });

    return { onSubmit, register, errors };
}

export default useSignInForm;