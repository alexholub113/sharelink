import SignInButton from './SignInButton/SignInButton.tsx';
import SignUpButton from './SignUpButton/SignUpButton.tsx';
import {useUserStore} from '../../contexts/AppContext.tsx';
import {observer} from 'mobx-react-lite';
import UserMenuButton from './UserMenuButton/UserMenuButton.tsx';

const Toolbar = observer(() => {
    const { isAuthenticated } = useUserStore();
    return (
        <div className="flex flex-row justify-end items-center mb-16 mx-auto p-6">
            { !isAuthenticated && (
                <>
                    <SignUpButton />
                    <SignInButton />
                </>
            ) }
            { isAuthenticated && <UserMenuButton /> }
        </div>
    );
});

export default Toolbar;