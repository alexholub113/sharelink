import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useLinkStore } from '../contexts/AppContext.tsx';
// Import your store here

const ScrollUpTrigger = observer(() => {
    const { state: { filter: { tags } }} = useLinkStore();

        useEffect(() => {
            console.log('ScrollUpTrigger')
            window.scrollTo(0, 0);
        }, [tags]);

    return <></>;
});

export default ScrollUpTrigger;