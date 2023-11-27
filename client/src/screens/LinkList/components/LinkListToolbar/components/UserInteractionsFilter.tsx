import {observer} from 'mobx-react-lite';
import {useLinkStore} from '../../../../../contexts/AppContext.tsx';
import {PropsWithChildren} from 'react';

type UserInteractionButtonProps = {
    onClick: () => void;
    active: boolean;
    groupSide: 'left' | 'right' | 'middle';
} & PropsWithChildren;

const UserInteractionsButton = ({onClick, active, children, groupSide}: UserInteractionButtonProps) => (
    <button onClick={onClick} type="button"
            className={`inline-flex items-center px-4 py-2 text-sm font-medium border 
                        border-zinc-800 outline-none secondary-text-color bg-zinc-900 hover:bg-zinc-800
                                ${active ? 'dark:bg-cyan-700 dark:hover:bg-cyan-600' : ''}
                                ${groupSide === 'left' ? 'rounded-s-full' : groupSide === 'right' ? 'rounded-e-full' : ''}`}>
        {children}
    </button>
);

const UserInteractionsFilter = observer(() => {
    const { toggleLikedFilter, toggleSavedFilter, toggleOwnedFilter, state: { filter: { liked, saved, owned }}} = useLinkStore();
    return (
        <div className="inline-flex rounded-full shadow-sm" role="group">
            <UserInteractionsButton onClick={() => toggleLikedFilter()} active={liked} groupSide="left">
                <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
                </svg>
                Liked
            </UserInteractionsButton>
            <UserInteractionsButton onClick={() => toggleSavedFilter()} active={saved} groupSide="middle">
                <svg className="w-3 h-3 me-2 secondary-text-color" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                    <path d="M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0 19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z"/>
                </svg>
                Saved
            </UserInteractionsButton>
            <UserInteractionsButton onClick={() => toggleOwnedFilter()} active={owned} groupSide="right">
                <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>
                Owned
            </UserInteractionsButton>
        </div>
    );
});

export default UserInteractionsFilter;