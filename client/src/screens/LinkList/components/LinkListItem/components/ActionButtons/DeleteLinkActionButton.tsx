import Link from '../../../../../../services/LinkService/interfaces/Link.ts';
import {useLinkStore} from '../../../../../../contexts/AppContext.tsx';
import {useState} from 'react';
import Modal from '../../../../../../components/Modal.tsx';
import Button from '../../../../../../components/Button.tsx';
import useAsyncAction from '../../../../../../hooks/useAsyncAction.ts';

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
                <Button type="button" onClick={() => setShowConfirmModal(true)} className="bg-transparent dark:hover:text-zinc-300">
                    {/*<svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Delete link item</span>*/}
                    Delete
                </Button>
            </div>
            { showConfirmModal && (
                <Modal onClose={() => setShowConfirmModal(false)}>
                    <div className="flex flex-col justify-center items-center">
                        <h3 className="text-xl font-medium dark:text-white mb-4">Delete link</h3>
                        <p className="text-sm text-black dark:text-white mb-4">Are you sure you want to delete this link ?</p>
                        <div className="flex flex-row gap-4">
                            <Button type="button" onClick={() => setShowConfirmModal(false)} className="dark:bg-zinc-700 text-black dark:text-white px-4 py-2 rounded-lg text-sm font-semibold">Cancel</Button>
                            <Button type="button" isLoading={loading} onClick={execute} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">Delete</Button>
                        </div>
                    </div>
                </Modal>
            ) }
        </>
    );
}

export default DeleteLinkActionButton;