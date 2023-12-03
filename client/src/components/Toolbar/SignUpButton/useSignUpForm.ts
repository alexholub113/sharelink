import {useUserStore} from '../../../contexts/AppContext.tsx';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useState} from 'react';
import {handleError} from '../../../utils/errors.ts';

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
    const { register } = useUserStore();
    const { register: registerFormInput, handleSubmit, formState } = useForm<FormValues>({ resolver: zodResolver(schema) });
    const { errors } = formState;
    const [registerError, setRegisterError] = useState<string | undefined>(undefined);
    const onSubmit = handleSubmit(async (data) => {
        setRegisterError(undefined);
        const { nickname, email, password } = data;
        try {
            await register(nickname, email, password);
        } catch (error) {
            setRegisterError(handleError(error));
        }
    });

    return { onSubmit, register: registerFormInput, errors, registerError };
}

export default useSignUpForm;