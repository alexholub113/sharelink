import {useStore} from '../../contexts/AppContext.tsx';
import UserStore from '../../stores/UserStore.ts';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';

const schema = z.object({
    nickname: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type FormValues = {
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const useSignUpForm = () => {
    const { register } = useStore<UserStore>(UserStore);
    const { register: registerFormInput, handleSubmit, formState } = useForm<FormValues>({ resolver: zodResolver(schema) });
    const { errors } = formState;
    const onSubmit = handleSubmit((data) => {
        const { nickname, email, password } = data;
        register(nickname, email, password);
    });

    return { onSubmit, register: registerFormInput, errors };
}

export default useSignUpForm;