import Events from '../../../constants/events';
import { ResponseInterceptor } from './ResponseInterceptor';

export default class BrowserCleanAuthSessionInterceptor implements ResponseInterceptor {
    public fulfilled = () => {
        window.dispatchEvent(new Event(Events.SuccessResponseReceived));

        return Promise.resolve();
    };
}