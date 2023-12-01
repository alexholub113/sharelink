import Link from '../../../models/Link.ts';
import {useLinkStore} from '../../../contexts/AppContext.tsx';
import useAsyncAction from '../../../hooks/useAsyncAction.ts';
import Button from '../../Button.tsx';
import {useState} from 'react';
import Modal from '../../Modal.tsx';

const DeleteLinkActionButton = ({ id }: Pick<Link, 'id'>) => {
    const { deleteLink } = useLinkStore();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const { execute, loading } = useAsyncAction(async () => {
        await deleteLink(id);
        setShowConfirmModal(false);
    });

    return (
        <>
            <div className="flex flex-row justify-end gap-6">
                <Button type="button" onClick={() => setShowConfirmModal(true)} className="bg-transparent">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
                    </svg>
                </Button>
            </div>
            { showConfirmModal && (
                <Modal onClose={() => setShowConfirmModal(false)}>
                    <div className="flex flex-col justify-center items-center">
                        <h3 className="text-xl font-medium dark:text-white mb-4">Delete link</h3>
                        <p className="text-sm text-black dark:text-white mb-4">Are you sure you want to delete this link ?</p>
                        <div className="flex flex-row gap-4">
                            <Button type="button" onClick={() => setShowConfirmModal(false)} className="dark:bg-zinc-700 text-black dark:text-white px-4 py-2 rounded-lg text-sm font-semibold">Cancel</Button>
                            <Button type="button" loading={loading} onClick={execute} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">Delete</Button>
                        </div>
                    </div>
                </Modal>
            ) }
        </>
    );
}

export default DeleteLinkActionButton;