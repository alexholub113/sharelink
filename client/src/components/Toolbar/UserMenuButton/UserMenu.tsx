import useClickOutsideHandler from '../../../hooks/useClickOutsideHandler.ts';
import {observer} from 'mobx-react-lite';
import {useUserStore} from '../../../contexts/AppContext.tsx';

type UserMenuProps = {
    onClose: () => void;
};

const UserMenu = observer(({ onClose }: UserMenuProps) => {
    const { state: { info }, signOut } = useUserStore();
    const refObject = useClickOutsideHandler(() => onClose());
    return (
        <div ref={refObject} className="absolute right-10 z-10 dark-border divide-y rounded-lg shadow w-44 card-background dark:divide-zinc-600 secondary-text-color">
            <div className="px-4 py-3 text-sm dark:text-white">
                <div className="font-medium truncate">{info?.nickname}</div>
            </div>
            <div className="py-2">
                <button onClick={() => signOut()} role="menuitem" className="flex w-full text-left px-4 py-2 text-sm bg-zinc-900 hover:bg-zinc-800 hover:text-white">Sign out</button>
            </div>
        </div>
    );
});

export default UserMenu;