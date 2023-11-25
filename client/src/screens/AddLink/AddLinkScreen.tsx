import SetUrl from './components/SetUrl.tsx';
import {observer} from 'mobx-react-lite';
import {useLinkStore} from '../../contexts/AppContext.tsx';
import AddLinkForm from './components/AddLinkForm.tsx';

const AddLinkScreen = observer(({ onSuccess }: { onSuccess: () => void}) => {
    const { state: { preview: { url } }} = useLinkStore();

    return (
        <div className="flex flex-col gap-4 mt-14 w-full max-w-screen-sm">
            <SetUrl />
            { url && (
                <div className="mt-6">
                    <AddLinkForm onSuccess={onSuccess} />
                </div>
            )}
        </div>
    );
});

export default AddLinkScreen;